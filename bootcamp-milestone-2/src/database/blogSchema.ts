import mongoose, { Schema } from "mongoose";

// typescript type (can also be an interface)
type Blog = {
	title: string;
	date: Date;
	description: string; // for preview
	image: string; // url for string in public
	image_alt: string; // alt for image
	slug: string; 
    comments: IComment[]; // array for comments
};

export type IComment = {
		user: string;
		comment: string;
		time: Date;
}

const commentSchema = new Schema<IComment>(
  {
    user:   { type: String, required: true },
    comment:{ type: String, required: true },
    time:   { type: Date,   required: true, default: Date.now },
  }
);


// mongoose schema 
const blogSchema = new Schema<Blog>(
    {
		title: { type: String, required: true },
		date: { type: Date, required: false, default: new Date()},
		description: { type: String, required: true },
		image: { type: String, required: true },
	    image_alt: { type: String, required: true },
		//content: { type: String, required: true },
        slug: { type: String, required: true },
		comments: { type: [commentSchema], required: false, default: [] },
		/*comments: [{ 
			user: { type: String, required: true },
			comment: { type: String, required: true },
			time: { type: Date, required: true, default: new Date() }
		}],*/
    },
    { collection: "Blogs" 
    }
)

// defining the collection and model
const BlogModel = mongoose.models['Blogs'] ||
    mongoose.model('Blogs', blogSchema);

export default BlogModel;