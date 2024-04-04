import { NextApiRequest, NextApiResponse } from "next";
import { blogmodel } from "@/schemas/blogschema";
import connecttodb from "@/utils/connection";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try {
        await connecttodb()
        console.log("Attempting Post again",req.body)
        const {post,postuser,likes}=req.body
        const posts=await blogmodel.collection.insertMany([{"post":post,
        "postuser":postuser
        ,"likes":likes}])
        res.json({posts})
    } catch (error) {
        res.status(500).json({error})
    }
}