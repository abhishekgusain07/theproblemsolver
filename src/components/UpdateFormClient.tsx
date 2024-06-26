"use client";

import React from "react";
import { updatePost } from "@/actions/actions";

interface UpdateFormClientProps {
  postId: number;
  initialTitle: string;
  initialBody: string;
}

const UpdateFormClient: React.FC<UpdateFormClientProps> = ({ postId, initialTitle, initialBody }) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: FormData = new FormData(event.currentTarget);
    await updatePost(postId, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-[400px] mx-auto gap-2 my-10">
      <input
        type="text"
        name="title"
        defaultValue={initialTitle}
        placeholder="Title for new post"
        className="border rounded px-3 h-10"
        required
      />
      <textarea
        name="body"
        placeholder="Body content for new post"
        defaultValue={initialBody}
        className="border rounded px-3 py-2"
        rows={6}
        required
      />
      <button className="h-10 bg-blue-500 px-5 rounded text-white">Update</button>
    </form>
  );
};

export default UpdateFormClient;
