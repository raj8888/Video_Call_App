const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    mobile:String,
    sex:String,
    role:{type:String,default:"client"},
    age:Number,
    meetings:[{type:String}],
    createdDate:String
})

const doctorModel = mongoose.model("doctor",doctorSchema);

module.exports={doctorModel};