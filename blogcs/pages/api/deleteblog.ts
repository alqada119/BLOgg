import { NextApiRequest, NextApiResponse } from "next";
import { blogmodel } from "@/schemas/blogschema";
import connecttodb from "@/utils/connection";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try {
        await connecttodb()
        const {id}=req.query
        console.log("Attempting GET")
        const posts=await blogmodel.findByIdAndDelete(id)
        res.json({posts})
    } catch (error) {
        console.log(error)
    }
}