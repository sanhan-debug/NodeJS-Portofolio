import { Schema } from "mongoose";


const userSchema = new Schema({
    username:String,
    surname:String,
    email:String,
    password:String,
    job:String,
    description:String,
    photo:String,
},{
    versionKey:false,
    timestamps:true
})

const projectSchema = new Schema({
    projectname:String,
    
})