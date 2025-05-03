const express=require("express")
const connectDb=require("./config/database.js");
const app=express();
const User = require("./model/user");

//work as a middleware
app.use(express.json());
 
// data puhsed in the database
app.post("/signup",async (req,res)=>{
  //creating new instendce of user model

// console.log(req.body);

//  const user=new User({
//     firstName: "Chandan",
//     lastName: "sharma",
//     emailId: "prashantkumars584@gmail.com",
//     password: "123456",
//  });
//  try{
//   await user.save();
//  res.send("user is created");
//  } catch(err){
//   res.status(400).send(err.message);
//  }


const user=new User(req.body);
try{ 
  await user.save();
  res.send("user is created");
}
catch(err){
  res.status(400).send("not abel to create user");
}
 
});

//get user by emailID
app.get("/user",async(req,res)=>{
  const userEmailId=req.body.emailId;
  try{
       const user=await User.findOne({emailId:userEmailId});
       if(!user){
        res.send("user not found");
       }
       else{
        res.send(user);
       }
  }
  catch(err){
    res.status(400).send("somthing went wrong");
  }
});
 
// feed  API - get all users

app.get("/feed",async(req,res)=>{
  try{
    const users=await User.find({});
     res.send(users);
 }
 catch(err){
  res.status(400).send("somthing went wrong");
}
});


// delete API

app.delete("/user",async(req,res)=>{
    const userId= req.body.userId;
    try{
        //const user = await User.findByIdAndDlete({_id:userId});
        const user=await User.findByIdAndDelete(userId); 
        res.send("user deleted successfully");
    }catch(err){
      res.status(400).send("somthing went wrong");
    }
})

//update user information API

app.patch("/user",async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    try{
      //const user=awiat User.fndByIdaAndUpdate({_id : userId},data,{retrunDocument:"after"});
        await User.findByIdAndUpdate({_id : userId},data); //in this bydefault retutnDocuet is "before"
        res.send(user);
        //console.log(user);
    }catch(err){
      res.status(400).send("someting went wrong");
    }
});



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