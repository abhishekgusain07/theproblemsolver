"use client"

import HabitPage from "@/components/HabitPage";
import { useUser } from "@clerk/nextjs";

const Habit = () => {
    const {user} = useUser()
    if(!user)
        return <h1 className="text-center text-bold text-lg">Please Login First</h1>
    return (
        <div>
            Habit
            {/* checking new branch flow */}
            <HabitPage clerkUserId={user.id}/>
        </div>
    )
}
export default Habit;