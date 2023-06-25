let token=JSON.parse(sessionStorage.getItem("vedmedtoken"))
if(!token){
    window.location.assign("./login.html");
}

let allDocs=document.getElementById("allDocs")
let allMeets=document.getElementById("allMeets")
let allApps=document.getElementById("allApps")

let showname=document.getElementById("name-container")

let mainAPI="https://video-call-backend-i5df.onrender.com"
// let mainAPI="http://localhost:4500"

getAllDoctors()
async function getAllDoctors(){
    try {
        let url=await fetch(`${mainAPI}/doctors/all`,{
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`
        }
    })

    let temp= await url.json()
        if(temp.status==401 || temp.status==400){
            await swal("Server Error!", `Sorry :(, ${temp.message}`, "error");
        }else{
           let allDoctors=temp.allDoctors
           renderAllDoctors(allDoctors)
        }
    } catch (error) {
        console.log(error.message)
        await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
    }
}

function renderAllDoctors(docs){
    allDocs.style.backgroundColor='#f18080'
    allMeets.style.backgroundColor='white'
    allApps.style.backgroundColor='white'
    let tempData=docs.map(elem=>{
      return  `
        <div class="doctors">
                    <p>- <b>Name:</b></p>
                    <p>${elem.name}</p>
                    <p>- <b>Area of Specilization:</b></p>
                    <p>${elem.areaOfSpecialization}</p>
                    <p>- <b>DoctorId:</b></p>
                    <p>${elem._id}</p>
                    <p><b>Copy DoctorId to form to create meeting.</b></p>
        </div>
        `
    })

    let rendermid=document.getElementById("rendermid")
    rendermid.innerHTML=`
    <h3 id="all-doc-head"></h3>
    <div id="show-all_docs">
                    
    </div>
    `
    let showAllDoc=document.getElementById("show-all_docs")
    showAllDoc.innerHTML=tempData.join("")
    let dochead=document.getElementById("all-doc-head")
    dochead.innerText='All Doctors List'
}

let searchbtn=document.getElementById("searchbtn")
let searchIP=document.getElementById("search")
searchbtn.addEventListener("click",(event)=>{
    let searchVal=searchIP.value
    let obj={
        searchVal:searchVal
    }
    findSearchData(obj)
})

async function findSearchData(obj){
    try {
        let url=await fetch(`${mainAPI}/doctors/search`,{
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
          renderAllDoctors(temp.searchData)
        }
    } catch (error) {
        console.log(error.message)
        await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
    }
}

let createMeetbtn=document.querySelector("#cr-btn-meet")
let meetform=document.querySelector(".meetform")
createMeetbtn.addEventListener("click",(e)=>{
        e.preventDefault()
        let doctorID=document.querySelector(".doctor-id").value
        let meetingDate=document.querySelector(".date").value
        let meetingTime=document.querySelector(".time").value
        let concerns=document.querySelector(".concerns").value
        let obj={meetingDate,meetingTime,doctorID,concerns}
        createAppointment(obj)
})

async function createAppointment(obj){
    try {
        let url=await fetch(`${mainAPI}/meetings/patients/appointment`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            authorization:`Bearer ${token}`
        },
        body:JSON.stringify(obj)
    })

    let temp= await url.json()
    console.log(temp)
        if(temp.status==401 || temp.status==400){
            await swal("Server Error!", `Sorry :(, ${temp.message}`, "error");
        }else{
            document.getElementById("doctor-id").value=''
            document.getElementById("date").value=''
            document.getElementById("time").value=''
            document.getElementById("concerns").value=''
            await swal("Successful!", "Appointment Send to doctor successfully", "success");
            getAllAppsForShow()
        }
    } catch (error) {
        console.log(error.message)
        await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
    }
}



async function getAllMeeting(){
    try {
        let url=await fetch(`${mainAPI}/meetings/patients/all`,{
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
           renderAllMeetings(meetings)
        }
    } catch (error) {
        console.log(error.message)
        await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
    }
}


async function renderAllMeetings(temp){
    allDocs.style.backgroundColor='white'
    allMeets.style.backgroundColor='#f18080'
    allApps.style.backgroundColor='white'
    if(temp.length==0){
        let dochead=document.getElementById("all-doc-head")
        dochead.innerText='Meeting is not created by you till now.'
        let showAllMeet=document.getElementById("show-all_docs")
        showAllMeet.style.display="none"
    }else{
    
    let tempData=temp.map(elem=>{
        return `
        <div class="meetings">
                    <p>- <b>DoctorID:</b></p>
                    <p>${elem.doctorID}</p>
                    <p>- <b>Concerns:</b></p>
                    <p>${elem.concerns}</p>
                    <p>- <b>meetingID:</b></p>
                    <p>${elem._id}</p>
                    <p>- <b>MeetingDate:</b></p>
                    <p>${elem.meetingDate}</p>
                    <p>- <b>MeetingTime:</b></p>
                    <p>${elem.meetingTime}</p>
                    <div class='meetbtns'>
                    <button class='updatebtn'  data-id=${elem._id}>Update</button>
                    <button class='deletebtn'  data-id=${elem._id}>Delete</button>
                    <button class='joinmeet'  data-id=${elem._id}>Join Meet</button>
                    </div>
                    
        </div>
        `
    })
    let rendermid=document.getElementById("rendermid")
    rendermid.innerHTML=`
    <h3 id="all-doc-head"></h3>
    <div id="show-all_docs">
                    
    </div>
    `
    let showAllMeet=document.getElementById("show-all_docs")
    showAllMeet.innerHTML=tempData.join("")
    let dochead=document.getElementById("all-doc-head")
    dochead.innerText='All Meetings List'

    let updatebtns=document.querySelectorAll(".updatebtn")
    updatebtns.forEach(elem=>{
        elem.addEventListener("click",(event)=>{
            let id=event.target.dataset.id;
            getMetForUpdate(id)
        })
    })

    let deletebtns=document.querySelectorAll(".deletebtn")
    deletebtns.forEach(elem=>{
        elem.addEventListener('click',(event)=>{
            let id = event.target.dataset.id;
            deleteMeeting(id)
        })
    })

    let joinbtn=document.querySelectorAll(".joinmeet")
    joinbtn.forEach(elem=>{
        elem.addEventListener('click',async(event)=>{
            let meetId = event.target.dataset.id;
            let ans=await checkMeetStartOrNot(meetId)
            // let ans=true
            // let arr=[temp.flag,temp.Message]
            if(ans[0]==true){
                const joinUrl = `../Pages/meet.html?meetingID=${meetId}&role=patient`;
                window.location.href = joinUrl;
            }else{
                await swal("Error!", `${ans[1]}`, "error");
            }
        })
    })
    }
}

async function getMetForUpdate(id){
    try {
        let url=await fetch(`${mainAPI}/meetings/single/${id}`,{
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`
        }
    })

    let temp= await url.json()
        if(temp.status==401 || temp.status==400){
            await swal("Server Error!", `Sorry :(, ${temp.message}`, "error");
        }else{
            let meetings=temp.meetingData
            updateData(meetings,id)
        }
    } catch (error) {
        console.log(error.message)
        await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
    }
}

async function deleteMeeting(id){
    try {
        let url=await fetch(`${mainAPI}/meetings/delete/${id}`,{
        method:"DELETE",
        headers:{
            authorization:`Bearer ${token}`
        }
    })

    let temp= await url.json()
        if(temp.status==401 || temp.status==400){
            await swal("Server Error!", `Sorry :(, ${temp.message}`, "error");
        }else{
            await swal("Deleted!", "Meeting Deleted Successfully", "success");
            getAllMeeting()
        }
    } catch (error) {
        console.log(error.message)
        await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
    }
}


function updateData(meeting,id){
    let upForm=document.getElementById("meetform")
    let doctorID=document.getElementById("doctor-id")
    let date=document.getElementById("date")
    let time=document.getElementById("time")
    let concerns=document.getElementById("concerns")
    let crbtnmeet=document.getElementById("cr-btn-meet")
    let upbtn=document.getElementById("up-btn-meet")
    crbtnmeet.style.display='none'
    upbtn.style.display='inline'
    upbtn.style.paddingLeft="30px"
    upbtn.style.paddingRight="30px"
    upbtn.style.paddingTop="10px"
    upbtn.style.paddingBottom="10px"
    upbtn.style.textAlign='center'
    upbtn.style.marginLeft='30%'

    doctorID.value=meeting.doctorID
    date.value=meeting.meetingDate
    time.value=meeting.meetingTime
    concerns.value=meeting.concerns
    
    upbtn.addEventListener("click",(event)=>{
        event.preventDefault()
        let obj={
            doctorID:doctorID.value ,
            concerns:concerns.value,
            meetingTime:time.value,
            meetingDate:date.value,
        }
        updateNewData(obj,id)
    })
}

async function updateNewData(obj,id){
    try {
        let url=await fetch(`${mainAPI}/meetings/update/${id}`,{
        method:"PATCH",
        headers:{
            authorization:`Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body:JSON.stringify(obj)
    })

    let temp= await url.json()
        if(temp.status==401 || temp.status==400){
            await swal("Server Error!", `Sorry :(, ${temp.message}`, "error");
        }else{
            await swal("Updated!", "Meeting Updated Successfully", "success");
            document.getElementById("doctor-id").value=''
            document.getElementById("date").value=''
            document.getElementById("time").value=''
            document.getElementById("concerns").value=''
            getAllMeeting()
        }
    } catch (error) {
        console.log(error.message)
        await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
    }
}

async function checkMeetStartOrNot(meetID){
    try {
        let url=await fetch(`${mainAPI}/meetings/checktime/${meetID}`,{
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`
        }
    })

    let temp= await url.json()
        if(temp.status==401 || temp.status==400){
            await swal("Server Error!", `Sorry :(, ${temp.message}`, "error");
        }else{   
           let arr=[temp.flag,temp.Message]
           return arr   
        }
    } catch (error) {
        console.log(error.message)
        await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
    }
}


async function getAllAppsForShow(){
    try {
        let url=await fetch(`${mainAPI}/meetings/all/patient`,{
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`
        }
    })

    let temp= await url.json()
        if(temp.status==401 || temp.status==400){
            await swal("Server Error!", `Sorry :(, ${temp.message}`, "error");
        }else{
           let appointments=temp.meetings 
           renderAllAppointsForStatus(appointments)
        }
    } catch (error) {
        console.log(error.message)
        await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
    }
}

 function renderAllAppointsForStatus(temp){
    allDocs.style.backgroundColor='white'
    allMeets.style.backgroundColor='white'
    allApps.style.backgroundColor='#f18080'
    let searchSec=document.getElementById("seatch-fun")
    searchSec.style.display='none'
    if(temp.length==0){
        let dochead=document.getElementById("all-doc-head")
        dochead.innerText='Apppointments is not created by you till now.'
        let showAllMeet=document.getElementById("show-all_docs")
        showAllMeet.style.display="none"
    }else{
    let tempData=temp.map(elem=>{
        let flag=elem.appointmentStatus
        let status;
        if(flag=='accept'){
            status='Accepted'
        }else if(flag=='reject'){
            status='Rejected'
        }else if(flag=='pending'){
            status='Pending'
        }
        return `
        <div class="meetings">
                    <p>- <b>DoctorID:</b></p>
                    <p>${elem.doctorID}</p>
                    <p>- <b>Concerns:</b></p>
                    <p>${elem.concerns}</p>
                    <p>- <b>meetingID:</b></p>
                    <p>${elem._id}</p>
                    <p>- <b>MeetingDate:</b></p>
                    <p>${elem.meetingDate}</p>
                    <p>- <b>MeetingTime:</b></p>
                    <p>${elem.meetingTime}</p>
                    <div class='appointmentstatus' style= "background-color:${flag === 'accept' ? 'rgb(27, 176, 27)' : flag === 'reject' ? 'rgb(254, 41, 41)' : 'rgb(255, 200, 0)'}">
                    ${status}
                    </div>
                    
        </div>
        `
    })
    let rendermid=document.getElementById("rendermid")
    rendermid.innerHTML=`
    <h3 id="all-doc-head"></h3>
    <div id="show-all_docs">
                    
    </div>
    `
    let showAllMeet=document.getElementById("show-all_docs")
    showAllMeet.innerHTML=tempData.join("")
    let dochead=document.getElementById("all-doc-head")
    dochead.innerText='All Appointment List'
    }
}