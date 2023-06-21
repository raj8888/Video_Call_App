const jwt=require("jsonwebtoken")
require('dotenv').config()


const authenticator=async(req,res,next)=>{
    let token=req.headers.authorization?.split(" ")[1]
    if(token){
            let decode=jwt.verify(token, process.env.seckey)
            if(decode){
                req.body.userID=decode.userID
                req.body.userRole=decode.userRole
                req.body.userName=decode.userName
                req.body.userEmail=decode.userEmail
                next()
            }else{
                res.status(401).send({'message':"Please Enter Valid Information."})
            }
        
    }else{
        res.status(401).send({'message':"Please Login Again."})
    }
}

module.exports={
    authenticator
}