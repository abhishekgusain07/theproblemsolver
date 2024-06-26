import prisma from "@/lib/db";
import { User } from "@/lib/types/types";

export async function createUser(user: User) {
    await prisma.user.create({
        data:{
            clerkUserId: user.clerkUserId,
            email: user.email,
            name: user.name,
            likes:  {
                create: user.likes?.map(like => ({
                    userId: like.userId,
                    postId: like.postId,
                })) || []
            },
            comments: {
                create: user.comments?.map(comment => ({
                    body: comment.body,
                    userId: comment.userId,
                    postId: comment.postId
                })) || []
            },
        },
    })
}
export async function getUserById({
    id,
    clerkUserId
}:{
    id?: number;
    clerkUserId?: string;
}) {
        if(!id && !clerkUserId){
            throw new Error('Either id or clerkUserId must be provided')
        }
        const user = await prisma.user.findUnique({
            where: {
                id: id ?? undefined,
                clerkUserId: clerkUserId ?? undefined
            },
            include: {
                likes: true,
                comments: true
            }
        })
        if(!user){
            throw new Error(`User not found`)
        }
        return user as User
}
export async function updateUser({id,clerkUserId, data}:{
    id?: number;
    clerkUserId?: string;
    data: Partial<User>;
}) {
    if(!id && !clerkUserId){
        throw new Error('Either id or clerkUserId must be provided')
    }
    const user = await prisma.user.update({
        where: {
            id: id ?? undefined,
            clerkUserId: clerkUserId ?? undefined
        },
        data: {
            ...data,
            likes: {
                upsert: data.likes?.map(like => ({
                    where: {
                        userId_postId: {
                            userId: like.userId,
                            postId: like.postId,
                        },
                    },
                    create: {
                        userId: like.userId,
                        postId: like.postId,
                    },
                    update: {},
                })) || []
            },
            comments: {
                upsert: data.comments?.map(comment => ({
                    where: {
                        id: comment.id || 0, // Assumes `comment.id` is provided for updating
                    },
                    create: {
                        body: comment.body,
                        userId: comment.userId,
                        postId: comment.postId,
                    },
                    update: {
                        body: comment.body,
                    },
                })) || []
            },
        },
    });

    return user;
}
export async function deleteUser({id, clerkUserId}:{
    id?: number;
    clerkUserId?: string
}) {
    if(!id && !clerkUserId){
        throw new Error('Either id or clerkUserId must be provided')
    }
    const user = await prisma.user.delete({
        where: {
            id: id ?? undefined,
            clerkUserId: clerkUserId ?? undefined
        }
    })
    return user
}