import { NextApiRequest,NextApiResponse } from "@/node_modules/next/dist/shared/lib/utils";
import { blogmodel } from "@/schemas/blogschema";
import connecttodb from "@/utils/connection";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try {
        await connecttodb()
        const {id}=req.query
        console.log("GETTING BY ID",id)
        const get=await blogmodel.findById(id)
        if (get){
            res.json(get)
        }
    } catch (error) {
        console.log(error)
    }
    
}