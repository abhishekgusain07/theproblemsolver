"use server"
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const postSchema = z.object({
    title: z.string().min(5, "Title is required").max(30),
    body: z.string().min(10, "Body is required").max(500)
});
export async function createPost(formData: FormData) {
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
            body
        }
    })

    // revalidate the cache
    // everytime a new post is created, the posts page will get re-rendered immediately to reflect the changes
    revalidatePath("/posts")


    console.log("post created");    
}