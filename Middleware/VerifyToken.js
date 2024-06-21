import jwt from 'jsonwebtoken';
import { errorHandler } from '../Utils/Error.js';

export const VerifyToken = (req,res,next) =>{
    //const token  = req.headers.token;
    const token = req.headers['authorization'].split(' ')[1];
    console.log(token);
    if(!token){
        return next(errorHandler(401,"Unauthorized Access"));
    }
    jwt.verify(token,process.env.JWT_SECRET_KEY,(error,user)=>{
        if(error){
            return next(errorHandler(401,"Unauthorized Access"));
        }
        req.user = user;
        next();
    });

}