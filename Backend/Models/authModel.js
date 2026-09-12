import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const authSchema = new Schema.mongoose({
    name: {
          type: String,
      required: true,
      trim: true
    },
    email:{
          type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    campusorhostel : {
           type: String,
      required: true,
      trim: true
    },
    branch : {
         type: String,
      required: true,
      trim: true
    },
    password:{
           type: String,
      required: true
    }

})

const User = mongoose.model("User" , authSchema)

export default User ;