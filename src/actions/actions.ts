"use server"
import prisma from "@/lib/db";
import { auth, getAuth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const postSchema = z.object({
    title: z.string().min(5, "Title is required").max(30),
    body: z.string().min(10, "Body is required").max(500),
});
export async function createPost(formData: FormData) {

    // auth check to protect unauthorized person from hitting the route
    const { has } = auth()
    if(!has) {
        redirect('/sign-in')
    }

    const title = formData.get('title') as string;
    const body = formData.get('body') as string;

    //zod validation
    const result = postSchema.safeParse({title, body});
    
    if(!result.success) {
        console.log(result.error.issues)
        return { error: result.error.issues };
    }

    //adding data to databse
    await prisma.post.create({
        data: {
            title, 
            body,
        }
    })

    // revalidate the cache
    // everytime a new post is created, the posts page will get re-rendered immediately to reflect the changes


    console.log("post created"); 
    revalidatePath("/posts")
    redirect('/posts')   
}

export async function deletePost(postId: number) {
    // auth check
    const {has} = auth()
    if(!has) {
        redirect('/sign-in')
    }
    
    try{
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });
        
        if (!post) {
            console.log(`Post with id ${postId} not found`);
            return;
        }
        
        // Delete the post if found
        await prisma.post.delete({
            where: { id: postId },
        });
        
        console.log(`Post with id ${postId} deleted`);
    }catch(error) {
        console.log('Error deleting post', error)
        throw new Error('Error deleting post')
    }

    //revalidating cache
    revalidatePath("/posts")
}

export async function updatePost(postId: number, formData: FormData) {
    // write this function
    
    //auth check to protect unauthorized access
    const { has } = auth()
    if(!has) {
        redirect('/sign-in')
    }

    const title = formData.get('title') as string;
    const body = formData.get('body') as  string;

    //zod validation
    const result = postSchema.safeParse({ title, body })

    if(!result.success) {
        console.log(result.error.issues);
        return { error: result.error.issues };
    }

    //finding and updating the post
    try {
        // Check if the post exists
        const post = await prisma.post.findUnique({
          where: { id: postId },
        });
    
        if (!post) {
          console.log(`Post with id ${postId} not found`);
          return { error: `Post with id ${postId} not found` };
        }
    
        // Update the post in the database
        await prisma.post.update({
          where: { id: postId },
          data: {
            title,
            body,
          },
        });
    
        console.log(`Post with id ${postId} updated`);
      } catch (error) {
        console.log('Error updating post', error);
        throw new Error('Error updating post');
      }
    revalidatePath('/posts')
    redirect('/posts')
}
