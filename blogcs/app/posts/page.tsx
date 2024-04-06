"use client"
import "../../app.css";
import { SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"

export default function Posts() {
    const [myblog, setMyBlog] = useState([]);
    const user = useUser();
    const router = useRouter();
    const fetchMyBlogs = async (id:string) => {
        const fetchMyBlogs = await fetch(`http://localhost:3000/api/${id}`, {
            method: "GET"
        });
        const posts = await fetchMyBlogs.json();
        console.log(posts); // Logging fetched posts for debugging
        setMyBlog(posts);
    }

    useEffect(() => {
        const id = user.user?.id;
        if (id) {
            fetchMyBlogs(id);
        }
    }, [user.user?.id]);

    return (
    <div className="h-60 w-screen flex flex-col justify-between gap-4 ml-5">
            <div className="mt-10"><h1 className="text-2xl font-bold">My Posts</h1></div>
                <div className="mt-10">
                    {myblog.length > 0 ? (
                        <div>
                            {myblog.map((post, index) => (
                                <div key={index} className="">
                                   <li className="">{post.post}</li>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>
                <div className="mt-10"><button className="rounded-md shadow-md bg-black text-cyan-600 font-semibold p-4" onClick={()=>router.push("/")}>Return To Home Page</button></div>
        </div>
    );
}
