import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { blogmodel } from "@/schemas/blogschema";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try {
        const {id}=req.query
        const ids = new ObjectId(`${id}`);
        const {likes}=req.body;
        const likess=parseInt(likes)
        console.log("Request Body:", likes);
        const update=await blogmodel.collection.findOneAndUpdate({_id:ids},{$set:{likes:likess}})
        console.log("Updating",update)
        res.status(200).json({update})
    } catch (error) {
        res.status(500).json({error})
    }
}