const nodemailer = require("nodemailer");
require("dotenv").config();

const mailOrderDetail = (order, classes, user,trainer) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.mailID,
      pass: process.env.mailPass,
    },
  });

  // Send Mail to Doctor
  transporter
    .sendMail({
      to: doctor.email,
      from:  process.env.mailID,
      subject: "Hey, Your meeting is Confirmed with patient.",
      text: "From vedmedApp ",
      html: `
        <h1>Hello ${doctor.name}</h1>
        <p>A patient  has booked a meeting with you.</p>
        <h2>Here are your Meeting details:-<h2> 
        <p><b>Patient Name: </b>${patient.name}</p>
        <p><b>Meeting Date: </b>${meeting.meetingDate}</p>
        <p><b>Meeting Time: </b>${meeting.meetingTime}</p>      
      `,
    })
    .then((info) => {
      console.log(info.response);
      console.log("Mail sent to Doctor.");
    })
    .catch((err) => {
      console.log(err);
    });

  // Send Mail to patient
  transporter
    .sendMail({
      to: patient.email,
      from: process.env.mailID,
      subject: "ThankYou, Your meeting is Confirmed with Doctor.",
      text: "From vedmedApp",
      html: `
        <h1>Hello ${patient.name}</h1>
        <p>Thank you for booking a meeting on vedmedApp.</p>
        <h2>Here are your meeting details:-<h2> 
        <p><b>Doctor Name: </b>${meeting.doctor}</p>
        <p><b>Meeting Date: </b>${meeting.meetingDate}</p>
        <p><b>Meeting Time: </b>${meeting.meetingTime}</p>       
      `,
    })
    .then((info) => {
      console.log(info.response);
      console.log("Mail sent to patient.");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { mailOrderDetail };