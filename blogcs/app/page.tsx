"use client";
import { useEffect, useState } from "react";
import React from "react";
import "../app.css";
import Notes from "../Components/notes"
import Pencil from "../Components/pencil"
import Trash from "../Components/trash"
import { SignInButton,SignUpButton,SignedIn, SignOutButton } from "@clerk/clerk-react";
export default function Page() {
  // TODO: ADD AUTHENTICATION, CSS this page
  const [blog,setblog]=useState([]);
  const [post,setpost]=useState("");
  const [postuser,setpostuser]=useState("");
  const updatebyid=async(id:any,post:string)=>{
    try {
      const updates=await fetch(`http://localhost:3000/api/${id}/updatebyid`,{
      method:"PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "post":post
      })
    })
    console.log(`Successful update with text ${post}`,updates)
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
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 p-4">
        <div className="bg-white mb-4 rounded-md shadow-md h-60 p-4">
          <h1 className="text-xl font-semibold">Welcome to CS Blog</h1>
        </div>
      </div>

      
      <div className="flex-1 p-4">
        <div className="bg-white p-4 mb-4 rounded-md shadow-md h-80">
          <h1 className="text-xl font-semibold mb-2">Your Daily Blogs</h1>
          <ul>
            {blog.map(posts => (
              <li key={posts["_id"]} className="mb-2 flex justify-start items-center">
                <div className="text-lg flex-row">{posts["post"]}</div>
                <div className="text-sm text-gray-500 ml-3 w-15">By: {posts["postuser"]}</div>
                <div className="ml-2 flex justify-end items-end "><button className="" onClick={() => deletebyid(posts["_id"])}><Trash/></button></div>
                <div className="ml-2 flex justify-end items-end "><button className="" onClick={() => deletebyid(posts["_id"])}><Pencil/></button></div>
              </li>
            ))}
          </ul>
        </div>

        <SignedIn>
          <div className="bg-white p-4 mb-4 rounded-md shadow-md">
            <h1 className="text-xl font-semibold mb-2">Add A Blog</h1>
            <input
              type="text"
              placeholder="Your Blog Content"
              className="w-full border border-gray-300 rounded-md p-2 mb-2"
              onChange={(e) => setpost(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-md p-2 mb-2"
              onChange={(e) => setpostuser(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => addpost()}
            >
              Add Post
            </button>
            <button className="bg-red-800 text-white px-4 py-2 rounded-md ml-3"><SignOutButton /></button>
          </div>
        </SignedIn>
      </div>

      {/* <div className="flex justify-center space-x-4"> */}
        {/* <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => reset()}>Clear DB</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md" onClick={() => deletebyid(blog[0]["_id"])}>Delete By ID</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => updatebyid(blog[0]["_id"],"ahmed")}>Update By ID</button> */}
      {/* </div> */}

      <div className="flex justify-center mt-4 mb-20">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md"><SignInButton /></button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md ml-3"><SignUpButton /></button>
      </div>
    </div>
  );
}
