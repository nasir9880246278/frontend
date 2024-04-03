require("dotenv").config();
const express = require("express");
const cors=require("cors")
const app=express();
const homerouter=require("./router/home-router");
const authrouter=require("./router/user-router");
// const errorMiddleware = require("./middleware/error_handler");
const connectdb=require("./utils/dbutil");


const corsOption={
origin:"http://localhost:5173",
methods:"GET , POST ,PUT , PATCH ,DELETE",
Credential:true,
}

app.use(cors(corsOption));
app.use(express.json());
app.use("/api/home",homerouter);
app.use("/api/auth",authrouter);
// app.use(errorMiddleware);
const PORT=5000

connectdb().then(()=>{
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT} `)
})

});