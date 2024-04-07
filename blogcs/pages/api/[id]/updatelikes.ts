import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { blogmodel } from "@/schemas/blogschema";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try {
        const {id}=req.query
        const ids = new ObjectId(`${id}`);
        const {likes}=req.body;
        console.log("Request Body:", likes);
        const update=await blogmodel.collection.updateOne({id:ids},{$set:{likes:likes}})
        res.status(200).json({update})
    } catch (error) {
        res.status(500).json({error})
    }
}