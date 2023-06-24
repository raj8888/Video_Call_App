import * as state from "./state.js";
import * as event from "./event.js";
import * as WebRtc from "./WebRtc.js";
import * as change from "./change.js"

let token=JSON.parse(sessionStorage.getItem("vedmedtoken"))
if(!token){
  window.location.assign("./login.html");
}

// let mainAPI="https://video-call-backend-i5df.onrender.com"
let mainAPI="http://localhost:4500"

const socket = io(`${mainAPI}`, { transports: ["websocket"] });
//registering event for socketId
event.registerSocketEvent(socket);

WebRtc.getLocalPreview();

//personal code copy button
const personal_code_copy_button = document.querySelector(
  "#personal_code_copy_button"
);
personal_code_copy_button.addEventListener("click", () => {
  const personal_code = state.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(personal_code);
});
//event for connecting buttons using personal code
const chat_button = document.querySelector("#personal_code_chat_button");
chat_button.addEventListener("click", () => {
  console.log("chat");
  const client2_code = document.querySelector("#personal_code_input").value;
  WebRtc.preOffers("personal_code_chat", client2_code);
});
const video_button = document.querySelector("#personal_code_video_button");
video_button.addEventListener("click", () => {
  console.log("video");
  const client2_code = document.querySelector("#personal_code_input").value;
  WebRtc.preOffers("personal_code_video", client2_code);
});

//event listener for video call buttons
const micButton=document.getElementById("mic_button")
micButton.addEventListener("click",()=>{
  const localStream=state.getState().localStream;
  const micEnabled=localStream.getAudioTracks()[0].enabled;
  localStream.getAudioTracks()[0].enabled=!micEnabled;
  change.updateMicButton(micEnabled)
})

const cameraButton=document.getElementById("camera_button")
cameraButton.addEventListener("click",()=>{
  const localStream=state.getState().localStream;
  const cameraEnabled=localStream.getVideoTracks()[0].enabled;
  localStream.getVideoTracks()[0].enabled=!cameraEnabled;
  change.updateCameraButton(cameraEnabled)
})

const switchForScreenSharingButton=document.getElementById("screen_sharing_button");
switchForScreenSharingButton.addEventListener("click",()=>{
  const screenSharingActive=state.getState().screenSharingActive;
  WebRtc.switchBetweenCameraAndScreenSharing(screenSharingActive)
})


//hangup

const hangUpButton=document.getElementById("hang_up_button");
hangUpButton.addEventListener("click",()=>{
  WebRtc.handleHangUp();
})

const hangUpChatButton=document.getElementById("finish_chat_call_button");
hangUpChatButton.addEventListener("click",()=>{
  WebRtc.handleHangUp()
})

// const input_msg = document.querySelector("form");
// const container = document.getElementById("top")
// const append =(message,position)=>{
//     const userDiv = document.createElement("p");
//     userDiv.innerText = message;
//     userDiv.classList.add("message");
//     userDiv.classList.add(position)
//     container.append(userDiv)
// }
// input_msg.addEventListener("submit", (e) => {
//     e.preventDefault();
//     var message = document.querySelector("#message").value;
//     console.log(message)
//     // const p = document.createElement("p");
//     // p.innerText = message;
//     append(`You : ${message}`,"right")
//     socket.emit("User_Send",message);
//     message ="";
// })
// socket.on("welcome",(msg)=>{
//     append()
//     console.log(msg);
// });
// socket.on("server_send",(msg)=>{
//     console.log(msg);
//     append(msg,"left")
// });

const newMessageInput= document.getElementById('new_message_input');
let message_container = document.querySelector(".message_container");
newMessageInput.addEventListener('keydown',(event)=>{
  console.log("change occured");
  const key = event.key;
  if(key ==='Enter'){
    WebRtc.sendMessageUsingDataChannel(event.target.value);
    change.appendMessage(event.target.value, true);
    newMessageInput.value="";
    message_container.scrollTop = message_container.scrollHeight - message_container.clientHeight;
  }
})
const sendMessageButton= document.getElementById('send_message_button');
  sendMessageButton.addEventListener('click',()=>{
    const message= newMessageInput.value;
    WebRtc.sendMessageUsingDataChannel(message);
    change.appendMessage(message, true)
    newMessageInput.value="";
  });

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var meetingID = urlParams.get('meetingID');
  let sendtogmailcode=document.getElementById("sendtogmailcode")
  let sendtogmail=document.getElementById("sendtogmail")
  sendtogmail.addEventListener("click",(e)=>{
    e.preventDefault()
    let meetingCode=sendtogmailcode.value
    let obj={
      meetingCode,meetingID
    }
    sendMailOfMeetingCode(obj)
  })


  async function sendMailOfMeetingCode(obj){
    try {
      let url=await fetch(`${mainAPI}/meetings/sendmail`,{
      method:"POST",
      headers:{
          "Content-Type": "application/json",
          authorization:`Bearer ${token}`
      },
      body:JSON.stringify(obj)
  })

  let temp= await url.json()
      if(temp.status==401 || temp.status==400){
          await swal("Server Error!", `Sorry :(, ${temp.message}`, "error");
      }else{
          await swal("Successful!", `${temp.Message}`, "success");
      }
  } catch (error) {
      console.log(error.message)
      await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
  }
  }

  const params = new URLSearchParams(window.location.search)
  const meetingIDVal = params.get('meetingID');
const roleValue = params.get('role');


if(roleValue=="patient"){
  let perSonalCont=document.getElementById("personalCodeCont")
  let gmailInputCont=document.getElementById("gmailInputCont")
  let otherPersonCodeHead=document.getElementById("otherPersonCodeHead")
  let personalCodeInputPlaceholder=document.getElementById("personal_code_input")
  let instructionhead=document.getElementById("instructionhead")
  let allIntructions=document.getElementById("allIntructions")
  let notificationDiv=document.getElementById("notificationDiv")
  perSonalCont.style.display='none'
  gmailInputCont.style.display='none'
  otherPersonCodeHead.innerHTML=`
  <b>- Enter Doctor's meeting code here:</b>
  `
  personalCodeInputPlaceholder.placeholder = 'Enter code here which is send by doctor';
  instructionhead.innerHTML=`
  <b>Intructions for Patients:</b>
  `
  allIntructions.innerHTML=`
  <li>Check your mail which is send by doctor within 5 minutes.</li>
  <p></p>
  <li>Copy Meeting Code from that mail and click on join meeting button.</li>
  <p></p>
  <li>Wait for 5 to 10 minutes to receive mail from doctor.</li>
  <p></p>
  <li>Once you close the window or go back then you are not able to attend this meet again.</li>
  <p></p>
  <li>If you don't receive mail from doctor then you can click on below button to send notification to doctor.(In Emergency Only)</li>
  `
  notificationDiv.innerHTML=`
  <button id='notificationbtnforpatient'>Send Notification to Doctor</button>
  `
  let notificationbtnforpatient=document.getElementById('notificationbtnforpatient')
  notificationbtnforpatient.addEventListener("click",(e)=>{
    sendNotification()
  })
}else{
  let instructionhead=document.getElementById("instructionhead")
  let allIntructions=document.getElementById("allIntructions")
  let personalCodeIp=document.getElementById("personal_code_input")
  let joinorrejectbtn=document.getElementById("joinorrejectbtn")
  let notificationDiv=document.getElementById("notificationDiv")

  instructionhead.innerHTML=`
  <b>Intructions for Doctors:</b>
  `
  allIntructions.innerHTML=`
  <li>Copy your meeting code and paste it into below box and and click on send button.</li>
  <p></p>
  <li>Wait for sometime (5 to 10 min.). You will receive call from patient side.</li>
  <p></p>
  <li>If user not join meet on time then you can send notification to user using below emergecy notification button </li>
  <p></p>
  `
  personalCodeIp.style.display='none'
  joinorrejectbtn.style.display='none'
  notificationDiv.innerHTML=`
  <button id='notificationbtnfordoctor'>Send Notification to Patient</button>
  `
  let notificationbtnfordoctor=document.getElementById('notificationbtnfordoctor')
  notificationbtnfordoctor.addEventListener("click",(e)=>{
    sendNotification()
  })
}

async function sendNotification(){
  try {
    let url=await fetch(`${mainAPI}/meetings/notification/${meetingIDVal}`,{
    method:"POST",
    headers:{
        "Content-Type": "application/json",
        authorization:`Bearer ${token}`
    }
})

let temp= await url.json()
    if(temp.status==401 || temp.status==400){
        await swal("Server Error!", `Sorry :(, ${temp.message}`, "error");
    }else{
        await swal("Successful!", `${temp.Message}`, "success");
    }
} catch (error) {
    console.log(error.message)
    await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
}
}