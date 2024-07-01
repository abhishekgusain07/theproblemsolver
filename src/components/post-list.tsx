import prisma from "@/lib/db";
import SinglePost from "./SinglePost";
import { PostWithCounts } from "@/lib/types/types";
import SearchClientComp from "./SearchClientComp";
const PostList = async() => {
    const posts: PostWithCounts[]= await prisma.post.findMany({
        include: {
            _count: {
                select: {likes: true, comments: true},
            },
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    console.log('reached here')
    return (
        <ul className="max-w-[700px] mx-auto flex flex-col gap-y-4">
            <SearchClientComp />
            {posts.map((post) => (
                <SinglePost key={post.id} post={post} />
            ))}
        </ul>
    )
}
export default PostList;