import PostBody from "@/components/post-body";
import { Suspense } from "react";

const PostPage = async({ 
    params,
    title
}:{
    params: {id: string};
    title: string;
}) => {
    const postid = Number(params.id)
    
    return (
        <main className="px-7 pt-24 text-center">
            <Suspense fallback="...loading Post">
                <PostBody postId={postid}/>
            </Suspense>
        </main>
    )
}
export default PostPage;