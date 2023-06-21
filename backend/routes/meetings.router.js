const express=require("express")
const { patientModel } = require("../models/patient.models")
const { doctorModel } = require("../models/doctor.model")
const { meetingModel } = require("../models/meetings.model")
const {authenticator}=require("../middlewares/authentication.middleware")

const meetingRouter = express.Router()
meetingRouter.use(authenticator)

meetingRouter.post("/bookmeeting",async(req,res)=>{
    try {
        res.status(200).send({"Message":"Authentication worked"})
    } catch (error) {
        console.log(error.message)
            res.status(400).send({"message":"Sorry :( , Server Error"})
    }
})

module.exports={
    meetingRouter
}