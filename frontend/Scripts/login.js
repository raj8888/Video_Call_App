let signupForm = document.querySelector(".signup-form form");
let toast=document.getElementById("toast")

let mainAPI="https://video-call-backend-i5df.onrender.com"
// let mainAPI="http://localhost:4500"

signupForm.addEventListener("submit",async(e)=>{
    e.preventDefault()
  let name = document.querySelector(".signup-name").value;
  let mobile = document.querySelector(".signup-number").value;
  let email = document.querySelector(".signup-email").value;
  let password = document.querySelector(".signup-password").value;
  let age=document.querySelector(".signup-age").value
  let gender=document.querySelector(".signup-gender").value
  let role=document.querySelector(".signup-role").value
  
  role=role.toLowerCase()
  gender=gender.toLowerCase()
  let temprole=(role=='doctor' || role=='patient')
  let tempgender=(gender=='male' || gender=='female' || gender=='other')

  if(!temprole){
    swal("ERROR!", "Please Enter Valid role\n(Doctor/Patient)", "error").then(()=>{
        document.querySelector(".signup-role").value=""
    })
  }else if(!tempgender){
    swal("ERROR!", "Please Enter Valid Gender\n(Male/Female/Other)", "error").then(()=>{
        document.querySelector(".signup-gender").value=""
    })
  }else{
        if(role=='doctor'){
            let obj={
                name,email,mobile,sex:gender,password,role,age
            }
            doctorRegister(obj)
        }else{
            let obj={
                name,email,mobile,sex:gender,password,role,age
            }
            patientRegister(obj)
        }
  }
})


async function doctorRegister(obj){
    try {
        let url=await fetch(`${mainAPI}/doctors/register`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(obj)
    })

    if(url.status==400 || url.status==401){
        let serverRes=await url.json()
        await swal("ERROR!", `${serverRes.message}`, "error");
    }else{
        await swal("Signup Successful!", "You are now Registered as Doctor!", "success");
        window.location="login.html"
    }
    } catch (error) {
        console.log(error.message)
        await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
    }
}
async function patientRegister(obj){
    try {
        let url=await fetch(`${mainAPI}/patients/register`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(obj)
    })

    if(url.status==400 || url.status==401){
        let serverRes=await url.json()
        await swal("ERROR!", `${serverRes.message}`, "error");
    }else{
        await swal("Signup Successful!", "You are now Registered as patient!", "success");
        window.location="login.html"
    }
    } catch (error) {
        console.log(error.message)
        await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
    }
}


let login=document.querySelector(".login-form form")
login.addEventListener("submit", async(e)=>{
    e.preventDefault()
    let email= document.querySelector('.login-email').value;
    let role= document.querySelector('.login-role').value;
    let password= document.querySelector('.login-password').value;

    role=role.toLowerCase()
    let temprole=(role=='doctor' || role=='patient')
    if(!temprole){
        swal("ERROR!", "Please Enter Valid role\n(Doctor/Patient)", "error").then(()=>{
            document.querySelector(".login-role").value=""
        })
    }else{
        let obj={
            email,
            password
        }
        if(role=='patient'){
            patientLogin(obj)
        }else{
            doctorLogin(obj)
        }
    }
})

async function patientLogin(obj){
    try {
        let url=await fetch(`${mainAPI}/patients/login`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(obj)
    })

    if(url.status==400 || url.status==401){
        let serverRes=await url.json()
        await swal("ERROR!", `${serverRes.message}`, "error");
    }else{
        let serverRes=await url.json()
        sessionStorage.setItem("vedmedtoken",JSON.stringify(serverRes.VideoAppToken))
        await swal("Login Successful!", "You login successfully as patient!", "success");
        window.location='patient.html'
    }
    } catch (error) {
        console.log(error.message)
        await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
    }
}

async function doctorLogin(obj){
    try {
        let url=await fetch(`${mainAPI}/doctors/login`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(obj)
    })

    if(url.status==400 || url.status==401){
        let serverRes=await url.json()
        await swal("ERROR!", `${serverRes.message}`, "error");
    }else{
        let serverRes=await url.json()
        sessionStorage.setItem("vedmedtoken",JSON.stringify(serverRes.VideoAppToken))
        await swal("Login Successful!", "You login successfully as doctor!", "success");
        window.location='doctor.html'
    }
    } catch (error) {
        console.log(error.message)
        await swal("Server Error!", "Sorry :(, There is error in Server!", "error");
    }
}