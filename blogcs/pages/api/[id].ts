import { NextApiRequest,NextApiResponse } from "@/node_modules/next/dist/shared/lib/utils";
type data={
    id?:string
}
export default function handler(req:NextApiRequest,res:NextApiResponse<data>){
    const {id}=req.query
    console.log("Here is",id)
    res.json({id:id})
}