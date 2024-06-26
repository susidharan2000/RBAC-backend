import { errorHandler } from "../Utils/Error.js";
import User from "../Models/UserSchema.js";
import bcrypt from 'bcryptjs';

export const updateProfile = async(req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"Unauthorized to Access Update the User"));
    }
    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400,"Password should be atleast 6 characters"));
        }
    }
    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 16){
            return next(errorHandler(400,"Username should be atleast 7 characters"));
        }
        if(req.body.username.includes(" ")){
            return next(errorHandler(400,"Username should not contain spaces"));
        }
        if(req.body.username !== req.body.username.toLowerCase()){
                return next(errorHandler(400,"Username should not in Captial format"));
       }
       if(!req.body.username.match(/^[A-Za-z0-9 ]+$/)){
        return next(errorHandler(400,"Username should not contain special characters"));
       }
    }
    try{
        const hashedPassword =bcrypt.hashSync(req.body.password,10);
        await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password?hashedPassword:req.user.password,
                profilePic:req.body.profilePic,
                fname:req.body.fname,
                lname:req.body.lname,
                gender:req.body.gender,
                phonenumber:req.body.phonenumber,
                experiance:req.body.experiance,
                address:req.body.address,
            },
            new:true
        });
        const updatedProfile = await User.findById(req.params.id);
        const {password, ...rest} = updatedProfile._doc;
        res.status(200).json({Message:"Profile Updated Successfully",rest});
    }
    catch(error){
            return next(errorHandler(500,error.message));
        }
}
//get all users
export const getallusers = async (req, res,next) =>{
    try {
        const allusers = await User.find();
        if (allusers.length === 0) {
            return res.status(404).json({ Message: "No Users Found" });
        }
        const userslist = allusers.filter((user) => user._id.toString() !== req.user.id.toString());
        //console.log(userslist);
        res.status(200).json({ Message: "All Users", result: userslist });
    } catch (error) {
        return next(errorHandler(500, error.message));
    }
}
//get userby ID
export const getuserbyid = async (req, res,next) =>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({Message:"User Not Found"});
        }
        res.status(200).json({Message:"User Found",user});
    }
    catch(error){
        return next(errorHandler(500,error.message));
    }
}

//Update User role by admin
export const updaterole = async (req, res,next) =>{
    try{
        console.log(req.body.role);
        console.log(req.body.id);
        await User.findByIdAndUpdate(req.body.id,{
            $set:{
                role:req.body.role,
            },
            new:true
        });
        res.status(200).json({Message:"Role Updated Successfully"});
    }
    catch(error){
        return next(errorHandler(500,error.message));
    }
}

//search user
export const searchuser = async (req, res, next) => {
    try {
      const { q } = req.query;
      const keys = ["fname", "lname", "email"];
      const users = await User.find();
      const search = (data) => {
        return data.filter((item) =>
          keys.some((key) => item[key].toLowerCase().includes(q))
        );
      };
      q ? res.json(search(users)) : res.json(users);
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  };
  //Get Role
  export const getrole = async (req, res, next) => {
    try {
      const role = await Role.find();
      res.status(200).json({ Message: "Role Found", role });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  };

  
