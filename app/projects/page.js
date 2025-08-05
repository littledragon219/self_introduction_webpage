import { ProjectIcon } from '@/components/icons';
import { sanityClient } from '@/lib/sanity';

async function getProjects() {
  const query = `*[_type == "project"]{
    _id,
    title,
    role,
    description
  }`;
  try {
    const projects = await sanityClient.fetch(query);
    return projects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="bg-brand-background text-brand-text min-h-screen pt-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <ProjectIcon className="mx-auto h-12 w-12 text-brand-accent" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight font-header text-brand-text sm:text-6xl">
            Projects
          </h1>
          <p className="mt-6 text-lg leading-8 text-brand-text/80 font-body">
            A selection of projects where I transformed complex technologies into user-centric products.
          </p>
        </div>
        
        <div className="mx-auto mt-20 max-w-3xl space-y-16">
          {projects.map((project) => (
            <article key={project._id} className="relative isolate group">
              <h2 className="text-2xl font-semibold leading-8 text-brand-text group-hover:text-brand-accent font-header transition-colors">
                <a>
                  <span className="absolute inset-0 z-10" />
                  {project.title}
                </a>
              </h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-brand-accent font-body">
                {project.role}
              </p>
              <p className="mt-4 text-base leading-7 text-brand-text/80 font-body">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
