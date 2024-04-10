import mongoose from "mongoose"
interface blog{
    post:String,
    postuser:String,
    likes:number,
    postuserid:string
}
const blogSchema=new mongoose.Schema<blog>({
})
export const blogmodel=mongoose.models.blog||mongoose.model("blog",blogSchema)