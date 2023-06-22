let token=JSON.parse(sessionStorage.getItem("vedmedtoken"))
if(!token){
    window.location.assign("./login.html");
}
let mainAPI="http://localhost:4500"
let allmeetings=document.getElementById("allmeetings")

getAllMeetings()
async function getAllMeetings(){
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
    let tempData=temp.map(elem=>{
        console.log(elem)
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
}