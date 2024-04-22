"use client";
import { useEffect, useState } from "react";
import React from "react";
import "../app.css";
import { SignInButton,SignUpButton,SignedIn, SignOutButton, UserButton,useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import Icon from "@/Components/notes";
import Like from "@/Components/like";
import Error from "@/Components/errorModal";
import {Socket,io} from "socket.io-client"
export default function Page() {
  //TODO:  Real time chat , Error Handling , Tests , Deploy with CI/CD
  interface Blog {
    post:string,
    likes:number,
    postuser:string,
    postuserid:string
  }

  const [blog,setblog]=useState<Blog[]>([]);
  const [post,setpost]=useState("");
  const [postuser,setpostuser]=useState("");
  const user=useUser()
  const router=useRouter()  
  const likePost=async(id:any,likes:number)=>{
    const newlike=likes+1
    console.log("Liked",id)
    const updatelike=async()=>{
      const update=await fetch(`http://localhost:3000/api/${id}/updatelikes`,{
        method:"PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          "likes":newlike
        })
      })
      console.log(update)
      if (update.status==200){
        console.log("Successful update")
        blog.map((posts)=>{
          if (posts["_id"]==id){
            console.log("Found")
            return {...posts,likes:posts["likes"]=newlike}
          }
          else{
            return posts
          }
          
        })
      window.location.reload()
      }
      else{
        console.log("Failed To Update -Frontend")
      }
    }
    const upd=await updatelike()
    console.log(post)
    // window.location.reload()
  }
  // const fetchbyid=async(postid:string)=>{
  //   const response = await fetch(`http://localhost:3000/api/${postid}`,{
  //     method:"GET"
  //   });
  //   const final=await response.json()
  //   return final.posts
  // }
  const fetchBlog = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getblog", {
        method: "GET"
      });
      const { posts } = await response.json();
      setblog(posts); // Update the state with fetched posts
      return posts;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  const addpost=async()=>{
    console.log("Frontend")
    if(post==""||postuser==""){
      console.log("Error")
    }
    else{
      try {
        const insert=await fetch("http://localhost:3000/api/postblog",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          "post":post,
          "postuser":postuser,
          "likes":0,
          "postuserid":user.user?.id
        })
      })
      const insertf=await insert.json()
      window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }
    }
    
  useEffect(() => {
    fetchBlog()  
  }, []);
  // fetchBlog()

  return (
    <div className="flex-col h-screen bg-gray-100">
      <div className="flex-1 p-4">
        <div className="bg-white rounded-md shadow-md h-60 p-4 flex-col">
          <div className="flex justify-between"><h1 className="text-xl font-semibold">Welcome to CS Blog {user.user?.fullName} </h1> <UserButton/></div>
          <div className="mt-10 flex justify-between">
            <SignedIn>
            <button className="bg-red-800 text-white px-40 py-10 rounded-md border-2 border-black"><h2 className="text-white font-semibold" onClick={()=>router.push("/posts")}>My Posts</h2></button>
            <button className="bg-red-800 text-white px-40 py-10 rounded-md border-2 border-black"><h2 className="text-white font-semibold">Trending</h2></button>
            <button className="bg-red-800 text-white px-40 py-10 rounded-md border-2 border-black"><h2 className="text-white font-semibold">Homework</h2></button>
            </SignedIn>
          </div>
        </div>

      </div>

      
      <div className="flex-1 p-4">
        <div className="bg-white p-4 mb-4 rounded-md shadow-md h-60">
          <h1 className="text-xl font-semibold mb-2">Your Daily Blogs</h1>
          <ul>
            {blog.map(posts => (
              <li key={posts["_id"]} className="mb-2 flex justify-start items-center gap-2">
                <button onClick={()=>router.push(`/${posts["_id"]}`)}><Icon/></button>
                <div className="text-lg flex-row">{posts["post"]}</div>
                <div className="text-sm text-gray-500 ml-3 w-15">By: {posts["postuser"]}</div>
                <SignedIn>
                  <button onClick={()=>likePost(posts["_id"],posts["likes"])}><Like/></button>
                </SignedIn>
                <div className="text-lg">{posts["likes"]} Likes</div>
              </li>
            ))}
          </ul>
        </div>

        <SignedIn>
          <div className="bg-white p-4  rounded-md shadow-md mt-10">
            <h1 className="text-xl font-semibold mb-2">Add A Blog</h1>
            <input
              type="text"
              placeholder="Your Blog Content"
              className="w-full border border-gray-300 rounded-md p-2 mb-2"
              required
              onChange={(e) => setpost(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-md p-2 mb-2"
              onChange={(e) => setpostuser(e.target.value)}
              required
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              type="submit"
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

      <div className="flex justify-center bg-white p-4  rounded-md shadow-md mt-10 m-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md"><SignInButton /></button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md ml-3"><SignUpButton /></button>
      </div>
    </div>
  );
}
