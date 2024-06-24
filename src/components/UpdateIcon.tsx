'use client';
import { SquarePen } from 'lucide-react'
import { useRouter} from 'next/navigation'

const UpdateIcon = ({postId}:{postId:number}) => {
    const router = useRouter()
    return (
        <SquarePen
        className="cursor-pointer size-5 transition-transform duration-200 active:scale-90"
        onClick={() => router.replace(`/posts/update/${postId}`)}
        />
    );
};

export default UpdateIcon;
