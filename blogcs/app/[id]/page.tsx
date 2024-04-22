"use client"

import {useParams} from "next/navigation"
import { useEffect } from "react"
import { useState } from "react"
import "../../app.css"
import Home from "../../Components/backbutton"
export default function PostId(){
    //TODO: CSSs
    interface blog{
        post:string,
        postuser:string,
        likes:number,
        postuserid:string,
        comments:string[]
    }
    const [comment,setcomment]=useState("");
    const params=useParams<{id:string}>()
    const [post,setpost]=useState<blog>()
    const getblog=async()=>{
        const fetched=await fetch(`http://localhost:3000/api/${params?.id}/getbyid`,{
            method:"GET"
        })
        console.log(fetched)
        const post=await fetched.json()
        setpost(post)
        console.log(post)
    }
    const addcomment=async()=>{
        const updatedComment=[...(post?.comments||[]),comment]
        const updatedPost:blog={...(post as blog),comments:updatedComment}
        setpost(updatedPost)
        const addtobackend=await fetch(`http://localhost:3000/api/${params?.id}/updatecomments`,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({comment:comment})
        })
    }
    // const testupdate=async(post:any)=>{
    //     const backed=await fetch(`http://localhost:3000/api/${params?.id}/updatebyid`,{
    //         method:"PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body:JSON.stringify({post})
    //     })
    // }
    useEffect(()=>{
        getblog()
    },[])
    return (<>
    {/* TODO:CSS THIS AND ADD COMMENT */}
    <div className="flex flex-col items-center justify-center h-screen border-2 border-black">
        <Home/>
    <div className="flex flex-col items-center justify-center bg-slate-200 border-2 w-80 border-black h-1/3 w-1/3 mb-10 w-auto p-4">
        <div className="flex items-center gap-10 bg-emerald-400 border-2 p-4 text-purple-400 border-black">
            <div className="font-bold capitalize text-xl">{post?.post}</div>
            <div className=" capitalize font-semibold text-l">{post?.postuser}</div>
            <div className="font-bold">{post?.likes}</div>
        </div>
   
    <div className="flex gap-5 mt-5">
        {post?.comments.map((comment,index)=>(
            <div key={index} className="font-mono ">
                {index}-{comment} 
            </div>
        ))}
    </div>
    </div>
    <div className="flex gap-3 items-center">
        <label className=" font-bold font-mono">Comment</label>
        <input onChange={(e)=>setcomment(e.target.value)} className="border"></input>
        <button onClick={()=>addcomment()} className="rounded-md shadow-md bg-emerald-400 text-purple-400 font-semibold p-4">Comment</button>
        {/* <button onClick={()=>console.log(post?.comments)}className="rounded-md shadow-md bg-black text-cyan-600 font-semibold p-4" >Test COmments</button> */}
    </div>
    </div>
    {/* Used Useparams for id from url */}
    </>)
}