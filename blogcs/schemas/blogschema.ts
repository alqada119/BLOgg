import mongoose, { Schema } from "mongoose"
const blogSchema=new mongoose.Schema({
    postId:String,
    post:String,
    postuser:String,
    likes:Number
})
export const blogmodel=mongoose.model("blog",blogSchema)