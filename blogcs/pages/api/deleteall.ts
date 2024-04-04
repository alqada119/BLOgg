import { blogmodel } from "@/schemas/blogschema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req:NextApiRequest,res:NextApiResponse){
    try {
        const deleteall=await blogmodel.collection.deleteMany({})
        if(deleteall){
            res.json({deleteall})
        }
        else{
            res.json({"error":"404"})
        }
    } catch (error) {
        res.status(500).json({error})
    }
    
}