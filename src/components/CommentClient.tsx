"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { useUser } from "@clerk/nextjs"
import { toast } from "./ui/use-toast"
import { ToastAction } from "@radix-ui/react-toast"

const CommentClient = ({
    body,
    postId
}:{
    postId: number
    body: string
}) => {
    const [comment, setComment] = useState<string>("")
    const {user} = useUser()
    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value)
    }
    const handleSubmit = async() => {
        if(comment.trim() === '') {
            toast({
                variant: "destructive",
                title: "comment cannot be empty",
                description: "There was a problem with your request.",
              })
        }
        if (user) {
            try {
                await postComment({ postId: postId, clerkUserId: user.id, body: comment })
                setComment("")
            } catch (error) {
                console.error("Failed to post comment:", error)
            }
        } else {
            alert("Can't comment, user not logged in")
        }
    }
    if(!user)return <>Can't comment,user not logged in</>
    return (
        <div className="grid w-[300px] gap-2">
            <Textarea 
                placeholder = "Type your comment here."
                value = {comment}
                onChange={handleCommentChange}
            />
            <Button onClick={handleSubmit}>Send message</Button>
        </div>
    )
}

export default CommentClient