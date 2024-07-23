import jwt from 'jsonwebtoken';
import { errorHandler } from '../Utils/Error.js';

export const Protect = (req,res,next)=>{

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            const token = req.headers['authorization'].split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        }
        catch(error){
            return next(errorHandler(401,"Unauthorized Access"));
        }
    }
}