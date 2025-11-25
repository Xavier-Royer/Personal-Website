import BlogPreview from '@/src/components/blogPreview';
import _blogs from '../blogData';
import getBlogs from '../blogData';

export default async function Blog() {
  const blogs = await getBlogs();
  console.log("test");
  console.log(blogs);
  return (
    
    <main className="project-background">
    <div id = "blog-events"> 
    
    {blogs.map(blog => 
      <BlogPreview 
        key={blog.slug} 
        title = {blog.title}
        description={blog.description}
        image={blog.image}
        date={(blog.date)}
        slug ={blog.slug}
      />
	  )}
    </div>
    </main>
    )
}