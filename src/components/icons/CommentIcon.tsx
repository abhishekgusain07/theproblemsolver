import {  MessageCircle } from "lucide-react";

const CommentIcon = ({comments}:{comments:number}) => {
    return (
        <div className="flex flex-row gap-x-1 justify-center items-center">
            <MessageCircle className="cursor-pointer size-5 transition-transform duration-200 active:scale-90 text-lg font-bold"/>
            <span className="text-gray-800 text-sm text-muted-foreground">{comments}</span>
        </div>
    )
}
export default CommentIcon;