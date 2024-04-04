import { blogmodel } from "@/schemas/blogschema";
import connecttodb from "@/utils/connection";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try {
        await connecttodb
        const {id}=req.query
        const {newpost}=req.body
        const updates=await blogmodel.findByIdAndUpdate(id,{post:newpost})
        res.status(200).json({updates})
    } catch (error) {
        res.status(500).json({error})
    }
}