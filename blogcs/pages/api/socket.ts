//help create a socket instance
import { NextApiRequest,NextApiResponse } from "next";
import { Server } from "socket.io";
import { io } from "socket.io-client";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
  const socket=io("http://localhost:3000")
  console.log(socket)
  res.status(200).json({message:"success",socketid:`${socket.id}`})
}
