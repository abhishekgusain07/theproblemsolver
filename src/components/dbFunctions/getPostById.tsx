"use server"
import prisma from "@/lib/db";

export const getPostById = async(postId: number) => {
    const post =  await prisma.post.findUnique({
      where : { id: postId },
    });
    return post
}