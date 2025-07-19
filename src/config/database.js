const mongoose=require('mongoose');

const connectDB=async ()=>{
  await mongoose.connect("mongodb+srv://prashantkumars584:bJ1GXStUU6qKmu7z@namasteproject.xuvvz.mongodb.net/devTinder");
  console.log("connected to database");
}

module.exports=connectDB;

// connectdb().then(()=>{
//   console.log("connection is estabished");
// }).catch((err)=>{
//   console.error("connection cant not be establsished");
// });

