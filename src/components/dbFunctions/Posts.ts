"use server"

import prisma from "@/lib/db";
import { CommentType, Post, PostWithCounts } from "@/lib/types/types";
import { revalidatePath } from "next/cache";


export const getAllPost = async() => {
  const posts: Post[] = await prisma.post.findMany()
  if(!posts)throw new Error(`No post availaible`)
  return posts
}
export const likePost = async({
    clerkUserId, 
    postId
}:{
    clerkUserId: string;
    postId: number
}) => {
    const user = await prisma.user.findUnique({
        where:{clerkUserId}
    })
    if(!user)throw new Error(`User not found`);

    const like = await prisma.like.create({
        data:{
            userId: user.id,
            postId: postId
        }
    })
    revalidatePath(`/posts/${postId}`)
    return like
}

export const unLikePost = async({
    clerkUserId,
    postId
}:{
    clerkUserId: string;
    postId: number
}) => {
    const user = await prisma.user.findUnique({
        where:{clerkUserId}
    })
    if(!user)throw new Error(`User not found`);
    const unlike = await prisma.like.deleteMany({
        where:{
            userId: user.id,
            postId: postId
        }
    })
    revalidatePath(`/posts/${postId}`)
    return unlike
}

export const postWithLikeAndCommentCount = async ({
    postId
}:{
    postId: number
}): Promise<PostWithCounts|null> => {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
      });
  
      if (!post) {
        return null; 
      }
  
      return post as PostWithCounts;
    } catch (error) {
      console.error("Error fetching post with counts:", error);
      throw new Error("Failed to fetch post with counts");
    }
  };

export async function getCommentsByPostId({postId}:{
    postId: number
  }):Promise<CommentType[] | null>{
    try {
      const comments = await prisma.comment.findMany({
        where: {
          postId: postId
        },
        include: {
          user: true, 
          post: true 
        }
      })
      return  comments as CommentType[]
    } catch (error) {
      console.error(error)
      return []
    }
  }

export async function getPostWithLikeAndCommentsCount({postId}:{
  postId: number
}):Promise<PostWithCounts[]>{
  const posts: PostWithCounts[]= await prisma.post.findMany({
    include: {
        _count: {
            select: {likes: true, comments: true},
        },
    },
  })
  return posts as PostWithCounts[]
}

//TODO-29//
export const postComment = async({
  postId, 
  clerkUserId,
  body
}:{
  postId: number;
  clerkUserId: string;
  body: string
}):Promise<CommentType|null> => {
    try{
      const user = await prisma.user.findUnique({
        where:{clerkUserId: clerkUserId}
      })
      if(!user)throw new Error(`User not found`)
      const comment = await prisma.comment.create({
        data:{
          postId: postId,
          userId: user.id,
          body: body
        },
        include: {
          user: true,
          post: true
        }
      })
      revalidatePath(`/posts/${postId}`)
      return comment as CommentType;
    }catch(error) {
      console.log(error)
      throw new Error(`Failed to post comment`)
    }
}