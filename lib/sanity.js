import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  apiVersion: '2024-03-11',
  useCdn: false,
});

export const getGraphData = async () => {
  try {
    const [synapseNodes, projects, experiences] = await Promise.all([
      sanityClient.fetch(`*[_type == "synapseNode"]{
        _id,
        label,
        level,
        parentNode->{_id, label},
        linkedContent->{
          _type,
          _id,
          title,
          projectTitle,
          experienceTitle
        }
      }`),
      sanityClient.fetch(`*[_type == "project"]{
        _id,
        projectTitle,
        role,
        projectSummary,
        challenge,
        solution,
        results,
        coverMedia,
        techStack,
        relatedLinks
      }`),
      sanityClient.fetch(`*[_type == "experience"]{
        _id,
        experienceTitle,
        category,
        description,
        relatedImages
      }`)
    ]);

    return {
      synapseNodes,
      projects,
      experiences
    };
  } catch (error) {
    console.error('Failed to fetch graph data:', error);
    return {
      synapseNodes: [],
      projects: [],
      experiences: []
    };
  }
};
