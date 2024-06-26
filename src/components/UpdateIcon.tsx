'use client';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { SquarePen } from 'lucide-react'
import { useRouter} from 'next/navigation'
import { useEffect, useState } from 'react';

const UpdateIcon = ({postId}:{postId:number}) => {
    const router = useRouter()
    const { user } = useUser()
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress === 'abhishek.gusain1007fb@gmail.com') {
            setIsAdmin(true);
        }
    }, [user])
    const handleActionAccordingToUser = () => {
        if(isAdmin) {
            router.replace(`/posts/update/${postId}`)
        }
    }
    return (
        <SquarePen
        className={cn("cursor-pointer size-5 transition-transform duration-200 active:scale-90",isAdmin ? '' : 'hidden')}
        onClick={handleActionAccordingToUser}
        />
    );
};

export default UpdateIcon;
