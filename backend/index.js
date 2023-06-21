// External And Internal Modules

const express=require("express");
const cors=require("cors");
const http=require("http");
const {Server}=require("socket.io");
const app = express();
app.use(cors())

// =========== Routers and Models Location =================


const {connection}=require("./config/db");
const { patientRouter } = require("./routes/patient.router");
const { doctorRouter } = require("./routes/doctor.router");
const { meetingRouter } = require("./routes/meetings.router");



require("dotenv").config();

const httpServer=http.createServer(app);


// =========== For Testing ===========

app.get("/",(req,res)=>{
    res.send("Hello!!")
})

// =========== Middleware ===========

app.use(express.json())
app.use('/patients',patientRouter)
app.use('/doctors',doctorRouter)
app.use('/meetings',meetingRouter)



// =========== Socket Connection ===========


const io=new Server(httpServer);


let allConnectedUsers=[];

io.on("connection",(socket)=>{
    console.log("New Client Connected !!");
    
})





// =========== Listening to Server ===========

httpServer.listen(process.env.port,async()=>{

    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log("Not able to connected to DB")
    }
    console.log(`Server is running at port ${process.env.port}`)
})