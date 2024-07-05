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
export const getHabitById = async({habitId}:{habitId: number}):Promise<Habit> => {
    try {
        const habit = await prisma.habit.findUnique({
            where: {id: habitId}
        })
        if(!habit) {
            throw new Error(`There is no habit with id ${habitId}`)
        }
        return habit
    } catch (error) {
        console.log(error)
        throw new Error(`Failed to retrieve habit with id ${habitId}`)
    }
}

export const addHabitActivity = async({
    habitId,
    date
}:{
    habitId: number,
    date: Date
}) => {
    try {
        const existingHabitActivity = await prisma.habitActivity.findUnique({
            where:{
                habitId_date: {
                    habitId,
                    date
                }
            }
        })
        if (existingHabitActivity) {
            console.log('Habit activity already exists for this date.');
            return;
        }

        const newHabitActivity = await prisma.habitActivity.create({
            data: {
                date: date,
                habitId: habitId,
            },
        });
        console.log('Habit activity created:', newHabitActivity);
    } catch (error) {
        console.error('Error creating habit activity:', error);
        throw new Error(`Error creating habit activity: ${error}`)
    }
}

export const checkingExistingHabitActivity = async({
    habitId,
    date
}:{
    habitId: number,
    date: Date
}): Promise<boolean>=> {
    try {
        const existingHabitActivity = await prisma.habitActivity.findUnique({
            where:{
                habitId_date: {
                    habitId,
                    date
                }
            }
        })
        if (existingHabitActivity) {
            return true
        }else return false
    } catch (error) {
        console.log(`error: ${error}`)
        return false
    }
}