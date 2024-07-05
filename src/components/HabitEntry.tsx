'use client'

import { useUser } from "@clerk/nextjs"
import Loader from "./Loader";
import { Checkbox } from "./ui/checkbox";
import { useEffect, useState } from "react";
import { addHabitActivity, checkingExistingHabitActivity } from "./dbFunctions/Habit";

const HabitEntry = ({
    habitId
}:{
    habitId: number
}) => {
    const user = useUser();
    
    if(!user)return <Loader />
    const todayDate = (new Date(Date.now())).toDateString().substring(3)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    useEffect(() => {
        async function checkInitialValue() {
            const initialCheckedValue: boolean = await checkingExistingHabitActivity({habitId: habitId, date: new Date()}) 
            setIsChecked(initialCheckedValue)
        }
    }, [])
    const handleClick = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setIsChecked(checked)
        if(isChecked) {
            await  addHabitActivity({habitId: habitId, date: new Date()})
        }
    }
    return (
        <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" checked={isChecked} onChange={handleClick}/>
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Done for {todayDate}
                </label>
        </div>
    )
}

export default HabitEntry