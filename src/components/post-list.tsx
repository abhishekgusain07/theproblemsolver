import prisma from "@/lib/db";
import Link from "next/link";
import TrashIcon from "./icons/TrashIcon";
import UpdateIcon from "./icons/UpdateIcon";
import SinglePost from "./SinglePost";
import { PostWithCounts } from "@/lib/types/types";
const PostList = async() => {
    const posts: PostWithCounts[] = await prisma.post.findMany({
        include: {
            _count: {
                select: {likes: true, comments: true},
            },
        },
    })
    return (
        <ul className="max-w-[700px] mx-auto">
            {posts.map((post) => (
                <SinglePost key={post.id} post={post} />
            ))}
        </ul>
    )
}
export default PostList;