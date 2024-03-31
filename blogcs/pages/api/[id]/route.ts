import { NextApiRequest,NextApiResponse } from "@/node_modules/next/dist/shared/lib/utils";
import { blogmodel } from "@/schemas/blogschema";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {id}=req.query
    const get=blogmodel.findById(id)
    res.json(get)
}