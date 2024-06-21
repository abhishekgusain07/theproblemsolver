import Link from "next/link";

const PostList = async() => {
    const response = await fetch("https://dummyjson.com/posts?limit=10")
    const data = await response.json()
    return (
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
    )
}
export default PostList;