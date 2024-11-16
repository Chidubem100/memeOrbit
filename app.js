require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors =  require("cors");
const path =  require("path")
const app = express();

const allowedOrigins = [  
    'https://neoadmindashboard.netlify.app'
];

const corsOpt = {
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}


app.set('trust proxy', 1)
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './public/dist')))
app.use(cors(corsOpt));
app.use(morgan("dev"));

// routes
// app.use('/api/v1/user', );
// app.use('/api/v1', );

app.get("/health-check", (req,res) =>{
    res.status(200).json({
        success:true, 
        msg: 'Health check successful!!'
    })
});


const port = 3040 || process.env.PORT
async function startServer(){
    try {
        app.listen(port,()=>{
            console.log(`server started on port ${port}`)
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();