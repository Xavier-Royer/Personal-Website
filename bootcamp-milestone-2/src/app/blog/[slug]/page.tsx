import blogs from "../../blogData";
import { getBlog } from "../../blogData";
import { notFound } from "next/navigation";
import Blog from "@/src/database/blogSchema";
import type { IComment } from "@/src/database/blogSchema";
import Comment from "@/src/components/commentPreview";
import AddComment from "@/src/components/AddComment";//"@/src/components/AddComment";

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  /*
  console.log("slug string: " + '/api/blog/' + slug) 
  const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`);
  const data = await res.json();        
  const blog = new Blog({ title: data.title, description: data.description, image: data.image, imagAlt: data.imagAlt});
  */

  const blog = await getBlog(slug);

  if (!blog) notFound();

  return (
    <main className="single-blog">
      <h1>{blog.title}</h1>
      <span className="post-container">
      <span className="image-container">
      <img src={blog.image} alt={blog.imageAlt} />
      </span>
      <span className="description-container">
      <div>{blog.description}</div>
      <div className="date">{(blog.date.toDateString())}</div>
      </span>
      </span>

      <h2>Comments:</h2>

      
        <div className="comment-section">
         
          {(blog.comments ?? []).map((comment: IComment, i: number) => (
            <Comment
              key={
                (comment as any)._id ??
                `${comment.user}-${i}-${(comment.time.toDateString())}`
              }
              comment={comment}
            />
          ))}
          
          <AddComment blogName={slug.toLowerCase()} />
        </div>
      
      
    </main>
  );
}
