import { NextApiRequest, NextApiResponse } from "next";
import { blogmodel } from "@/schemas/blogschema";
import connecttodb from "@/utils/connection";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try {
        await connecttodb()
        console.log("Attempting Post")
        const {post,postuser,likes}=req.body
        const posts=await blogmodel.insertMany({
            post
            ,postuser
            ,likes
        })
        res.json({posts})
    } catch (error) {
        console.log(error)
    }
}