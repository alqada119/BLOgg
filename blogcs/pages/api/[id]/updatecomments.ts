import connecttodb from "@/utils/connection";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { blogmodel } from "@/schemas/blogschema";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try {
        console.log("Attempting Update")
        await connecttodb()
        const { id } = req.query;
        const ids = new ObjectId(`${id}`);
        const {comment}=req.body
        console.log(comment)
        const updates=await blogmodel.collection.updateOne({_id:ids},{$push:{comments:comment}})
        console.log("Added Comments",updates)
        res.status(200).json({message:"Success"})
    } catch (error) {
        res.status(500).json({error:error})
    } 
}