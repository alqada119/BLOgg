"use client";
import { useEffect, useState } from "react";
import React from "react";
import connecttodb from "@/utils/connection";
import "../app.css"
export default function Page() {
  const [blog,setblog]=useState([]);
  const [post,setpost]=useState("");
  const [postuser,setpostuser]=useState("");
  const updatebyid=async(id:string,newpost:string)=>{
    try {
      const updates=await fetch(`http://localhost:3000/api/${id}/updatebyid`,{
      method:"PATCH",
      body:JSON.stringify({
        post:newpost
      })
    })
    console.log(`Successful update with text ${newpost}`,updates)
    } catch (error) {
      console.log("Error")
    }
    
  }
  const fetchbyid=async(postid:string)=>{
    const response = await fetch(`http://localhost:3000/api/${postid}`,{
      method:"GET"
    });
    const final=await response.json()
    return final.posts
  }
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
  const deletebyid=async(id:string)=>{
    try {
      const deletes=await fetch(`http://localhost:3000/api/${id}/deletebyid`,{
        method:"DELETE"
      })
      console.log("Successfuly deleted",deletes)
      window.location.reload()
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
      <button onClick={()=>console.log(blog[0]["_id"])}>TEST</button>
      <button onClick={()=>fetchbyid(blog[0]["_id"])}>Find By Id</button>
      <button onClick={()=>reset()}>Clear DB</button>
      <button onClick={()=>deletebyid(blog[0]["_id"])}>Delete By ID</button>
    </div>
  );
}
