import mongoose, { Schema } from "mongoose"
interface blog{
    post:String,
    postuser:String,
    likes:Number
}
const blogSchema=new mongoose.Schema<blog>({
})
export const blogmodel=mongoose.models.blog||mongoose.model("blog",blogSchema)