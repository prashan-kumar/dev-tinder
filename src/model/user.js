const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
 firstName:{type:"string"},
 lastName:{type:"string"},
 emainlId:{type:"string"},
 age:{type:"number"},
 gender:{type:"string"}
});

module.exports = mongoose.model("User",userSchema);