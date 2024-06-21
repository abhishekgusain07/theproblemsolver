import Link from "next/link";
import { useEffect } from "react";

const Page = async() => {
    const response = await fetch("https://dummyjson.com/posts?limit=10")
    const data = await response.json()
    return <main className="text-center pt-16 px-5">
        <h1 className="text-4xl md:text-5xl font-bold mb-5"> Logs </h1>
        <ul>
            <li className="max-w-[700px] mx-auto">
                {
                    data.posts.map(post => (
                        <li className="mb-3" key={post.id}>
                            <Link href={`/posts/${post.id}`}>{post.title}</Link>
                        </li>
                    ))
                }
            </li>
        </ul>
    </main>
}
export default Page;