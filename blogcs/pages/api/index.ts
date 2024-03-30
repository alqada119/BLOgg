import { NextApiRequest, NextApiResponse } from "@/node_modules/next/dist/shared/lib/utils";
import connecttodb from "@/utils/connection";
export default async function handler(req:NextApiRequest,res:NextApiResponse<data>){
    const cons=await connecttodb()
    
    .then((res)=>console.log(res))
    console.log("HEEE")
    res.json({name:"ahmed"})
}   