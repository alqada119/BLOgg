"use client";
import { useEffect, useState } from "react";
import React from "react";
import connecttodb from "@/utils/connection";
export default function Page() {
  const [blog,setblog]=useState([]);
  const fetchBlog = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getblog",{
        method:"GET"
      });
      const final=await response.json()
      return final.posts
    } catch (error) {
      console.error(error);
      return []
    }
  };
  const addpost=async()=>{
    console.log("Frontend")
    try {
      const insert=await fetch("http://localhost:3000/api/postblog",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "post":"Ahmed",
        "postuser":"Ahmed",
        "likes":"0"
      })
    })
    const insertf=await insert.json()
    console.log(insertf)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getposts=async()=>{
      const posts=await fetchBlog();
      for(let i=0;i<10;i++){
        console.log(posts[i]["post"])
      }
    }
    getposts() 
  }, []);
  // fetchBlog()

  return (
    <div className="flex bg-slate-500">
      <h1>Hello CS Welcome</h1>
      <button onClick={addpost}>Add Post</button>
      <button onClick={()=>{window.location.reload()}}>TEST</button>
    </div>
  );
}
