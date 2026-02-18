import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async(req,res,next) => {

    try {

        //get token from authorization header

        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({message: "no token, authorization denied"});

        }

        //1 is indicating that array will start from 0 th index and split will return an array

        const token = authHeader.split(" ")[1];

        //verify token

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        //fetch full user object from db

        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(401).json({message: "user not found"});

        //attach full user object to request

        req.user = user;

        next();



    }catch(error) {

        return res.status(401).json({message: "token is not valid"});
    }
}


export default authMiddleware;