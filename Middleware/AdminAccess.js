import jwt from 'jsonwebtoken';
import User from '../Models/UserSchema.js';
import { errorHandler } from '../Utils/Error.js';

export const AdminAccess = (req,res,next)=>{
    const token = req.headers['authorization'].split(' ')[1];
   // console.log(token);
    if(!token){
        return next(errorHandler(401,"Unauthorized Access"));
    }
    jwt.verify(token,process.env.JWT_SECRET_KEY,async(error,user1)=>{
        if(error){
            return next(errorHandler(401,"Unauthorized Access"));
        }
        const userDetail = await User.findById(user1.id);
        //console.log(userDetail);
        // allow only if user is admin
        if (userDetail.role !== 'admin') {
            return next(errorHandler(403, "Forbidden. Admin role required."));
        }
        req.user = user1;
        next();
    });
}