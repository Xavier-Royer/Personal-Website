import connectDB from "../database/database";
import Blog from "../database/blogSchema";
import blogSchema from "../database/blogSchema";

import { NextRequest, NextResponse } from 'next/server'
//import connectDB from "@/helpers/db"

/*type Blog = {
  title: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
  slug: string;
};
*/


/*= [
  {
    title: "Happy Birthday Dominic",
    date: "9/19/2025",
    description:
      "Here was my attempted college dorm kitchen cake for Dominic's 19th birthday! May it be a great year!",
    image: "/DominicsBday.png", // update file path images to public / image
    imageAlt: "Image of a birthday cake",
    slug: "birthday",
  },
  {
    title: "Pismo Beach Adventure",
    date: "10/11/2025",
    description:
      "A beautiful sunset at Pismo beach for my birthday weekend with friends!",
    image: "/PismoBeach.jpg",
    imageAlt: "Image of a sunset at pismo beach",
    slug: "pismobeach",
  },
  {
    title: "Running In France",
    date: "8/21/2025",
    description:
      "This summer I visited family in France and got to go on a lot of mountain runs with my uncle!",
    image: "/Runningpfp1.jpg",
    imageAlt: "Image of me running",
    slug: "running",
  },
];
*/
var blogs

export default getBlogs;

export async function getBlogs() {
  await connectDB(); // ensure DB connection

  try {
    // query for all blogs and sort by date (newest first)
    const blogResults = await Blog.find().sort({ date: -1 }).orFail();
    console.log("blogresults " + blogResults);
    return blogResults;
  } catch (err: any) {
    console.log("error: " +err?.message);
    return [];
  }
}



//old get blog function

export async function getBlog(slug: string) {
  blogs = await getBlogs()
  return blogs.find(b => b.slug === slug);
}
