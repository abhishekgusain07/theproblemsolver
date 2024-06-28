"use client"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react";
import { didUserLikedThePost } from "./dbFunctions/didUserLIkedThePost";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { likePost, unLikePost } from "./dbFunctions/Posts";
import { PostWithCounts } from "@/lib/types/types";

const LikeClientComponent = ({postId, posts}:{postId: number; posts: PostWithCounts | null}) => {
    const {user} = useUser();
    const [userLiked, setUserLiked] = useState<boolean>(false)
    const handleLike = async() => {
        if (user && postId) {
            const userId = user.id;
            if (userLiked) {
              await unLikePost({ clerkUserId: userId, postId: postId });
              setUserLiked(false);
            } else {
              await likePost({ clerkUserId: userId, postId: postId });
              setUserLiked(true);
            }
          }
    }
    useEffect(() => {
        const fetchUserLiked = async() => {
            if(user && postId) {
                const userId = user?.id!
                const liked = await didUserLikedThePost({clerkUserId: userId, postId: postId})
                setUserLiked(liked)
            }
        }
        fetchUserLiked()
    },[postId, user])
    return (
        <div className="flex justify-center items-center flex-row gap-x-1">
            {
                userLiked ? (
                    <AiFillLike 
                        className={cn("cursor-pointer size-7 transition-transform duration-200 active:scale-90")}
                        onClick={handleLike}
                    />
                ): (
                    <AiOutlineLike className={cn("cursor-pointer size-7 transition-transform duration-200 active:scale-90")} 
                    onClick={handleLike}
                    />
                )
            }
            <p className="text-sm text-gray-800 font-bold">{posts?._count.likes}</p>
        </div>
    )
}
export default LikeClientComponent