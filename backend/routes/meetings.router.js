const express=require("express")
const { patientModel } = require("../models/patient.models")
const { doctorModel } = require("../models/doctor.model")
const { meetingModel } = require("../models/meetings.model")
const {mailerMeetingDetail}=require("../config/mailler")
const {authenticator}=require("../middlewares/authentication.middleware")
const {authorization}=require("../middlewares/authorization.middleware")
const { get } = require("mongoose")

const meetingRouter = express.Router()
meetingRouter.use(authenticator)

meetingRouter.post("/patients/appointment",authorization(['admin','patient']),async(req,res)=>{
    try {
        let meetingDate=req.body.meetingDate
        let meetingTime=req.body.meetingTime
        let patientID=req.body.userID
        let doctorID=req.body.doctorID
        let concerns=req.body.concerns
        let newwmeeting=new meetingModel({
            patinetID:patientID ,
            doctorID:doctorID ,
            concerns:concerns,
            meetingTime:meetingTime,
            meetingDate:meetingDate,
            appointmentStatus:'pending',
            completed:false
        })
        let patient=await patientModel.findOne({_id:patientID})
        let doctor=await doctorModel.findOne({_id:doctorID})
        let meeting=await newwmeeting.save()
        let task='createappointment'
        mailerMeetingDetail(doctor,patient,meeting,task)
        res.status(200).send({"Message":"Appointment message send successfully"})
    } catch (error) {
            console.log(error.message)
            res.status(400).send({"message":"Sorry :( , Server Error"})
    }
})

meetingRouter.post("/doctor/appointment/:meetingID",authorization(['admin','doctor']),async(req,res)=>{
    try {
        let meetingID=req.params.meetingID
        let status=req.body.appointmentStatus
        let meeting=await meetingModel.findById(meetingID)
        let patientID=meeting.patinetID
        let doctorID=meeting.doctorID
        let patient=await patientModel.findOne({_id:patientID})
        let doctor=await doctorModel.findOne({_id:doctorID})
        if(status==='accept'){
        await meetingModel.findByIdAndUpdate({_id:meetingID},{appointmentStatus:'accept'})
        let task='createmeeting'
        mailerMeetingDetail(doctor,patient,meeting,task)
        res.status(200).send({"Message":"Meeting Successfully created."})
       }else{
        let task='cancelappointment'
        mailerMeetingDetail(doctor,patient,meeting,task)
        await meetingModel.findByIdAndUpdate({_id:meetingID},{appointmentStatus:'reject'})
        res.status(200).send({"Message":"Sorry :( , Appointement rejected by doctor. Please select different date and time for meeting."})
       }
        
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

meetingRouter.get("/patients/all",authorization(['admin','patient']),async(req,res)=>{
    try {
        let patientID=req.body.userID
        let meetings=await meetingModel.find({patinetID:patientID,appointmentStatus:'accept'})
        res.status(201).send({"message":"Patient all meeting",'meetings':meetings})
    } catch (error) {
        console.log(error.message)
        res.status(400).send({"message":"Sorry :( , Server Error"})
    }
})

meetingRouter.get("/doctors/appointment",authorization(['admin','doctor']),async(req,res)=>{
    try {
        let doctorID=req.body.userID
        let appointments=await meetingModel.find({doctorID:doctorID,appointmentStatus:'pending'})
        res.status(201).send({"message":"All appointments of doctor.",'appointments':appointments})
    } catch (error) {
        console.log(error.message)
        res.status(400).send({"message":"Sorry :( , Server Error"})
    }
})


meetingRouter.get("/doctors/all",authorization(['admin','doctor']),async(req,res)=>{
    try {
        let doctorID=req.body.userID
        let meetings=await meetingModel.find({doctorID:doctorID,appointmentStatus:'accept'})
        res.status(201).send({"message":"Doctor all meeting",'meetings':meetings})
    } catch (error) {
        console.log(error.message)
        res.status(400).send({"message":"Sorry :( , Server Error"})
    }
})

meetingRouter.get("/single/:meetingID",authorization(['admin','patient','doctor']),async(req,res)=>{
    try {
        let meetingID=req.params.meetingID
        let meetingData=await meetingModel.findById(meetingID)
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

meetingRouter.post("/sendmail",async(req,res)=>{
    try {
        let meetingCode=req.body.meetingCode
        let meetingID=req.body.meetingID
        let userRole=req.body.userRole
        let meeting=await meetingModel.findById(meetingID)
        let patientID=meeting.patinetID
        let doctorID=meeting.doctorID
        let patient=await patientModel.findOne({_id:patientID})
        let doctor=await doctorModel.findOne({_id:doctorID})
        let task;
        if(userRole=='patient'){
            task={
                whom:'sendtodoctor',
                meetingCode:meetingCode
            }
            mailerMeetingDetail(doctor,patient,meeting,task)
        }else{
            task={
                whom:'sendtopatient',
                meetingCode:meetingCode
            }
            mailerMeetingDetail(doctor,patient,meeting,task)
        }
        res.status(200).send({"Message":"Meeting Code Send Successfully..."})
    } catch (error) {
        console.log(error.message)
            res.status(400).send({"message":"Sorry :( , Server Error"})
    }
})

meetingRouter.post("/notification/:meetingID",async(req,res)=>{
    try {
        let meetingID=req.params.meetingID
        let userRole=req.body.userRole
        let meeting=await meetingModel.findById(meetingID)
        let patientID=meeting.patinetID
        let doctorID=meeting.doctorID
        let patient=await patientModel.findOne({_id:patientID})
        let doctor=await doctorModel.findOne({_id:doctorID})
        console.log(userRole)
        if(userRole=='doctor'){
            let task="notefToDoctor"
            mailerMeetingDetail(doctor,patient,meeting,task)
            res.status(200).send({"Message":"Notification send to doctor"})
        }else{
            let task="notefToPatient"
            mailerMeetingDetail(doctor,patient,meeting,task)
            res.status(200).send({"Message":"Notification send to patient"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).send({"message":"Sorry :( , Server Error"})
    }
})

meetingRouter.get("/checktime/:meetingID",authorization(['admin','patient','doctor']),async(req,res)=>{
    try {
        let meetingID=req.params.meetingID
        let meetingData=await meetingModel.findById(meetingID)
        let date=meetingData.meetingDate
        let time=meetingData.meetingTime
        const currentDate = new Date().toISOString().split('T')[0];
        let currentTime=getCurrentTime()
        let laterTime =getLaterTime(time)
        let earlierTime =getEarlierTime(time)
        let getTodayDate=getDate(date,currentDate)
        if(getTodayDate=="smaller"){
            res.status(200).send({"Message":"Your appointment date passed away.Please create another appointment.","flag":false})
        }else if(getTodayDate=="greater"){
            res.status(200).send({"Message":"Your appointment date not come yet.Please wait.","flag":false})
        }else{
            console.log(currentTime < earlierTime)
            console.log(currentTime > laterTime)
            console.log(currentTime,earlierTime,laterTime)
             if (currentTime < earlierTime) {
                res.status(200).send({"Message":"Your appointment time not come yet.Please wait.","flag":false})
             }else if(currentTime > laterTime){
                res.status(200).send({"Message":"Your appointment time passed away.Please create another appointment.","flag":false})
             }else if(currentTime >= earlierTime && currentTime <= laterTime){
                res.status(200).send({"Message":"You can join meet","flag":true})
             }
        }
        
    } catch (error) {
        console.log(error.message)
        res.status(400).send({"message":"Sorry :( , Server Error"})
    }
})

// Calculate the time 5 minutes later than the current time
function getLaterTime(currentTime) {
  const [hours, minutes] = currentTime.split(':');
  const laterMinutes = parseInt(minutes) + 5;
  const laterHours = parseInt(hours) + Math.floor(laterMinutes / 60);
  const formattedHours = String(laterHours).padStart(2, '0');
  const formattedMinutes = String(laterMinutes % 60).padStart(2, '0');
  return formattedHours + ':' + formattedMinutes;
}

// Calculate the time 5 minutes earlier than the current time
function getEarlierTime(currentTime) {
  const [hours, minutes] = currentTime.split(':');
  const earlierMinutes = parseInt(minutes) - 5;
  const earlierHours = parseInt(hours) + Math.floor(earlierMinutes / 60);
  const formattedHours = String(earlierHours).padStart(2, '0');
  const formattedMinutes = String(earlierMinutes % 60).padStart(2, '0');
  return formattedHours + ':' + formattedMinutes;
}

function getDate(date1, date2){
  const timestamp1 = new Date(date1).getTime();
  const timestamp2 = new Date(date2).getTime();

  if (timestamp1 < timestamp2) {
    return 'smaller';
  } else if (timestamp1 > timestamp2) {
    return 'greater';
  } else {
    return 'equal';
  }
}

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return hours + ':' + minutes;
  }

module.exports={
    meetingRouter
}