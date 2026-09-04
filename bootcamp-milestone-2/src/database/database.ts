import mongoose, { type Connection } from "mongoose";
import { type UpdateFilter } from "mongodb";

const blogUrl = process.env.MONGO_URI_BLOG;
const projectUrl = process.env.MONGO_URI_PROJECT;

type DatabaseKey = "blog" | "project";

const connections: Partial<Record<DatabaseKey, Promise<Connection>>> = {};

interface IComment {
  user: string;
  comment: string;
  time: Date;
}

interface IBlog {
  title: string;
  date: Date;
  description: string;
  image: string;
  image_alt: string;
  slug: string;
  comments: IComment[];
}

/** Returns a cached connection for the requested database only. */
const connectDB = (blogs = true): Promise<Connection> => {
  const key: DatabaseKey = blogs ? "blog" : "project";
  const databaseUrl = blogs ? blogUrl : projectUrl;

  if (!databaseUrl) {
    return Promise.reject(
      new Error(`The MONGO_URI_${blogs ? "BLOG" : "PROJECT"} environment variable is not configured.`)
    );
  }

  if (!connections[key]) {
    connections[key] = mongoose
      .createConnection(databaseUrl, { serverSelectionTimeoutMS: 10_000 })
      .asPromise()
      .then((connection) => {
        console.log(`Connected to ${key} database:`, connection.name);
        return connection;
      })
      .catch((error) => {
        delete connections[key];
        throw error;
      });
  }

  return connections[key]!;
};

async function insertComment(comment: IComment, blogName: string) {
  try {
    const connection = await connectDB(true);
    return await connection.collection("Blogs").updateOne(
      { slug: blogName },
      { $push: { comments: comment } as UpdateFilter<IBlog> }
    );
  } catch (error) {
    console.error("Error inserting comment:", error);
  }
}

export { insertComment };
export default connectDB;
