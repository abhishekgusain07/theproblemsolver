import { getHabitsByUserClerkId } from "./dbFunctions/Habit"

const HabitPage = async({
    clerkUserId
}:{
    clerkUserId: string
}) => {
    const habits = await getHabitsByUserClerkId({clerkUserId: clerkUserId})
    return (
        <div>
            Habit Page
            {
                (habits === null || habits.length === 0) ? (
                    <>
                        No habits 
                    </>
                ): (
                    <>
                        have some habits
                    </>
                )
            }
        </div>
    )
}

export default HabitPage