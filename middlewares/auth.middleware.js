import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/env.js";
import User from "../models/user.model.js";

// middleware to authorize the user and know who user is making the request
const authorize = async(req,res, next) =>{
  try {

    let token;
    // check if have a header and if it starts with Bearer
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
     
      token = req.headers.authorization.split(" ")[1];      
    }

    // check if token exists
    if(!token){
      return res.status(401).json({
        success:false,
        message:"Unauthorized access, token not found"
      })
    }
   
    // verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
   
    // check if the user exists
    const user = await User.findById(decoded.userId);
    if(!user){
      return res.status(401).json({
        success:false,
        message:"Unauthorized access, token not valid"
      })
    }
   

    // set the user in the request object 
    req.user = user;
    
    // call the next middleware
    next()

  } catch (error) {
    res.status(401).json({
      success:false,
      message:"Unauthorized access",
      error:error.message
    })
  }
}

export default authorize;