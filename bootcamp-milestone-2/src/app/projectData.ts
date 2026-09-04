import connectDB from "../database/database";
import { getProjectModel } from "../database/projectSchema";

var projects

export default getProjects;

export async function getProjects() {
  try {
    const Project = getProjectModel(await connectDB(false));
    // query for all blogs and sort by date (newest first)
    const projectResults = await Project.find().sort({ date: -1 }).orFail();
    console.log("projectresults " + projectResults);
    return projectResults;
  } catch (err: any) {
    console.log("error: " +err?.message);
    return [];
  }
}

/*
export async function getProject(slug: string) {
  projects = await getProjects()
  return projects.find(b => b.slug === slug);
}
*/
