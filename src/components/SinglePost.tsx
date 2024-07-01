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

const convertDate = (dateStr: Date):string=> {
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate
}
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
    console.log('-'+post.createdAt+'-')
    const postDate = convertDate(post.createdAt)
    return (
        <li className="mb-3 flex flex-col" key={post.id}>
            <div className="flex flex-row text-center justify-between items-center">
                <Link href={`/posts/${post.id}`} className="text-lg font-semibold">{post.title}</Link>
                <div>
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
            </div>
            <div className="flex flex-row items-start -mt-1">
                <p className="text-muted-foreground text-[13px] tracking-tight">{postDate}</p>
            </div>
        </li>
    )
}
export default SinglePost