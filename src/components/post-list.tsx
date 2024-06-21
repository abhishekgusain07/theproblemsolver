import Link from "next/link";

interface Post {
    id: number;
    title: string;
    body: string;
}
const PostList = async() => {
    const response = await fetch("https://dummyjson.com/posts?limit=10")
    const data:{posts: Post[]} = await response.json()
    return (
        <ul>
            <li className="max-w-[700px] mx-auto">
                {
                    data.posts.map((post) => (
                        <li className="mb-3" key={post.id}>
                            <Link href={`/posts/${post.id}`}>{post.title}</Link>
                        </li>
                    ))
                }
            </li>
        </ul>
    )
}
export default PostList;