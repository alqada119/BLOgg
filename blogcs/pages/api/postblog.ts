import { NextApiRequest, NextApiResponse } from "next";
import { blogmodel } from "@/schemas/blogschema";
import connecttodb from "@/utils/connection";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try {
        await connecttodb()
        console.log("Attempting Post",req.body)
        const {post,postuser,likes}=req.body
        const posts=await blogmodel.insertMany({
            "post":req.body.post,
            "postuser":req.body.postuser
            ,"likes":req.body.likes
        })
        res.json({posts})
    } catch (error) {
        console.log(error)
    }
}