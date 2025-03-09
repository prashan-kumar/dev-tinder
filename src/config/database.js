const mongoose=require('mongoose');

const connectDb=async ()=>{
  await mongoose.connect("mongodb+srv://prashantkumars584:bJ1GXStUU6qKmu7z@namasteproject.xuvvz.mongodb.net/devTinder");
}

module.exports=connectDb;

// connectdb().then(()=>{
//   console.log("connection is estabished");
// }).catch((err)=>{
//   console.error("connection cant not be establsished");
// });

