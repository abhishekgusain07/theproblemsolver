"use server"

import prisma from "@/lib/db"
import { getUserById } from "./Users"

export const getHabitsByUserClerkId = async({
    clerkUserId
}:{
    clerkUserId: string
}) => {
    const user = await prisma.user.findUnique( {
        where: {clerkUserId: clerkUserId},
        include: { habits: true},
    })
    if(!user)throw new Error (`User not found`)
    return user.habits
}