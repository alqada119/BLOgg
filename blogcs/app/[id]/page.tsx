"use client"

import {useParams} from "next/navigation"
import { useEffect } from "react"
import { useState } from "react"
export default function PostId(){
    interface blog{
        post:string,
        postuser:string,
        likes:number,
        postuserid:string
    }
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
        Comments Here
    </div>
    
    {/* Used Useparams for id from url */}
    </>)
}