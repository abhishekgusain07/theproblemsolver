import PostList from "@/components/post-list";
import { Suspense, useEffect } from "react";

const Page = async() => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    return <main className="text-center pt-16 px-5">
        <h1 className="text-4xl md:text-5xl font-bold mb-5"> Logs </h1>
        <Suspense fallback = "...loading">
            <PostList />
        </Suspense>
    </main>
}
export default Page;