const userService = require("../service/userService");
const crypto = require('crypto');
const {generateUniqueShortId, generateUniquieId} = require("../utils/generateId")
const {isPasswordStrong} = require("../utils/passwordStrength");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { username, email, password, referralLink, country} = req.body;
        const genRefCode = generateUniqueShortId();
        const isStrongpassword = isPasswordStrong(password);
        
        if(!username || !email || !password || !country){
            return res.status(400).json({message: "Provide all needed value(s)!"})
        }
    
        if(!isStrongpassword){
            return res.status(400).json({message: "Password must contain an uppercase and smallcase letters, a number and a special character"})
        }
        
        const verificationToken = crypto.randomBytes(40).toString('hex');

        const user = await userService.createUser({ username, email, password, country, referralLink, verificationToken });
        
        const tokenUser = {
            userId: user.id,
            // userId: user._id,
            username: user.username,
            email: user.email,
            country: user.country,
            referralLink: user.referralLink,
        }
        let refresh_token = crypto.randomBytes(40).toString('hex');

        const accessToken = jwt.sign(tokenUser, 'secret',{expiresIn:'1d'});
        const refreshToken = jwt.sign({tokenUser,refresh_token}, process.env.SECRET,{expiresIn:'1d'});
        
        // send email from ceo
        // await sendCeoMail({username: username, email:email})

        const origin = 'http://localhost:3000' // will still be changed

        //  await sendVerificationEmail({
        //        username: user.username,
        //     email: user.email,
        //     verificationToken: user.verificationToken,
        //     origin
        // });
    
        return res.status(201).json({ message: 'User created successfully',
            username: user.username,
            email: user.email,
            userId: user.id,
            verificationToken,
            accessToken,
            refreshToken
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function login(req,res){
    const {email,password} = req.body;

    if(!email||!password){
        throw new BadRequestError('Please provide the need values');
    }

    const user = await User.findOne({email});
    
    if(!user){
        throw new NotFoundError(`User doesn't exist, Please sign up`);
    }

    if(user.isTempBanned){
        throw new UnauthorizedError(`You can't login right now because you are temporarily banned from this app for breaking our policies.`)
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new BadRequestError(`Invalid password, check and try again`)
    }

    if(!user.isVerified){
        throw new BadRequestError(`Please verify your email`)
    }

    let refreshToken = '';

    const existingToken = await Token.findOne({user: user._id});
    if(existingToken){
        const {isValid} = existingToken;
        if(!isValid){
            throw new UnauthorizedError('your are temporarily restricted from this app.')
        }

        refreshToken = existingToken.refreshToken;

        const userToken = {username: user.username, email: user.email, role: user.role, userId: user._id};
        attachCookiesToResponse({res, user:userToken, refreshToken});

        res.status(StatusCodes.OK).json({success:true, user:userToken});
        return;
    }

    refreshToken = crypto.randomBytes(40).toString('hex');

    const userAgent = req.headers['user-agent']

    const userT = {refreshToken,userAgent,user:user._id};
    
    await Token.create(userT);
    
    const userToken = {username: user.username, email: user.email, role: user.role, userId: user._id};
    attachCookiesToResponse({res, user:userToken, refreshToken});

    res.status(StatusCodes.OK).json({success:true, user:userToken});

}

const verifyEmail = async(req,res) =>{

    const {email, verificationToken} = req.body;

    if(!email){
        throw new BadRequestError('Please provide the needed values')
    }

    const user = await User.findOne({email});

    if(!user){
        throw new UnauthenticatedError('Verification failed!');
    }

    if(user.verificationToken !== verificationToken){
        throw new UnauthenticatedError('Verification failed!!!');
    }

    user.isVerified = true,
    user.verificationDate =  Date.now(),
    user.verificationToken = ''

    await user.save();
    
    console.log(user)
    res.status(200).json({msg: 'Email verified'});
}

// reset password token

const forgotPassword = async(req,res) =>{
    const {email} = req.body;
  
    if(!email){
        throw new BadRequestError('Please provide a valid email address');
    }
  
    const user = await User.findOne({email});

  
    if(user){
      const passwordResetToken = crypto.randomBytes(70).toString('hex');
  
      
  
        const origin = 'http://localhost:3000'
        await sendResetPasswordEmail({
            name: user.name,
            email: user.email,
            token: passwordResetToken,
            origin,
        });
  
  
      const tenMins = 1000 * 60 * 10;
      const passwordResetExpires = new Date(Date.now() + tenMins);
      
      user.passwordResetToken = createHash(passwordResetToken)
      user.passwordResetExpires = passwordResetExpires
  
      await user.save();
        // res
        //     .status(StatusCodes.OK)
        //     .json({
        //         user:user,
        //         passwordResetToken
        //     });
    }
    res.status(200).json({msg: `Please check your email for rest password link`});
}

const resetPassword = async (req, res) => {
    const { token, email, password, confirmPassword } = req.body;
    if (!token || !email || !password, confirmPassword) {
      throw new BadRequestError('Please provide all values')
    }

    const user = await User.findOne({email});

    if (user) {
      const currentDate = new Date();
        password === confirmPassword
        
        if(user.passwordResetToken === createHash(token) && user.passwordResetExpires > currentDate) {

            user.password = password;
            user.passwordResetToken = null;
            user.passwordResetExpires = null;
            await user.save();

            res.status(200).json({msg: 'Password successfully reseted'});
        }

    
    }
  
};


module.exports = {
    signup,
    login
};
