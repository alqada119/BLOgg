import { NextApiRequest, NextApiResponse } from "next";
import { blogmodel } from "@/schemas/blogschema";
import connecttodb from "@/utils/connection";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try {
        await connecttodb()
        console.log("Attempting GET")
        const posts=await blogmodel.find({})
        res.json({posts})
    } catch (error) {
        console.log(error)
    }
}