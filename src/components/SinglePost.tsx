"use client";
import { Post } from "@/lib/types/types"
import Link from "next/link"
import UpdateIcon from "./UpdateIcon"
import TrashIcon from "./TrashIcon"

const SinglePost = ({post}: {post: Post}) => {
    return (
        <li className="mb-3" key={post.id}>
            <div className="flex flex-row text-center justify-between items-center space-x-3 mx-auto">
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
                {
                    <div className="flex items-center justify-center gap-x-3">
                        <UpdateIcon postId={post.id} />
                        <TrashIcon postId={post.id} />
                    </div>
                }
            </div>
        </li>
    )
}
export default SinglePost