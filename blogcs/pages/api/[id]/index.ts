import { NextApiRequest,NextApiResponse } from "@/node_modules/next/dist/shared/lib/utils";
import { blogmodel } from "@/schemas/blogschema";
import connecttodb from "@/utils/connection";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try {
        await connecttodb()
        const {id}=req.query
        const get=await blogmodel.find({"postuserid":id});
        console.log("GETTING BY ID",get)
        if (!get){
            res.status(404).json({error:"Post not found"})
            return
        }
        res.json(get)
    } catch (error) {
        res.status(500).json({error})
    }
    
}