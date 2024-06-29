import { CommentType } from "@/lib/types/types";
import CommentCard from "./CommentCard";




const Comments = ({
    postId,
    comments
}:{
    postId: number;
    comments: CommentType[] | null
}) => {
    return (
        <div className="flex items-center">
          {
            (comments === null || comments?.length === 0) ? (
              <div className="flex items-center justify-center text-center text-sm md:text-lg font-semibold text-muted-foreground">
                No comments for this post
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-y-3 justify-center items-center text-center mb-4">
                  <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">Comments</h2>
                  {
                    comments.map((comment) => (
                      <div key={comment.id} className="w-[300px]">
                        <CommentCard comment={comment} />
                      </div>
                    ))
                  }
                </div> 
              </>

            )
          }
        </div>
    )   
}
export default Comments