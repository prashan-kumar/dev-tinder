const express=require("express")
const connectDB=require("./config/database");
const app=express();
const User = require("./model/user");
const {validateSignUpData}=require("./utils/validations");
const bcrypt=require("bcrypt");
const cookiesParser=require("cookie-parser");

//work as a middleware
app.use(express.json());
app.use(cookiesParser());
 
// data puhsed into the database
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

try{ 

  //validation of data
  validateSignUpData(req);
  
  //Encrypt the password
  const {passWord}=req.body;
  const passwordHash=await bcrypt.hash(passWord, 10);
  

 //console.log(passwordHash);


  const user=new User({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    emailId:req.body.emailId,
    passWord:passwordHash
  });

  await user.save();
  res.send("user is created");
}
catch(err){
  res.status(400).send("ERROR : " + err.message);
}
 
});


app.post("/login",async(req,res)=>{
  try{
   const {emailId,passWord}=req.body;
   const user=await User.findOne({emailId:emailId});
   if(!user){
    throw new Error("Invalid credentials");
   }  

   const isPasswordValid=await bcrypt.compare(passWord, user.passWord);
   if(!isPasswordValid){

    throw new Error("Invalid credentials");
   }
   else{
      
    res.cookie("token","asdfghjkl");
     
    res.send("user is logged in successsfully!!!!!!!!!!!");
   }

  }catch(err){
    res.status(400).send("ERROR:"+ err.message);
  }
});

app.get("/profile",(req,res)=>{
  const cookies=req.cookies;
  const {token}=cookies;
  console.log(token);
  console.log(cookies);
  res.send("reading cookies");
})

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
      const ALLOWED_UPDATES=["userId","photoUrl","about","gender","age","skills"];
    
    const isUpdateAllowed=Object.keys(data).every((key)=>{
      ALLOWED_UPDATES.includes(key);
    });

    if(!isUpdateAllowed){
      throw new Error("update is not allowed");
    }
      //const user=awiat User.fndByIdaAndUpdate({_id : userId},data,{retrunDocument:"after"});
        await User.findByIdAndUpdate({_id : userId},data,{returnDocument:"before",runValidators:true}); //in this bydefault retutnDocuet is "before"
        res.send(user);
        //console.log(user);
    }catch(err){
      res.status(400).send("someting went wrong");
    }
});



connectDB().then(()=>{
  console.log("connection is established");
  app.listen(8000,()=>{ 
    console.log("server is running on port 8000");
   });
}).catch((err)=>{
  console.error("connection cant not be established");
});
 


//  app.listen(7777,()=>{ 
//   console.log("server is running on port 7777")
//  });