import { BellRing, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Switch } from "./ui/switch"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { CommentType } from "@/lib/types/types"

const CommentCard = ({
    comment
}:{
    comment: CommentType
}) => {
    return (
        <Card className= "p-1 h-full w-full shadow-lg" >
            <CardHeader className="flex flex-col gap-y-2 items-start">
                <CardTitle className="text-sm">{comment.user.name}</CardTitle>
                <CardDescription>{comment.body}</CardDescription>
            </CardHeader>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}
export default CommentCard