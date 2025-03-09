const express=require("express")
const connectDb=require("./config/database");
const app=express();
const User = require("./model/user");

app.post("/signup",async (req,res)=>{
  //creating new instendce of user model
 const user=new User({
    firstName: "prashant",
    lastName: "kumar",
    emailId: "prashantkumars584@gmail.com",
    password: "123456",
 });
 try{
  await user.save();
 res.send("user is created");
 } catch(err){
  res.status(400).send(err.message);
 }
 
})




connectDb().then(()=>{
  console.log("connection is established");
  app.listen(7777,()=>{ 
    console.log("server is running on port 7777");
   });
}).catch((err)=>{
  console.error("connection cant not be established");
});
 


//  app.listen(7777,()=>{ 
//   console.log("server is running on port 7777")
//  });