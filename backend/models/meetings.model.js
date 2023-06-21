const mongoose = require("mongoose");

const meetingSchema = mongoose.Schema({
    patinetID: { type: mongoose.ObjectId, ref: 'patient' },
    doctorID: { type: mongoose.ObjectId, ref: 'doctor' },
    meetingTime:String
})

const meetingModel = mongoose.model("meeting",meetingSchema);

module.exports={meetingModel};