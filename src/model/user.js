const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");

const userSchema=new mongoose.Schema({
 firstName:{
  type:"string",
  required:true
},
 lastName:{
  type:"string"
},
 emainlId:{
  type:"string",
  lowercase:"true",
  required:true,
  unique:true,
  trim:true,
  validate(value){
    if(!validator.isEmail(value)){
      throw new Error("Email is not valid");
    }
  }
},
 passWord:{
  type:"string",
  required:true,
  validate(value){
    if(!validator.isStrongPassword(value)){
      throw new Error("password is not strong enough");
    }
  }
  }
},
 age:{
  type:"number"
},
 gender:{
  type:"string",
  validate(value){
       if(!["male","female","other"].includes(value)){
        throw new Error("Gender data is not valid");
      }
    }
},
 photourl:{
  type:"string",
  default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  validate(value){
    if(!validator.isURL(value)){
      throw new Error("Email is not valid");
    }
  }
},
 about:{
  type:"string",
  default:"this is default ABOUT"
},
 skills:{
  type:["string"]
}

},{
  timestamps:true
}

);

module.exports = mongoose.model("User",userSchema);