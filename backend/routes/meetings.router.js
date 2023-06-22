const express=require("express")
const { patientModel } = require("../models/patient.models")
const { doctorModel } = require("../models/doctor.model")
const { meetingModel } = require("../models/meetings.model")
const {mailerMeetingDetail}=require("../config/mailler")
const {authenticator}=require("../middlewares/authentication.middleware")
const {authorization}=require("../middlewares/authorization.middleware")

const meetingRouter = express.Router()
meetingRouter.use(authenticator)

meetingRouter.post("/bookmeeting/:patientID",authorization(['admin','patient']),async(req,res)=>{
    try {
        let meetingDate=req.body.meetingDate
        let meetingTime=req.body.meetingTime
        let patientID=req.params.patientID
        let doctorID=req.body.doctorID
        let newwmeeting=new meetingModel({
            patinetID:patientID ,
            doctorID:doctorID ,
            meetingTime:meetingTime,
            meetingDate:meetingDate
        })
        let patient=await patientModel.findOne({_id:patientID})
        let doctor=await doctorModel.findOne({_id:doctorID})
        let meeting=await newwmeeting.save()
        let task='create'
        mailerMeetingDetail(doctor,patient,meeting,task)
        res.status(200).send({"Message":"Meeting Successfully created."})
    } catch (error) {
            console.log(error.message)
            res.status(400).send({"message":"Sorry :( , Server Error"})
    }
})

meetingRouter.get("/all/doctor",authorization(['admin','doctor']),async(req,res)=>{
    try {
        let doctorID=req.body.userID
        let doctorMeetings=await meetingModel.find({doctorID})
        res.status(200).send({"Message":"All Meetings are here.",meetings:doctorMeetings})
    } catch (error) {
        console.log(error.message)
        res.status(400).send({"message":"Sorry :( , Server Error"})
    }
})

meetingRouter.get("/all/patient",authorization(['admin','patient']),async(req,res)=>{
    try {
        let patinetID=req.body.userID
        let patientMeetings=await meetingModel.find({patinetID})
        res.status(200).send({"Message":"All Meetings are here.",meetings:patientMeetings})
    } catch (error) {
        console.log(error.message)
        res.status(400).send({"message":"Sorry :( , Server Error"})
    }
})

meetingRouter.get("/single/:meetingID",authorization(['admin','patient','doctor']),async(req,res)=>{
    try {
        let meetingID=req.params.meetingID
        let meetingData=await meetingModel.findbyId(meetingID)
        res.status(200).send({"Message":"Meeting data is here.",meetingData:meetingData})
    } catch (error) {
        console.log(error.message)
        res.status(400).send({"message":"Sorry :( , Server Error"})
    }
})

meetingRouter.patch("/update/:meetingID",authorization(['admin','patient']),async(req,res)=>{
    try {
        let newMeetingData=req.body
        let meetingID=req.params.meetingID
        await meetingModel.findByIdAndUpdate(meetingID,newMeetingData)
        let meeting=await meetingModel.findById(meetingID)
        let patientID=meeting.patinetID
        let doctorID=meeting.doctorID
        let patient=await patientModel.findOne({_id:patientID})
        let doctor=await doctorModel.findOne({_id:doctorID})
        let task='update'
        mailerMeetingDetail(doctor,patient,meeting,task)
        res.status(200).send({"Message":"Meeting  information updated successfully."})
    } catch (error) {
            console.log(error.message) 
            res.status(400).send({"message":"Sorry :( , Server Error"})
    }
})

meetingRouter.delete("/delete/:meetingID",authorization(['admin','patient']),async(req,res)=>{
    try {
        let meetingID=req.params.meetingID
        let meeting=await meetingModel.findById(meetingID)
        let patientID=meeting.patinetID
        let doctorID=meeting.doctorID
        let patient=await patientModel.findOne({_id:patientID})
        let doctor=await doctorModel.findOne({_id:doctorID})
        let task='delete'
        mailerMeetingDetail(doctor,patient,meeting,task)
        await meetingModel.findByIdAndDelete(meetingID)
        res.status(200).send({"Message":"Meeting  Deleted successfully."})
    } catch (error) {
            console.log(error.message)
            res.status(400).send({"message":"Sorry :( , Server Error"})
    }
})

module.exports={
    meetingRouter
}