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
            if(ans){
                const joinUrl = `../Pages/meet.html?meetingID=`+meetId;
                window.location.href = joinUrl;
            }else{
                await swal("Error!", "Sorry :(, Time and Date didn't match to start meeting", "error");
            }
        })
    })
   
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