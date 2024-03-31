import { NextApiRequest, NextApiResponse } from "next";
import { blogmodel } from "@/schemas/blogschema";
import connecttodb from "@/utils/connection";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try {
        await connecttodb()
        const {id}=req.query
        console.log("Attempting Update")
        const {post,postuser,likes}=req.body
        const posts=await blogmodel.findByIdAndUpdate(id,{post,postuser,likes})
        res.json({posts})
    } catch (error) {
        console.log(error)
    }
}