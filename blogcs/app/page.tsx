"use client";
import { useEffect } from "react";
import React from "react";
import connecttodb from "@/utils/connection";
export default function Page() {
  const fetchBlog = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getblog",{
        method:"GET"
      });
      const final=await response.json()
      console.log(final)
    } catch (error) {
      console.error(error);
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
    fetchBlog();
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
