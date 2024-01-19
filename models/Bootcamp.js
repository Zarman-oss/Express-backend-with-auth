import mongoose from "mongoose"; 

const BootcampSchema= new mongoose.Schema({
    name:{
          type: String, 
          required: [true, 'Please add a name'], 
          unique: true,
          trim: true, 
          max: [50, "Name can't be more than 50 characters"]       
    }, 
    slug: String, 
    description : ""
})