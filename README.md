#  VedMed 
### (VideoCall Application For Doctor and Patient)

VedMed is a simple Video call and Chat app where patient can schedule a meetings with certified doctors.


## Features

- Authentication
- Authorization
- Mail Service
- Create a Meeting
- Real Time Chatting
- Update and Delete Class
- Share Screen


## Tech Stack

**Client:** HTML, CSS, JavaScript, webRTC.

**Server:** Node.js, Express.js, Nodemailer,Mongoose,Socket.io.

**Database:** MongoDB.

## Run Locally

Clone the project

```bash
  git clone https://github.com/raj8888/Video_Call_App
```

Go to the project directory

```bash
  cd Video_Call_App
```

Install dependencies

```bash
  npm install
```

Start the server (Download nodemon npm library globally)

```bash
  npm install -g nodemon
```

```bash
  nodemon index.js
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`mongoDBURL`

`port`

`secretkey`

`mailID`

`mailPass`

- `mailID` and `mailPass` you have to generate from your gmail account.


## API Reference

#### Welcome

```http
  GET /api
```

## For Pateint


#### patients Register

```http
  POST /api/patients/register
```

#### patients Login

```http
  POST /api/patients/login
```

**Only Admin can access following route**
#### All patients

```http
  GET /api/patients/all
```

**Only Admin and Doctor can access following route**
#### Single Patient

```http
  GET /api/patients/single/:patientID
```

## For Doctors:

#### doctors Register

```http
  POST /api/doctors/register
```

#### doctors Login

```http
  POST /api/doctors/login
```

**Only Admin can access following route**
#### All doctors

```http
  GET /api/doctors/all
```

**Only Admin and Patient can access following route**
#### Single doctor

```http
  GET /api/doctors/single/:doctorID
```
**Only Admin and Patient can access following route**
#### Search Route

```http
  POST /api/doctors/search
```

## For Meetings:

**Only Admin and Patient can access following route**
#### Search Route

```http
  POST /api/meetings/bookmeeting
```

#### Fot Get All Doctors

```http
  GET /api/meetings/all/doctor
```

#### Fot Get All Patients

```http
  GET /api/meetings/all/Patients
```

#### Fot Get All Doctors Meetings

```http
  GET /api/meetings/doctors/all
```

#### Fot Get All Patients Meetings

```http
  GET /api/meetings/patients/all
```

#### Fot Get Paticular Meeting

```http
  GET /api/meetings/single/:meetingID
```

**Only Admin and Patient can access following route**
#### Update Meetings 

```http
  PATCH /api/meetings/update/:meetingID
```

**Only Admin and Patient can access following route**
#### Delete Meetings

```http
  DELETE /api/meetings/delete/:meetingID
```

#### SendMail To JoinMeet
```http
  POST /api/meetings/sendmail
```

**Authentication Required All Routes Except Login and Register**

### Doctor Schema Ref:
```
const doctorSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    mobile:String,
    sex:String,
    areaOfSpecialization:String,
    role:{type:String,default:"doctor"},
    age:Number,
    meetings:[{type:String}],
    createdDate:String
})
```

### Patient Schema Ref:
```
const patientSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    mobile:String,
    sex:String,
    role:{type:String,default:"patient"},
    age:Number,
    meetings:[{type:String}],
    createdDate:String
})
```

### Meeting Schema Ref:
```
const meetingSchema = mongoose.Schema({
    patinetID: { type: mongoose.ObjectId, ref: 'patient' },
    doctorID: { type: mongoose.ObjectId, ref: 'doctor' },
    concerns:String,
    meetingTime:String,
    meetingDate:String,
    completed:Boolean
})
```

## Screenshots

Patient Dashboard:(With See all doctors section)

![App Screenshot](https://i.ibb.co/yBYP1Bj/Screenshot-351.png)

Patient Dashboard:(With See all meetings section)

![App Screenshot](https://i.ibb.co/bJLpLrj/Screenshot-352.png")

Doctor Dashboard:

![App Screenshot](https://i.ibb.co/6RL04dS/Screenshot-353.png)

Meeting Portal:

![App Screenshot](https://i.ibb.co/SNb1mv0/Screenshot-354.png)

Video Call, Chat, MicOff, CameraOff, ShareScreen :

![App Screenshot](https://i.ibb.co/C86NNNW/Screenshot-355.png)

## Frontend Part Instruntions:

### For Patients:

- First Register with your gmailID and login to account.
- After Login you can see all doctors information.
- On Navbar you have option of see all meetings.
- For create meet you have to copy the doctorID of Particular doctor from doctors information and paste it to input bar. Then select date and time properly and enter you concern and click on create meet button.
- If you want to update meeting information then click on update button of that particular meeting. Then you will see all the information of that meeting on left side form. Update the information as per your requirement and click on update button.
- If you want to delete meeting then just click on delete button.

**You have only one minute to join meet**
- So, click on join button on time.
- Then you can wait there for sometime to get mail of meetCode from doctor side.
- Once you recieved mail then you can copy `meetingCode` from mail and paste on Enter other person code section. And click on join button.
- Then you will get window to option for reject call but wait for some time to join doctor. If you want to decline call without meet then you can.
- In meet you have option for micOff,cameraOff,chat,sharescree.
- (In Emergency only)Otherwise you can copy your code and paste it on send gmail input bar and click on send button.And wait for joining of doctor.

### For Doctors:

- First Register with your gmailID and login to account.
- After Login you can see all yours meetings information.
- If patient create meeting with you then you can see on platform

**You have only one minute to join meet**
- So, click on join button on time.
- Then you have to copy your code and paste it on send gmail input bar and click on send button.And wait for joining of patient.
- Then you will get window to option for reject call but wait for some time to join patient. If you want to decline call without meet then you can.
- In meet you have option for micOff,cameraOff,chat,sharescree.
- (In Emergenty) If you are let to join meet then you can check mail for get mail from patient side to join meet.

**Important Note (For Doctors and Patients):**
- You have to click on `join button` when you scheduled meeting and in one minute only then you can send code and attend meeting as per your time.
- Once click on `join button` and you redirected to meeting portal if you click on back button or close window then you are not able to join the meet again. 

**Both patient and doctor will receive mail notification for if patient create meet, update meet information or delete meet**

## Sample Accounts

### For Patients
- EmailID : jadhavrj8877@gmail.com
- Role    : patient
- Password: Raj@8080680

### For Doctors
- EmailID : jadhavrj8888@gmail.com
- Role    : doctors
- Password: Raj@8080680

## Live Demo

[https://ved-med-video-call.netlify.app](https://ved-med-video-call.netlify.app)

## Backent Deployed Demo

[https://video-call-backend-i5df.onrender.com](https://video-call-backend-i5df.onrender.com)

## Author

- [@raj8888](https://github.com/raj8888)

