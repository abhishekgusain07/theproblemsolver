"use server"

import prisma from "@/lib/db"
import { Habit } from "@/lib/types/types"
import { revalidatePath } from "next/cache"

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

export const createNewHabit = async({
    clerkUserId,
    habit
}:{
    clerkUserId: string,
    habit: string
}):Promise<Habit> => {
    try {
        const user = await prisma.user.findUnique( {
            where: {clerkUserId: clerkUserId}
        })
        if(!user)throw new Error (`User not found`)
        const newHabit = await prisma.habit.create({
            data:{
                title: habit,
                userId: user.id
            }
        })
        revalidatePath('/habits')
        return newHabit
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to create new habit: ${error}`);
    }
}