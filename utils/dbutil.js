const mongoose =require("mongoose");

const URI=process.env.MONGO_DB;

const connectdb=async()=>{
try {
    await mongoose.connect(URI);
    console.log("connection established")
} catch (error) {
    console.log("connection failed")
    process.exit(0);
}
}

module.exports=connectdb;