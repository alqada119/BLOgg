"use client";
import { useEffect, useState } from "react";
import React from "react";
import connecttodb from "@/utils/connection";
import "../app.css"
export default function Page() {
  const [blog,setblog]=useState([]);
  const [post,setpost]=useState("");
  const [postuser,setpostuser]=useState("");
  const reset=async()=>{
    const deletes=await fetch("http://localhost:3000/api/deleteall",{
      method:"DELETE"
    })
    console.log(deletes)
  }
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
        "post":post,
        "postuser":postuser,
        "likes":"0"
      })
    })
    const insertf=await insert.json()
    setblog([...blog, { _id: insertf.id, post, postuser }]);
    const refetch=await fetchBlog()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getposts=async()=>{
      const posts=await fetchBlog();
      setblog(posts)
    }
    getposts() 
  }, []);
  // fetchBlog()

  return (
    <div className="">
      <h1>Hello CS Welcome</h1>
      <div className="">
        <h1>Your Daily Blogs</h1>
        <ul>
          {blog.map(post=>
            <li key={post["_id"]}>
              {post["post"]}
              <div>{post["postuser"]}</div>
            </li>
          )}
        </ul>
      </div>
      <div>
        <h1>Add A Blog</h1>
        <label>What post would you like to share? </label>
        <input onChange={(e)=>setpost(e.target.value)}></input>
        <label>What name would you like to share? </label>
        <input onChange={(e)=>setpostuser(e.target.value)}></input>
      </div>
      <button onClick={()=>addpost("fucking eh","isaac","0")}>Add Post</button>
      <button onClick={()=>console.log(post)}>TEST</button>
      <button onClick={()=>reset()}>Clear DB</button>
    </div>
  );
}
