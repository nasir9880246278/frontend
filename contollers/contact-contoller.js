
const Contact=require("../model/contact-created")
//get all contact
//api/home

const getcontacts=async(req,res)=>{
    try {
        const getall=await Contact.find({user_id:req.userId})

        if(!getall){
           return res.status(400).json("no contacts")
        }
        return res.status(200).json(getall)
    } catch (error) {
        return res.status(400).json("not found")
    }
    
};

//create contact
//api/home

const createcontact=async(req,res)=>{
    try {
        console.log(req.body);
        const {name,email,phone}=req.body;
    
        if(!name || !email || !phone){
           return res.status(400).json("fill all the fields");
        }else{
            const created=await Contact.create({
                name,
                email,
                phone,
                user_id:req.userId,
            });
                console.log(created);
                return res.status(200).json({message:created});
        }
    } catch (error) {
        return res.json("error while creating");
    }
   
     
};

//get single contact
//api/home/id

const getsinglecontact=async(req,res)=>{
    try {
        const getcontact=await Contact.findById(req.params.id);
        if(!getcontact){
            return res.status(400).json("no contact with this id");
        }
        res.status(200).json(getcontact);

    } catch (error) {
        return res.status(400).json("error while fetching contact");
    }
    
};

//update single contact
//api/home/id

const updatecontact=async(req,res)=>{
    try {
        const getcontact=await Contact.findById(req.params.id);
        if(!getcontact){
            return res.status(400).json("no contact with this id");
        }

        if(getcontact.user_id.toString() == req.userId){
            const update=await Contact.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new:true}
                );
    
            res.status(200).json(update)
            
        }else{
            return res.status(400).json("you dont have permission to update ")
        }
        
    } catch (error) {
        return res.status(400).json("error while updating")
    }

    
};

// //update single contact
// //api/home/id

const deletecontact=async(req,res)=>{
    try {
        const getcontact=await Contact.findById(req.params.id);
        if(!getcontact){
            return res.status(400).json("no contact with this id");
        }
        if(getcontact.user_id.toString() == req.userId){
            await Contact.deleteOne({_id:req.params.id});
         return res.status(200).json("contact deleted");
            
        }else{
            return res.status(400).json("you dont have permission to delete ")
        }
        
    } catch (error) {
        return res.status(400).json("unable to delete")
    }
    
};


module.exports={getcontacts,createcontact,getsinglecontact,updatecontact,deletecontact};

