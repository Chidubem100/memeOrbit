const jwt = require("jsonwebtoken");

async function authMiddleware(req,res,next)  {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];

    if(!accessToken){
        return res.status(401).json({msg: "Unable To Login! Try again"})
    }

    jwt.verify(accessToken, 'secret', (err, user) =>{
        if(err){
            return res.status(402).json({msg: "Invalid accessToken"})
        }
        req.user = user;
        next();
    })
}

const userAuthMiddleware = async(req,res,next) =>{
    let {accesstoken, refreshtoken} = req.headers

    if(!accesstoken && !refreshtoken){
        return res.status(401)
            .json({msg:"Authentication failed. Please login"})
    }
        
    try {
        
        if(accesstoken){      
             
            const payload = jwt.verify(accesstoken,process.env.SECRET)
            
            req.user = payload;
           return  next()
        }
        
        if(!accesstoken){
        const payload = jwt.verify(refresh_token, process.env.SECRET);
        
        const existingToken = await Utoken.findOne({
            user:payload.tokenUser.userId,
            refresh_token: payload.refresh_token
        });
        
        if(!existingToken){
            return res.status(401)
                .json({msg:"Authentication failed. Please login again!"})
        }
        const accessToken = jwt.sign(payload, process.env.SECRET);
        
        // res.header('Authorization', accessToken);
        req.user = payload.tokenUser;
        return next();
        }
    } catch (error) {    
        console.log(error)
        throw new UnauthenticatedApiError('Authentication failed!!')
    }
}


module.exports = {authMiddleware, userAuthMiddleware};