"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { useUser } from "@clerk/nextjs"
import { useToast } from "./ui/use-toast"
import { postComment } from "./dbFunctions/Posts"

const CommentClient = ({
    body,
    postId
}:{
    postId: number
    body: string
}) => {
    const [comment, setComment] = useState<string>("")
    const {toast} = useToast()
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
                toast({
                    variant: "default",
                    title: "Commented",
                })
                setComment("")
            } catch (error) {
                console.error("Failed to post comment:", error)
            }
        } else {
            alert("Can't comment, user not logged in")
        }
    }
    if(!user)
        return( 
        <>
            <h1 className="text-center font-semibold text-2xl text-muted-foreground">Login to Comment</h1>
        </>
    )
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