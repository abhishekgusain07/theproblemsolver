import NotFound from "@/app/posts/[id]/not-found";
import prisma from "@/lib/db";

const PostBody = async({postId}:{postId: number}) => {
    const post = await prisma.post.findUnique({
        where: {
            id: Number(postId)
        }
    })
    if(!post) {
        return <NotFound />
    }
    return (
        <>
            <h1 className="text-5xl font-semibold mb-7">{post.title}</h1>
            <p className="max-w-[700px] mx-auto"> {post.body}</p>
        </>
        
    )
}
export default PostBody;