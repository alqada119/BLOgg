import { blogmodel } from "@/schemas/blogschema";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    try {
        const {id}=req.query
        const ids = new ObjectId(`${id}`);
        const ress=await blogmodel.collection.findOne({_id:ids}) 
        console.log("Getting By ID",ress)
        res.json(ress)
    } catch (error) {
        res.json(error)
    }
}