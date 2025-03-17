import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "User Name is required"], 
    trim: true,
    minLength: [2, "Name must be at least 2 characters"],
    maxLength: [50, "Name must be at most 50 characters"],
  },

  email:{
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },

  password:{
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minLength: [6, "Password must be at least 6 characters"],
  }
}, 
{
  timestamps: true,
});

const User = mongoose.model("User",userSchema);

export default User;