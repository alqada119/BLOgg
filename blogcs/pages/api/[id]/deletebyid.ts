import { blogmodel } from "@/schemas/blogschema";
import connecttodb from "@/utils/connection";
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try {
        await connecttodb()
        const {id}=req.query
        const deletes=await blogmodel.findByIdAndDelete(id)
        console.log("Deleting By Id",id)
        res.status(200).json({deletes})

    } catch (error) {
        res.status(500).json({error})
    }
}