let token=JSON.parse(sessionStorage.getItem("vedmedtoken"))
if(!token){
    window.location.assign("./login.html");
}
let mainAPI="https://video-call-backend-i5df.onrender.com"
// let mainAPI="http://localhost:4500"
let allmeetings=document.getElementById("allmeetings")
let allMeets=document.getElementById("allMeets")
let allApp=document.getElementById("allApp")


getAllMeetings()
async function getAllMeetings(){
    allApp.style.backgroundColor='white'
    allMeets.style.backgroundColor='#f18080'
    try {
        let url=await fetch(`${mainAPI}/meetings/doctors/all`,{
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`
        }
    })

    let temp= await url.json()
        if(temp.status==401 || temp.status==400){
            await swal("Server Error!", `Sorry :(, ${temp.message}`, "error");
        }else{
           let meetings=temp.meetings 
           renderAllMeeting(meetings)
        }
    } catch (error) {
        console.log(error.message)
        await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
    }
}


function renderAllMeeting(temp){
    if(temp.length==0){
        let meethead=document.getElementById("meethead")
        meethead.innerText='Meetings Not Created By Patient With You.'
        allmeetings.innerHTML=`
        <p>*Check Appointment Section.</p>
        `
    }else{
        let meethead=document.getElementById("meethead")
        meethead.innerText='All Meetings:'
        let tempData=temp.map(elem=>{
            return`
            <div class="meetings">
                    <p>- <b>PatientID:</b></p>
                    <p>${elem.patinetID}</p>
                    <p>- <b>Concerns:</b></p>
                    <p>${elem.concerns}</p>
                    <p>- <b>meetingID:</b></p>
                    <p>${elem._id}</p>
                    <p>- <b>MeetingDate:</b></p>
                    <p>${elem.meetingDate}</p>
                    <p>- <b>MeetingTime:</b></p>
                    <p>${elem.meetingTime}</p>
                    <div class='meetbtns'>
                    <button class='joinmeet'  data-id=${elem._id}>Join Meet</button>
                    </div>
                </div>
            `
        })
    
        allmeetings.innerHTML=tempData.join("")
        let joinbtn=document.querySelectorAll(".joinmeet")
        joinbtn.forEach(elem=>{
            elem.addEventListener('click',async(event)=>{
                let meetId = event.target.dataset.id;
                let ans=await checkMeetStartOrNot(meetId)
                // let ans=true
                if(ans){
                    const joinUrl = `../Pages/meet.html?meetingID=${meetId}&role=doctor`;
                    window.location.href = joinUrl;
                }else{
                    await swal("Error!", "Sorry :(, Time and Date didn't match to start meeting", "error");
                }
            })
        })
    }
   
}

function renderMainPage(){
    allApp.style.backgroundColor='white'
    allMeets.style.backgroundColor='#f18080'
    location.reload();
}
async function getAllAppointments(){
    try {
        let url=await fetch(`${mainAPI}/meetings/doctors/appointment`,{
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`
        }
    })

    let temp= await url.json()
        if(temp.status==401 || temp.status==400){
            await swal("Server Error!", `Sorry :(, ${temp.message}`, "error");
        }else{
           let appointments=temp.appointments 
           renderAllAppointments(appointments)
        }
    } catch (error) {
        console.log(error.message)
        await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
    }
}


function renderAllAppointments(temp){
    allApp.style.backgroundColor='#f18080'
    allMeets.style.backgroundColor='white'
  if(temp.length==0){
    let meethead=document.getElementById("meethead")
    meethead.innerText='Appointments Not Created By Patient With You.'
    allmeetings.style.display='none'
  }else{
    let tempData=temp.map(elem=>{
        return`
        <div class="appointments">
                <p>- <b>PatientID:</b></p>
                <p>${elem.patinetID}</p>
                <p>- <b>Concerns:</b></p>
                <p>${elem.concerns}</p>
                <p>- <b>MeetingDate:</b></p>
                <p>${elem.meetingDate}</p>
                <p>- <b>MeetingTime:</b></p>
                <p>${elem.meetingTime}</p>
                <div class='appintmentsbtns'>
                <button class='accept'  data-id=${elem._id}>Accept</button>
                <button class='reject'  data-id=${elem._id}>Reject</button>
                </div>
            </div>
        `
    })
    allmeetings.innerHTML=tempData.join("")
    let acceptbtn=document.querySelectorAll(".accept")
    let rejectbtn=document.querySelectorAll(".reject")

    acceptbtn.forEach(elem=>{
        elem.addEventListener("click",(event)=>{
            let appointmentId = event.target.dataset.id;
            let obj={
                appointmentStatus:'accept'
            }
            appointmentStatusUpdate(obj,appointmentId)
        })
    })
    rejectbtn.forEach(elem=>{
        elem.addEventListener("click",(event)=>{
            let appointmentId = event.target.dataset.id;
            let obj={
                appointmentStatus:'reject'
            }
            appointmentStatusUpdate(obj,appointmentId)
        })
    })
  }
}


async function appointmentStatusUpdate(obj,meetingID){
    try {
        let url=await fetch(`${mainAPI}/meetings/doctor/appointment/${meetingID}`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            authorization:`Bearer ${token}`
        },
        body:JSON.stringify(obj)
    })

    let serverRes=await url.json()
    if(serverRes.status==400 || serverRes.status==401){
        await swal("ERROR!", `${serverRes.message}`, "error");
    }else{
        if(obj.appointmentStatus=='accept'){
            await swal("Successfull!", "Meetings is scheduled with patient.", "success"); 
        }else{
            await swal("Rejected!", "Appointment rejected by you.", "success");
        }
        getAllAppointments()
    }
    } catch (error) {
        console.log(error.message)
        await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
    }
}
async function checkMeetStartOrNot(meetID){
    try {
        let url=await fetch(`${mainAPI}/meetings/single/${meetID}`,{
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`
        }
    })

    let temp= await url.json()
        if(temp.status==401 || temp.status==400){
            await swal("Server Error!", `Sorry :(, ${temp.message}`, "error");
        }else{
           let meeting=temp.meetingData 
           let date=meeting.meetingDate
           let time=meeting.meetingTime
           var currentDate = new Date();

            // Format the date as "YYYY-MM-DD"
            var year = currentDate.getFullYear();
            var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
            var day = ('0' + currentDate.getDate()).slice(-2);
            var formattedDate = year + '-' + month + '-' + day;

            // Format the time as "HH:MM"
            var hours = ('0' + currentDate.getHours()).slice(-2);
            var minutes = ('0' + currentDate.getMinutes()).slice(-2);
            var formattedTime = hours + ':' + minutes;
            if(formattedDate==date && formattedTime==time){
                return true
            }else{
                return false
            }
        }
    } catch (error) {
        console.log(error.message)
        await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
    }
}