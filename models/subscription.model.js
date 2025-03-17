import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Subscription Name is required"],
    trim:true,
    minLength:[2,"Name must be at least 2 characters"],
    maxLength:[100,"Name must be at most 100 characters"],
  },
  price:{
    type:Number,
    required:[true,"Subscription Price is required"],
    min:[0,"Price must be at least 0"],
  },
  currency:{
    type:String,
    enum: ["USD","EUR","GBP"],
    default: "USD",
  },
  frequency:{
    type:String,
    enum:["daily","weekly","monthly","yearly"],
    default:"monthly",
  },
  category:{
    type: String,
    enum:["sports","entertainment","technology","fashion","politics","science","health"],
    required:[true,"Subscription Category is required"],
  },
  paymentMethod:{
    type:String,
    required:[true,"Payment Method is required"],
    trim:true,
  },
  status:{
    type:String,
    enum:["active","cancelled","expired"],
    default:"active",
  },
  startDate:{
    type:Date,
    required:[true,"Start Date is required"],
    validate:{
      validator: (value)=> value <= new Date(),
      message: "Start Date must be in the past",
    }
  },
  // i don't know if accept arrow function, so i change it to normal function
  renewalDate:{
    type:Date,
    validate:{
      validator: function (value){ return value > this.startDate},
      message: "Renewal Date must be after Start Date",
    }
  },

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:[true,"User is required"],
    index: true
  }
},
{
  timestamps:true
})

// auto calculate renewal date if missing
subscriptionSchema.pre("save",function(next){
  if(!this.renewalDate){
    const renewalPeriod = {
      daily:1,
      weekly:7,
      monthly:30,
      yearly:365,
    };

    this.renewalDate = new Date(this.startDate)
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
  };

  if(this.renewalDate < new Date()){
    this.status = "expired";
  }

  next();
})

const Subscription = mongoose.model("Subscription",subscriptionSchema);

export default Subscription;