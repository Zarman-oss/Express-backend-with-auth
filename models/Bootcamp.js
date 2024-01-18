import mongoose from "mongoose"; 

const BootcampSchema= new mongoose.Schema({
    name:{
          type: String, 
          required: [true, 'Please add a name'], 
          unique: true,
          trim: true, 
          maxlentgth: [50,]       
    }
})