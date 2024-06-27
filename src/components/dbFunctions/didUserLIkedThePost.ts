"use server";

import prisma from "@/lib/db";
import { getUserById } from "./Users";

export const didUserLikedThePost = async({
    clerkUserId,
    postId
}:{
    clerkUserId: string
    postId: number
}): Promise<boolean>=> {
    try{
        const user = await getUserById({clerkUserId: clerkUserId})
        if(!user) {
            console.log(`user not found with clerId: ${clerkUserId}`)
            return false
        }
        const userId = user.id!

        const like = await prisma.like.findUnique({
            where:{
                userId_postId: {
                    userId: userId, 
                    postId: postId
                }
            }
        })
        if(like !== null)return true;
        else return false;
    }catch(error) {
        console.log(`error retrieving like value of user with clerkUserId: ${clerkUserId}`)
        return false
    }
}