import NotFound from "@/app/posts/[id]/not-found";
import prisma from "@/lib/db";
import LikeClientComponent from "./LikeClientComponent";
import { PostWithCounts } from "@/lib/types/types";
import { postWithLikeAndCommentCount } from "./dbFunctions/Posts";

const PostBody = async({postId}:{postId: number}) => {
    const post = await prisma.post.findUnique({
        where: {
            id: Number(postId)
        }
    })
    const postWithCounts: PostWithCounts | null = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
    });
    
    if(!post) {
        return <NotFound />
    }
    return (
        <div className="flex flex-col gap-y-10">
            <div>
                <h1 className="text-5xl font-semibold mb-7">{post.title}
                </h1>
                <LikeClientComponent postId={postId} posts={postWithCounts}/>
            </div>
            <p className="max-w-[700px] mx-auto"> {post.body}</p> 
        </div>
        
    )
}
export default PostBody;