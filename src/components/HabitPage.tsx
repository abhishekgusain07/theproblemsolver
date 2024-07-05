"use client"
import React, { useEffect, useState } from "react"
import {getHabitsByUserClerkId } from "./dbFunctions/Habit"
import { Habit } from "@/lib/types/types"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "./ui/button"

const HabitPage = ({
    clerkUserId
}:{
    clerkUserId: string
}) => {
    
    const [habits, setHabits] = useState<Habit[]| null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {user, isLoaded} = useUser()
    useEffect(() => {
        const fetchHabits = async() => {
            const fetchedHabits = await getHabitsByUserClerkId({clerkUserId: clerkUserId})
            setHabits(fetchedHabits)
            setIsLoading(false)
        }
        fetchHabits()
        
    }, [clerkUserId])
    
    if(isLoading || !isLoaded || !user)return <div>...Loading Habits</div>
    return (
        <div>
            Habit Page
            <div className="flex items-center justify-center">
            {
                (habits === null || habits.length === 0) ? (
                    <div className="flex justify-center text-4xl items-center text-center font-semibold md:text-5xl">
                        <h1>
                            No habits 
                        </h1> 
                    </div>
                ): (
                    <div className="grid gap-4 py-4 grid-cols-2 md:grid-cols-3">
                        {
                            habits.map((habit) => {
                                return (
                                    <Link key={habit.id} href={`/habits/${habit.id}`}>
                                        <div key={habit.id} className=" flex flex-row items-center justify-center hover:bg-gray-50 bg-gray-100 h-[100px] w-[100px] shadow-sm rounded-md">
                                            
                                                {habit.title} 
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                )
            }
            </div>
            <div className="flex items-center justify-center">
                <Link href="/addHabit"><Button>Add Habit</Button></Link>
            </div>
        </div>
    )
}

export default HabitPage