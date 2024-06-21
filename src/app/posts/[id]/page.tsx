import PostBody from "@/components/post-body";
import { Suspense } from "react";

const Page = async({ 
    params
}:{
    params: {id: string}
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
export default Page;