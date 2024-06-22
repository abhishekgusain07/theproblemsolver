'use client';

import { deletePost } from '@/actions/actions';
import { Trash } from 'lucide-react';


const TrashIcon = ({postId}:{postId:number}) => {
  return (
    <Trash
      className="cursor-pointer transition-transform duration-100 active:scale-90"
      onClick={() => deletePost(postId)}
    />
  );
};

export default TrashIcon;
