import prisma from "@/lib/db";
import Link from "next/link";
import TrashIcon from "./TrashIcon";
const PostList = async() => {
    const posts = await prisma.post.findMany()
    return (
        <ul className="max-w-[700px] mx-auto">
            {posts.map((post) => (
                <li className="mb-3" key={post.id}>
                    <div className="flex flex-row justify-between items-center space-x-3 mx-auto">
                        <Link href={`/posts/${post.id}`}>{post.title}</Link>
                        <TrashIcon postId={post.id} />
                    </div>
                </li>
            ))}
        </ul>
    )
}
export default PostList;