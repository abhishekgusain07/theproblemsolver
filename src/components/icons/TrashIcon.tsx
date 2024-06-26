'use client';

import { deletePost } from '@/actions/actions';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { Trash } from 'lucide-react';
import { useState, useEffect } from 'react';

const TrashIcon = ({ postId }:{postId: number}) => {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      setIsAdmin(true);
    }
  }, [user]);

  const handleActionAccordingToUser = () => {
    if (isAdmin) {
      deletePost(postId);
    }
  };

  return (
    <Trash
      className={cn("cursor-pointer size-5 transition-transform duration-200 active:scale-90", isAdmin ? '' : 'hidden')}
      onClick={handleActionAccordingToUser}
    />
  );
};

export default TrashIcon;
