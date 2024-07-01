import NotFound from "@/app/posts/[id]/not-found";
import prisma from "@/lib/db";
import LikeClientComponent from "./LikeClientComponent";
import { CommentType, PostWithCounts } from "@/lib/types/types";
import { poppins } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import Comments from "./Comments";
import { getCommentsByPostId, postWithLikeAndCommentCount } from "./dbFunctions/Posts";
import CommentIcon from "./icons/CommentIcon";
import CommentClient from "./CommentClient";


const PostBody = async({postId}:{postId: number}) => {
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
    const comments:CommentType[]|null = await getCommentsByPostId({postId: postId})
    const postWithCount: PostWithCounts | null = await postWithLikeAndCommentCount({postId: postId})
    if(!postWithCounts) {
        return <NotFound />
    }
    return (
      <div className="flex flex-col gap-y-10 min-h-screen">
        <div>
            <h1 className="text-5xl font-semibold mb-7">{postWithCounts.title}</h1>
            <div className="flex flex-row items-center gap-x-3 justify-center">
              <LikeClientComponent postId={postId} posts={postWithCounts} />
              <CommentIcon comments={postWithCount?._count.comments!}/> 
            </div>
        </div>
        <div className="flex justify-center text-center text-lg font-medium h-full w-full">
            <p className="w-full mx-auto">
                <span className={cn('tracking-wide text-lg', poppins.className)}>
                    {postWithCounts.body}
                </span>
            </p>
        </div>
        <Separator className="my-4 text-gray-900" />
        <div className="flex justify-center items-end w-full mt-10">
            {/* comment client component */}
            <CommentClient postId={postId} body={postWithCounts.body}/>
        </div>
        <div className="mt-2 mb-2 flex flex-col gap-y-2 justify-center items-center">
          <Comments comments={comments} postId={postId}/>
        </div>
      </div>
    )
}
export default PostBody;