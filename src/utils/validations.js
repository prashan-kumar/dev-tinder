const validator=require('validator');

const validate=(req)=>{
  const {firstName, lastName, emainId, password}=req.body;
  if(!firstName || !lastName){

    throw new Error("Name is not valid");
  }

  else if(!validator.isEmail(emailId)){
    throw new Error("Email is not valid");
  }
}

module.exports=validate;

