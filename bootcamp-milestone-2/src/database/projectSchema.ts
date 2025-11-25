import mongoose, { Schema } from "mongoose";


// typescript type (can also be an interface)
type Project = {
    title: string;
    video: String;
    video_alt: String;
    description: string; // for preview
};


// mongoose schema 
const projectSchema = new Schema<Project>(
    {
        title: { type: String, required: true },
        video: { type: String, required: true, },
        video_alt: { type: String, required: true },
        description: { type: String, required: true }
    },
    { collection: "Projects" 
    }
)

// defining the collection and model
const Project = mongoose.models['Projects'] ||
    mongoose.model('Projects', projectSchema);

export default Project;