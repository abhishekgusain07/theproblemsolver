import {  updatePost } from "@/actions/actions";
import React, { Suspense } from "react";
import { getPostById } from "./dbFunctions/getPostById";
import { Post } from "@/lib/types/types";


export default async function UpdateForm({postId}:{postId: number}) {
    const post: Post | null = await getPostById(postId) 
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData: FormData = new FormData(event.currentTarget);
      await updatePost(postId, formData)
    }
    return (
      <Suspense fallback="...loading">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col max-w-[400px] mx-auto gap-2 my-10"
          >
            <input
              type="text"
              name="title"
              defaultValue={post?.title || ""}
              placeholder="Title for new post"
              className="border rounded px-3 h-10"
              required
            />
            <textarea
              name="body"
              placeholder="Body content for new post"
              defaultValue={post?.body || ""}
              className="border rounded px-3 py-2"
              rows={6}
              required
            />
            <button className="h-10 bg-blue-500 px-5 rounded text-white">
              update
            </button>
          </form>
        </Suspense>
      );
}