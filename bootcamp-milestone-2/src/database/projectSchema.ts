import { Schema, type Connection, type Model } from "mongoose";

type Project = {
  title: string;
  video: string;
  video_alt: string;
  description: string;
};

const projectSchema = new Schema<Project>(
  {
    title: { type: String, required: true },
    video: { type: String, required: true },
    video_alt: { type: String, required: true },
    description: { type: String, required: true },
  },
  { collection: "Projects" }
);

export const getProjectModel = (connection: Connection): Model<Project> =>
  (connection.models.Projects as Model<Project> | undefined) ??
  connection.model<Project>("Projects", projectSchema);
