"use client";
import { useState } from "react";
import { Button } from "./ui/button";

const UpvoteBtn = () => {
    const [upvoteCount, setUpvoteCount] = useState(0)
    return (
        <Button 
            className="bg-blue-500 text-white p-2 mt-10"
            onClick={() => {
                setUpvoteCount(prev => prev+1);
            }}
        >
           upvote
        </Button>
    )
}
export default UpvoteBtn;