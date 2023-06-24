const mongoose = require("mongoose");

const meetingSchema = mongoose.Schema({
    patinetID: { type: mongoose.ObjectId, ref: 'patient' },
    doctorID: { type: mongoose.ObjectId, ref: 'doctor' },
    concerns:String,
    meetingTime:String,
    meetingDate:String,
    appointmentStatus:String,
    completed:Boolean
})

const meetingModel = mongoose.model("meeting",meetingSchema);

module.exports={meetingModel};