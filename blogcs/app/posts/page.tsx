"use client"
import "../../app.css";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Pencil from "../../Components/pencil";
import Trash from "../../Components/trash";
import Note from "../../Components/notes";
import Back from "@/Components/backbutton";

interface Blog {
  _id: string;
  post: string;
  postuser: string;
  likes: number;
  postuserid: string;
}

export default function Posts() {
  const [myblog, setMyBlog] = useState<Blog[]>([]);
  const user = useUser();
  const router = useRouter();

  const updatebyid = async (id: string, post: string) => {
    try {
      const updates = await fetch(`http://localhost:3000/api/${id}/updatebyid`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post })
      });
      console.log(`Successful update with text ${post}`, updates);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const deletebyid = async (id: string) => {
    try {
      const deletes = await fetch(`http://localhost:3000/api/${id}/deletebyid`, {
        method: "DELETE"
      });
      console.log("Successfully deleted", deletes);
      setMyBlog(myblog.filter(post => post._id !== id)); // Update state without reload
    } catch (error) {
      console.log("Error", error);
    }
  };

  const fetchMyBlogs = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/${id}`, {
        method: "GET"
      });
      const posts = await response.json();
      console.log(posts); // Logging fetched posts for debugging
      setMyBlog(posts);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    const id = user.user?.id;
    if (id) {
      fetchMyBlogs(id);
    }
  }, [user.user?.id]);

  return (
    <div className="h-60 w-screen flex flex-col justify-between gap-4 ml-5">
      <div className="mt-10"><Back /><h1 className="text-2xl font-bold">My Posts</h1></div>
      <div className="mt-10">
        {myblog.length > 0 ? (
          <div>
            {myblog.map((post, index) => (
              <div key={index} className="flex items-center gap-4">
                <div><Note /></div>
                <div className="font-semibold text-2xl">{post.post}</div>
                <div className="ml-2 flex"><button className="" onClick={() => deletebyid(post._id)}><Trash /></button></div>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts available.</p>
        )}
      </div>
      <div className="mt-10"><button className="rounded-md shadow-md bg-black text-cyan-600 font-semibold p-4" onClick={() => router.push("/")}>Return To Home Page</button></div>
    </div>
  );
}
