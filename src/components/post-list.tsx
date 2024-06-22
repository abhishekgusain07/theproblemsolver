import prisma from "@/lib/db";
import Link from "next/link";

interface Post {
    id: number;
    title: string;
    body: string;
}
const PostList = async() => {
    const posts = await prisma.post.findMany()
    return (
        <ul>
            <li className="max-w-[700px] mx-auto">
                {
                    posts.map((post) => (
                        <li className="mb-3" key={post.id}>
                            <Link href={`/posts/${post.id}`}>{post.title}</Link>
                        </li>
                    ))
                }
            </li>
        </ul>
    )
}
export default PostList;