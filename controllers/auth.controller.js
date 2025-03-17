import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {JWT_EXPIRES_IN, JWT_SECRET} from '../config/env.js';

// El método mongoose.startSession() inicia una nueva sesión de MongoDB. Las sesiones se utilizan principalmente para realizar transacciones en MongoDB, 
// lo que permite ejecutar múltiples operaciones de lectura y escritura como una única operación atómica.

export const signUp = async (req,res, next) =>{
  // implement sign up logic
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // create a new user
    const {name, email, password}= req.body;

    // check if a user already exists with the email
    const existingUser = await User.findOne({email});

    if(existingUser){
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    // save user to database 
    const newUsers = await User.create([{name, email, password:hashedPassword}], {session:session});

    // token generation
    const token = jwt.sign(
      {userId : newUsers[0]._id},
      JWT_SECRET,
      {expiresIn:JWT_EXPIRES_IN}
    );

    // commit transaction
    await session.commitTransaction();
    session.endSession();

    // 201 status code means that a new resource has been created
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data:{
        token,
        user: newUsers[0]
      }
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}

export const signIn = async (req,res, next) =>{
  try {

    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
      const error = new Error("User not found")
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      const error = new Error("Invalid password")
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {userId : user._id},
      JWT_SECRET,
      {expiresIn:JWT_EXPIRES_IN}
    );

    res.status(200).json({
      success:true,
      message:"User signed in successfully",
      data:{
        token,
        user
      }
    })

  } catch (error) {
    next(error);
    
  }
}

export const signOut = async (req,res, next) =>{
  // implement sign out logic
}