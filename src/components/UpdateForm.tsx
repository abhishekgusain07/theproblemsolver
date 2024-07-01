import {  updatePost } from "@/actions/actions";
import React, { Suspense } from "react";
import { getPostById } from "./dbFunctions/getPostById";
import { Post } from "@/lib/types/types";
import UpdateFormClient from "./UpdateFormClient";


export default async function UpdateForm({postId}:{postId: number}) {
    const post: Post | null = await getPostById(postId) 
    if(!post)return <div>Post not found</div>
    return (
      <Suspense fallback="...loading">
          <UpdateFormClient postId={postId} initialTitle={post.title} initialBody={post.body} initialFlairs={post.flairs}/>
        </Suspense>
      );
}