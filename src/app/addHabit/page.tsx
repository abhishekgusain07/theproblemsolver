"use client"
import { createNewHabit } from "@/components/dbFunctions/Habit"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { habitSchema } from "@/lib/schema/schema"
import { Habit } from "@/lib/types/types"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Page = () => {
    const [habit, setHabit] = useState<string>("")
    const router = useRouter()
    const {toast} = useToast()
    const {user, isLoaded} = useUser()
    if(!user) return <div>....First Login</div>
    if(!isLoaded)return <div>...Loading User</div>
    const handleSumbit = async() => {
        console.log(`inside submit`)
        const result = habitSchema.safeParse({habit})
        if(result.success === false){
            toast({
                variant: "destructive",
                title: "Enter the habit in correct format",
                description: "Habit should be string of alphabet only and not longer than 20 letters",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            setHabit("")
            return
        }
        try {
            const newhabit:Habit = await createNewHabit({clerkUserId: user.id , habit: habit})
            setHabit("")
            router.replace('/habits')
            toast({
                description: `${habit} added to your habits`,
            })
        } catch (error) {
            console.log(error)
            throw new Error(`Error while creating new Habit`)
        } 
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHabit(event.target.value)
    }
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col gap-y-2 mt-10">
            <Input onChange={handleChange} value={habit} placeholder="Name of the Habit" />
            <Button onClick={handleSumbit}>Add Habit</Button>
            </div>
        </div>
    )
}
export default Page