const User=require("../models/User");
const bcrypt=require("bcryptjs");

module.exports={
   async Register=(req,res)=>{
        try{
              console.log(req.body);
        }
        catch(err){
            console.log(err);
        }
    }
}