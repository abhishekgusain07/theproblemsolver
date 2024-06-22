import Form from "@/components/Form"
import { Suspense } from "react";
const CreatePost = async () => {
    return (
        <main className="text-center pt-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-5">Create Post</h1>
            <Suspense fallback="...loading">
            <Form />
            </Suspense>
        </main>
    )
}
export default CreatePost;