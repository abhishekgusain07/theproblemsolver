import NotFound from "@/app/posts/[id]/not-found";
import prisma from "@/lib/db";
import LikeClientComponent from "./LikeClientComponent";
import { PostWithCounts } from "@/lib/types/types";
import { poppins } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-separator";
import Comments from "./Comments";

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
      <div className="flex flex-col gap-y-10 min-h-screen">
        <div>
            <h1 className="text-5xl font-semibold mb-7">{post.title}</h1>
            <LikeClientComponent postId={postId} posts={postWithCounts} />
        </div>
        <div className="flex justify-center text-center text-lg font-medium h-full w-full">
            <p className="w-full mx-auto">
                <span className={cn('tracking-wide text-lg', poppins.className)}>
                    {post.body}
                </span>
            </p>
        </div>
        <Separator className="my-4 text-gray-900" />
        <div className="flex justify-center items-end w-full">
            <div className="grid w-[300px] gap-2">
                <Textarea placeholder="Type your message here." />
                <Button>Send message</Button>
            </div>
        </div>
        <div className="mt-4 mb-2 flex flex-col gap-y-2 justify-center items-center">
          <Comments postId={postId}/>
        </div>
      </div>
    )
}
export default PostBody;