const nodemailer = require("nodemailer");
require("dotenv").config();

const mailerMeetingDetail = (doctor,patient,meeting,task) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.mailID,
      pass: process.env.mailPass,
    },
  });

  if(task==='create'){
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
      <p><b>Meeting ID: </b>${meeting._id}</p>      
      <p>Please Do not share this information with anyone.</p>      
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
      <p><b>Doctor Name: </b>${doctor.name}</p>
      <p><b>Meeting Date: </b>${meeting.meetingDate}</p>
      <p><b>Meeting Time: </b>${meeting.meetingTime}</p>
      <p><b>Meeting ID: </b>${meeting._id}</p>   
      <p>*Please Do not share this information with anyone.</p>     
    `,
  })
  .then((info) => {
    console.log(info.response);
    console.log("Mail sent to patient.");
  })
  .catch((err) => {
    console.log(err);
  });
  }else if(task==='update'){
    // Send Mail to Doctor
  transporter
  .sendMail({
    to: doctor.email,
    from:  process.env.mailID,
    subject: "Hey, Meeting information updated by patient.",
    text: "From vedmedApp ",
    html: `
      <h1>Hello ${doctor.name}</h1>
      <p>A patient  has booked a meeting with you.</p>
      <h2>Here are your Meeting details:-<h2> 
      <p><b>Patient Name: </b>${patient.name}</p>
      <p><b>Meeting Date: </b>${meeting.meetingDate}</p>
      <p><b>Meeting Time: </b>${meeting.meetingTime}</p>      
      <p><b>Meeting ID: </b>${meeting._id}</p>      
      <p>Please Do not share this information with anyone.</p>      
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
    subject: "Successfull, Meeting information updated successfully",
    text: "From vedmedApp",
    html: `
      <h1>Hello ${patient.name}</h1>
      <p>Thank you for booking a meeting on vedmedApp.</p>
      <h2>Here are your meeting details:-<h2> 
      <p><b>Doctor Name: </b>${doctor.name}</p>
      <p><b>Meeting Date: </b>${meeting.meetingDate}</p>
      <p><b>Meeting Time: </b>${meeting.meetingTime}</p>
      <p><b>Meeting ID: </b>${meeting._id}</p>   
      <p>*Please Do not share this information with anyone.</p>     
    `,
  })
  .then((info) => {
    console.log(info.response);
    console.log("Mail sent to patient.");
  })
  .catch((err) => {
    console.log(err);
  });
  }else if(task==='delete'){
     // Send Mail to Doctor
  transporter
  .sendMail({
    to: doctor.email,
    from:  process.env.mailID,
    subject: "Hey, Meeting cancelled by patient.",
    text: "From vedmedApp ",
    html: `
      <h1>Hello ${doctor.name},</h1>
      <p>A patient unfortunately cancelled a meeting with you.</p>
      <p><b>Meeting Date: </b>${meeting.meetingDate}</p>
      <p><b>Meeting Time: </b>${meeting.meetingTime}</p>      
      <p><b>Meeting ID: </b>${meeting._id}</p>   
      <p>ThankYou for your service.</p>   
      <p>Please Do not share this information with anyone.</p>      
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
    subject: "Cancelled, Meeting cancelled by you",
    text: "From vedmedApp",
    html: `
      <h1>Hello ${patient.name},</h1>
      <p>Meeting is cancelled by you.</p>
      <p><b>Meeting Date: </b>${meeting.meetingDate}</p>
      <p><b>Meeting Time: </b>${meeting.meetingTime}</p>
      <p><b>Meeting ID: </b>${meeting._id}</p> 
      <p>ThankYou for your service.</p>  
      <p>*Please Do not share this information with anyone.</p>     
    `,
  })
  .then((info) => {
    console.log(info.response);
    console.log("Mail sent to patient.");
  })
  .catch((err) => {
    console.log(err);
  });
  }
};

module.exports = { mailerMeetingDetail };