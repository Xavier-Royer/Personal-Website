// db.ts
import mongoose from "mongoose";
import Project from "../database/projectSchema";
import Blog from "./blogSchema";
//import { IComment } from "./blogSchema";

const blog_url: string = process.env.MONGO_URI_BLOG as string;
const project_url: string = process.env.MONGO_URI_PROJECT as string;
let connection: typeof mongoose;
import { ObjectId, UpdateFilter } from 'mongodb';

interface IComment { user: string; comment: string; time: Date }
interface IBlog {  
  title: string;
  date: Date;
  description: string; // for preview
  image: string; // url for string in public
  image_alt: string; // alt for image
  slug: string; 
  comments: IComment[]; // array for comments }
}


/**
 * Makes a connection to a MongoDB database. If a connection already exists, does nothing
 * Call this function at the start of api routes and data fetches
 * @returns {Promise<typeof mongoose>}
 */
const connectDB = async (blogs = true) => {
  console.log("Connecting to database...");
  if (!connection) {
    //if (blogs){
    connection = await mongoose.connect(blog_url);
    //}
    //else{
    //  connection = await mongoose.connect(project_url);
    //}
    
    console.log("db:", mongoose.connection.name);          // BlogsDB
    //console.log("collection:", Project.collection.name);      // Blogs
    //console.log("count:", await Project.countDocuments({}));  // should be 3

    return connection;
  }
};


async function insertComment(comment: IComment, blogName: string) {
        try {
            await connectDB(true);
            //const result = await db.collection('blogs').updateOne(filter,{ $push: { comments: comment } });
            
            //const //result = await mongoose.connection.collection('blogs')
            const result = await mongoose.connection.collection('Blogs').updateOne({ slug: blogName },{ $push: { comments: comment } as UpdateFilter<IBlog> });
            
            //const result = await Blog.updateOne({ name: blogName },{ $push: { comments: comment } });
            //const result = await Project.collection.updateOne({ name: "Charlie" },{ $set: { age: 28 } }, { upsert: true });
            //const result = await Project.collection.insertOne(comment);
            //console.log(`Inserted ${result.insertedCount} documents`);
            return result;
        } catch (error) {
            console.error("Error inserting documents:", error);
        }
      }
export { insertComment };

export default connectDB;
