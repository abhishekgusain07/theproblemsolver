import prisma from "@/lib/db";
import Link from "next/link";
import TrashIcon from "./TrashIcon";
import UpdateIcon from "./UpdateIcon";
import SinglePost from "./SinglePost";
const PostList = async() => {
    const posts = await prisma.post.findMany()
    return (
        <ul className="max-w-[700px] mx-auto">
            {posts.map((post) => (
                <SinglePost key={post.id} post={post} />
            ))}
        </ul>
    )
}
export default PostList;