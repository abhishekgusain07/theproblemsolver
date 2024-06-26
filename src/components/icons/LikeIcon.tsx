import { ArrowBigUp } from "lucide-react";

const LikeIcon = ({likes}:{likes:number}) => {
    return (
        <div className="flex flex-row gap-x-1 justify-center items-center">
            <ArrowBigUp className="cursor-pointer size-7 transition-transform duration-200 active:scale-90"/>
            <span className="text-gray-800 text-sm text-muted-foreground">{likes}</span>
        </div>
    )
}
export default LikeIcon;