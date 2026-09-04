import ProjectPreview from '@/src/components/projectPreview';
import _blogs from '../blogData';
import getProjects from '../projectData';

// Project data comes from MongoDB and must be fetched at request time on Vercel.
export const dynamic = "force-dynamic";

export default async function Project() {
  const projects = await getProjects();
  console.log("test");
  console.log(projects);
  return (
    
    <main className="project-background">
    <div id = "projects"> 
    
    {projects.map(project => 
      <ProjectPreview 
        key={project.title} 
        title = {project.title}
        video={project.video}
        video_alt= {project.video_alt}
        description={project.description}
      />
      )}
    </div>
    </main>
    )
}
