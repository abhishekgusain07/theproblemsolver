import { createPost } from "@/actions/actions";

export default async function Form() {
    return (
        <form
          action={createPost}
          className="flex flex-col max-w-[400px] mx-auto gap-2 my-10"
        >
          <input
            type="text"
            name="title"
            placeholder="Title for new post"
            className="border rounded px-3 h-10"
            required
          />
          <textarea
            name="body"
            placeholder="Body content for new post"
            className="border rounded px-3 py-2"
            rows={6}
            required
          />
          <input
            type="text"
            name="flairs"
            placeholder="Enter flairs, separated by commas"
            className="border rounded px-3 h-10"
          />
          <button className="h-10 bg-blue-500 px-5 rounded text-white">
            Submit
          </button>
        </form>
      );
}