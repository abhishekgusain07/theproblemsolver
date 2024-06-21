import { Button } from "@/components/ui/button";
import { createPost } from "../../actions/actions"

const CreatePost = async () => {
    return (
        <main className="text-center pt-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-5">Create Post</h1>
            <form
                action={createPost} 
                className="h-10 flex flex-col space-x-2 mt-10">
                <input
                    className="border rounded px-3 h-full"
                    type="text" 
                    name="title"
                    placeholder="Title for new Post"
                    required
                />
                <Button className="h-full bg-blue-500 px-5 rounded text-white">Submit</Button>
            </form>
        </main>
    )
}
export default CreatePost;