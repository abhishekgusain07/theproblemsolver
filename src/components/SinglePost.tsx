"use client";
import {  PostWithCounts } from "@/lib/types/types"
import Link from "next/link"
import UpdateIcon from "./icons/UpdateIcon"
import TrashIcon from "./icons/TrashIcon"
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import LikeIcon from "./icons/LikeIcon";
import CommentIcon from "./icons/CommentIcon";
import { didUserLikedThePost } from "./dbFunctions/didUserLIkedThePost";

const SinglePost = ({post}: {post: PostWithCounts}) => {
    const {user, isLoaded} = useUser();
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [userLiked, setUserLiked] = useState<boolean>(false)
    useEffect(() => {
        if(user?.primaryEmailAddress?.emailAddress === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
            setIsAdmin(true)
        }
    },[user])
    useEffect(() => {
        const fetchUserLiked = async() => {
            if(user && post) {
                const userId = user?.id!
                const postId = post?.id!
                const liked = await didUserLikedThePost({clerkUserId: userId, postId: postId})
                setUserLiked(liked)
            }
        }
        fetchUserLiked()
    },[post, user])
    if(!isLoaded)return <></>
    return (
        <li className="mb-3" key={post.id}>
            <div className="flex flex-row text-center justify-between items-center space-x-3 mx-auto">
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
                {
                    isAdmin ? (
                        <div className="flex items-center justify-center gap-x-3">
                            <UpdateIcon postId={post.id} />
                            <TrashIcon postId={post.id} />
                        </div>
                    ) : (
                        <div className="flex items-center justify-between gap-x-5">
                            <LikeIcon likes={post._count.likes} userLiked={userLiked}/>
                            <CommentIcon comments={post._count.comments} />
                        </div>
                    ) 
                }
            </div>
        </li>
    )
}
export default SinglePost