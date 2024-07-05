import { getHabitById } from "@/components/dbFunctions/Habit"
import HabitEntry from "@/components/HabitEntry"
import { Separator } from "@/components/ui/separator"

const Page = async({
    params
}:{
    params: {id: string}
}) => {
    const habitId = Number(params.id)
    console.log(habitId)
    const habit = await getHabitById({habitId})
    const habitTitle = habit.title.toUpperCase()
    return (
        <div className="p-10">
            <div className="flex justify-center text-center">
                <div className="pt-8 flex flex-col gap-y-1">
                    <span className="text-3xl font-semibold tracking-tight">{habitTitle}</span>
                    <Separator className="my-1 bg-black h-[3px]"/>
                </div>
            </div>  
            <div className="mt-10 flex justify-start">
                <HabitEntry habitId={habitId}/>
            </div>
        </div>
    )
}

export default Page