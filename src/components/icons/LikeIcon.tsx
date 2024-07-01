import { cn } from "@/lib/utils";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const LikeIcon = ({likes, userLiked}:{likes:number, userLiked: boolean}) => {
    return (
        <div className={cn("flex flex-row gap-x-1 justify-center items-center")}>
            {userLiked ? (
                <AiFillLike className={cn("cursor-pointer size-7 transition-transform duration-200 active:scale-90")} />
            ) : (
                <AiOutlineLike className={cn("cursor-pointer size-7 transition-transform duration-200 active:scale-90")} />
            )}
            <span className="text-gray-800 text-sm text-muted-foreground">{likes}</span>
        </div>
    )
}
export default LikeIcon;