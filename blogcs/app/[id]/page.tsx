"use client"

import {useParams} from "next/navigation"
import { useEffect } from "react"
import { useState } from "react"
export default function PostId(){
    //TODO: MAP Comments,CSS, Add comment to arr in backend
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
            body:JSON.stringify({comment})
        })
        console.log(addtobackend)
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
    <div>
    {post?.post}
    {post?.postuser}
    {post?.likes}
    </div>
    
    <div>
        <label>Comment</label>
        <input onChange={(e)=>setcomment(e.target.value)}></input>
        <button onClick={()=>addcomment()}>Comment</button>
        <button onClick={()=>console.log(post?.comments)}>Test COmments</button>
    </div>
    
    {/* Used Useparams for id from url */}
    </>)
}