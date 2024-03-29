import mongoose,{Model} from "mongoose";
const {mongourl}=process.env
export const connect=async()=>{
    const conn=await mongoose.connect(mongourl as string)
    .catch(err=>console.log(err))
    console.log("Successful Connection")

const blogSchema=new mongoose.Schema({
    postId:String,
    post:String,
    postuser:String,
    likes:Number
})
const blogModel=mongoose.model("Blogs",blogSchema)
return {conn,blogModel}
}