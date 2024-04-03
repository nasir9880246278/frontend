const User=require("../model/auth-model");
const jwt=require("jsonwebtoken");


const authmiddleware=async(req,res,next)=>{

    const token = req.header("Authorization");

    if(!token){
        return res.status(400).json("invalid http token access")
       }

   const jwttoken= token.replace("Beaber","").trim();    
   console.log("jwt token ",jwttoken);
   
   try {
    const isVarified=jwt.verify(jwttoken,process.env.TOKEN_SECRET_KEY);
    const userData=await User.findOne({email:isVarified.email}).select({password:0})
    console.log(userData);

    req.user=userData;
    req.token=token;
    req.userId=userData._id;
    next();

   } catch (error) {
    return res.json("invalid token");
   }

}

module.exports=authmiddleware;