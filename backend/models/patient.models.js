const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    mobile:String,
    sex:String,
    role:{type:String,default:"patient"},
    age:Number,
    meetings:[{type:String}],
    createdDate:String
})

const patientModel = mongoose.model("patient",patientSchema);

module.exports={patientModel};