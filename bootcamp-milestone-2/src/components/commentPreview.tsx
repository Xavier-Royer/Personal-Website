import type {IComment} from "@/src/database/blogSchema" 
{/* When we pass props, the name that we use to pass values
		is the key for the type
*/}
type CommentProps = {
    comment: IComment;
}


{/* Modularizing code into seperate functions is useful.
		Makes your code look nicer and allows for better readability.
	*/}
function parseCommentTime(time: Date){
    if (!time) return "Unknown";
    return time.toString();
}

function Comment({ comment }: CommentProps) {
    return (
        <div className="comment">
            <h3>{comment.user}</h3>
            <p>{comment.comment}</p>
            <div>{(comment.time.toDateString())}</div>
        </div>
    );
}

export default Comment;