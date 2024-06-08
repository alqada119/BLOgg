"use client";
import { useEffect, useState } from "react";
import React from "react";
import "../app.css";
import { SignInButton, SignUpButton, SignedIn, SignOutButton, UserButton, useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import Icon from "@/Components/notes";
import Like from "@/Components/like";
import Error from "@/Components/errorModal";
import { Socket, io } from "socket.io-client";

// Define the Blog interface
interface Blog {
  _id: string;
  post: string;
  likes: number;
  postuser: string;
  postuserid: string;
}

export default function Page() {
  const [blog, setBlog] = useState<Blog[]>([]);
  const [post, setPost] = useState("");
  const [postUser, setPostUser] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const router = useRouter();

  const likePost = async (id: string, likes: number) => {
    const newLikes = likes + 1;
    try {
      const response = await fetch(`http://localhost:3000/api/${id}/updatelikes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: newLikes }),
      });

      if (response.ok) {
        setBlog((prevBlog) =>
          prevBlog.map((post) =>
            post._id === id ? { ...post, likes: newLikes } : post
          )
        );
      } else {
        console.error("Failed to update likes");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/getblog");
      const { posts } = await response.json();
      setBlog(posts);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async () => {
    if (post === "" || postUser === "") {
      console.error("Post content or user is empty");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/postblog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post,
          postuser: postUser,
          likes: 0,
          postuserid: user.user?.id,
        }),
      });

      if (response.ok) {
        fetchBlog(); // Refresh the blog list
        setPost("");
        setPostUser("");
      } else {
        console.error("Failed to add post");
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="flex-col h-screen bg-gray-100">
      <div className="flex-1 p-4">
        <div className="bg-white rounded-md shadow-md h-60 p-4 flex-col">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">
              Welcome to CS Blog {user.user?.fullName}
            </h1>
            <UserButton />
          </div>
          <div className="mt-10 flex justify-between">
            <SignedIn>
              <button
                className="bg-red-800 text-white px-40 py-10 rounded-md border-2 border-black"
                onClick={() => router.push("/posts")}
              >
                <h2 className="text-white font-semibold">My Posts</h2>
              </button>
              <button className="bg-red-800 text-white px-40 py-10 rounded-md border-2 border-black">
                <h2 className="text-white font-semibold">Trending</h2>
              </button>
              <button className="bg-red-800 text-white px-40 py-10 rounded-md border-2 border-black">
                <h2 className="text-white font-semibold">Homework</h2>
              </button>
            </SignedIn>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="bg-white p-4 mb-4 rounded-md shadow-md h-60">
          <h1 className="text-xl font-semibold mb-2">Your Daily Blogs</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {blog.map((post) => (
                <li key={post._id} className="mb-2 flex justify-start items-center gap-2">
                  <button onClick={() => router.push(`/${post._id}`)}>
                    <Icon />
                  </button>
                  <div className="text-lg flex-row">{post.post}</div>
                  <div className="text-sm text-gray-500 ml-3 w-15">By: {post.postuser}</div>
                  <SignedIn>
                    <button onClick={() => likePost(post._id, post.likes)}>
                      <Like />
                    </button>
                  </SignedIn>
                  <div className="text-lg">{post.likes} Likes</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <SignedIn>
          <div className="bg-white p-4 rounded-md shadow-md mt-10">
            <h1 className="text-xl font-semibold mb-2">Add A Blog</h1>
            <input
              type="text"
              placeholder="Your Blog Content"
              className="w-full border border-gray-300 rounded-md p-2 mb-2"
              required
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-md p-2 mb-2"
              value={postUser}
              onChange={(e) => setPostUser(e.target.value)}
              required
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              type="submit"
              onClick={addPost}
            >
              Add Post
            </button>
            <button className="bg-red-800 text-white px-4 py-2 rounded-md ml-3">
              <SignOutButton />
            </button>
          </div>
        </SignedIn>
      </div>

      <div className="flex justify-center bg-white p-4 rounded-md shadow-md mt-10 m-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">
          <SignInButton />
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md ml-3">
          <SignUpButton />
        </button>
      </div>
    </div>
  );
}
