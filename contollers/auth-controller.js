const User=require("../model/auth-model")
const bycrypt=require("bcrypt");



const userregister=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        const userExist=await User.findOne({email});
        if(userExist){
            return res.status(400).json("user already exist");
        }
        
        const hashedpass=await bycrypt.hash(password,10)
        console.log("pass",hashedpass)
        const usercreate=await User.create({
            username,
            email,
            password:hashedpass,
        });
        return res.status(200).json({msg:"register successfull" ,token:await usercreate.generateToken(),userId:usercreate._id.toString()});
    } catch (error) {
        return res.status(400).json("error while registering")
    }

};

//login facility

const login=async(req,res)=>{
try {
    const {email,password}=req.body;

    const user=await User.findOne({email});
     
    if(!user){
        return res.status(400).json("user does not exist")
    }

    const camparelogin=await bycrypt.compare(password,user.password)
   if(camparelogin){
    return res.status(200).json({msg:"login successfull" , token:await user.generateToken(),
userId:user._id.toString(),
});
   }else{
    return res.status(400).json("invalid credentials")
   }
       
} catch (error) {
    return res.status(400).json("error while login")
}
}



const current=async(req,res)=>{
    try {
        return res.status(200).json({msg:req.user});
    } catch (error) {
        return res.status(400).json("invalid access");
    }

}
module.exports={userregister,login,current};