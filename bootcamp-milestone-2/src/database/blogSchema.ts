import { Schema, type Connection, type Model } from "mongoose";

type Blog = {
  title: string;
  date: Date;
  description: string;
  image: string;
  imageAlt: string;
  slug: string;
  comments: IComment[];
};

export type IComment = {
  user: string;
  comment: string;
  time: Date;
};

const commentSchema = new Schema<IComment>({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  time: { type: Date, required: true, default: Date.now },
});

const blogSchema = new Schema<Blog>(
  {
    title: { type: String, required: true },
    date: { type: Date, required: false, default: Date.now },
    description: { type: String, required: true },
    image: { type: String, required: true },
    imageAlt: { type: String, required: true },
    slug: { type: String, required: true },
    comments: { type: [commentSchema], required: false, default: [] },
  },
  { collection: "Blogs" }
);

export const getBlogModel = (connection: Connection): Model<Blog> =>
  (connection.models.Blogs as Model<Blog> | undefined) ??
  connection.model<Blog>("Blogs", blogSchema);
