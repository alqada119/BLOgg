"use client"
import { useEffect } from "react";
import connecttodb from "@/utils/connection";
export default function Page() {
  const fetchBlog = async () => {
    try {
      const connect=await connecttodb()
      const response = await fetch("http://localhost:3000/api/getblog",{
        method:"GET"
      });
      const final=await response.json()
      console.log(final)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  fetchBlog()
  return (
    <div className="flex bg-slate-500">
      <h1>Hello CS Welcome</h1>
    </div>
  );
}
