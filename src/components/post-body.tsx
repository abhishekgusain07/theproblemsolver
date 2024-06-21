const PostBody = async({postId}:{postId: number}) => {
    const response = await fetch(`https://dummyjson.com/posts/${postId}`)
    const post = await  response.json();
    return (
        <>
        <h1 className="text-5xl font-semibold mb-7">{post.title}</h1>
        <p className="max-w-[700px] mx-auto"> {post.body}</p>
        </>
        
    )
}
export default PostBody;