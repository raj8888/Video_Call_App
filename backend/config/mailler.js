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

  if(task==='createappointment'){
    // Send Mail to Doctor
  transporter.sendMail({
    to: doctor.email,
    from:  process.env.mailID,
    subject: "Hey, Patient send message to you to book appointment.",
    text: "From vedmedApp.",
    html: 
    `
      <h1>Hello ${doctor.name}</h1>
      <h2>Here are your appointment details:-<h2> 
      <p><b>Patient Name: </b>${patient.name}</p>
      <p><b>Meeting Date: </b>${meeting.meetingDate}</p>
      <p><b>Meeting Time: </b>${meeting.meetingTime}</p>      
      <p>*For update status of appoingment please update thour app.</p>      
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
  }else if(task.whom=='sendtopatient'){
    transporter
  .sendMail({
    to: patient.email,
    from: process.env.mailID,
    subject: "Hey, Please join meet.",
    text: "From vedmedApp",
    html: `
      <h1>Hello ${patient.name},</h1>
      <p><b>Doctor Name: </b>${doctor.name}</p>
      <p><b>Meeting Date: </b>${meeting.meetingDate}</p>
      <p><b>Meeting Time: </b>${meeting.meetingTime}</p>
      <p><b>Meeting ID: </b>${meeting._id}</p> 
      <p><b>Meeting Code: </b>${task.meetingCode}</p> 
      <p>ThankYou for your service.</p>  
      <p>Copy this meeting code to the personal code and click on video to join the meet.</p>
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
  }else if(task.whom=='sendtodoctor'){
    transporter
  .sendMail({
    to: doctor.email,
    from: process.env.mailID,
    subject: "Hey, Please join meet.",
    text: "From vedmedApp",
    html: `
      <h1>Hello ${doctor.name},</h1>
      <p><b>Patient Name: </b>${patient.name}</p>
      <p><b>Meeting Date: </b>${meeting.meetingDate}</p>
      <p><b>Meeting Time: </b>${meeting.meetingTime}</p>
      <p><b>Meeting ID: </b>${meeting._id}</p> 
      <p><b>Meeting Code: </b>${task.meetingCode}</p> 
      <p>ThankYou for your service.</p>  
      <p>Copy this meeting code to the personal code and click on video to join the meet.</p>
      <p>*Please Do not share this information with anyone.</p>     
    `,
  })
  .then((info) => {
    console.log(info.response);
    console.log("Mail sent to doctor.");
  })
  .catch((err) => {
    console.log(err);
  });
  }else if(task='createmeeting'){
     // Send Mail to Doctor
  transporter
  .sendMail({
    to: doctor.email,
    from:  process.env.mailID,
    subject: "Hi Doctor, meeting scheduled by you.",
    text: "From vedmedApp.",
    html: `
      <h1>Hello ${doctor.name},</h1>
      <p>You accept the appointment of patient and scheduled meeting just now.</p>
      <p>Here are your meeting details:</p>
      <p><b>Patient Name: </b>${patient.name}</p>
      <p><b>Patient Concerns: </b>${meeting.concerns}</p>
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
    subject: "Accepted, Your meeting schecduled with doctor.",
    text: "From vedmedApp",
    html: `
      <h1>Hello ${patient.name},</h1>
      <p>Meeting is scheduled by doctor.</p>
      <p><b>Doctor name: </b>${doctor.name}</p>
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
  }else if(task='cancelappointment'){
    transporter
  .sendMail({
    to: patient.email,
    from: process.env.mailID,
    subject: "Rejectoed, Your appointment rejected by doctor.",
    text: "From vedmedApp",
    html: `
      <h1>Hello ${patient.name},</h1>
      <p>Appointment is rejected by doctor.</p>
      <p><b>Doctor name: </b>${doctor.name}</p>
      <p><b>Meeting Date: </b>${meeting.meetingDate}</p>
      <p><b>Meeting Time: </b>${meeting.meetingTime}</p>
      <p>Please select different time and date to book appointment.</p>  
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