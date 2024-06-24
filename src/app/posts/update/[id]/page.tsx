import Form from "@/components/Form";
import UpdateForm from "@/components/UpdateForm";
import { Suspense } from "react";

const Page = async({ 
    params
}:{
    params: {id: string}
}) => {
    const postid = Number(params.id)
    
    return (
        <main className="text-center pt-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-5">Update Post</h1>
            <Suspense fallback="...loading">
                <UpdateForm postId={postid} />
            </Suspense>
        </main>
    )
}
export default Page;