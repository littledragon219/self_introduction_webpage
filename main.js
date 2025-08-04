const sanityClient = window.SanityClient.createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  apiVersion: '2024-03-11',
  useCdn: false,
});

async function getGraphData() {
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
}

function processDataForGraph(data) {
  const { synapseNodes, projects, experiences } = data;
  const nodes = [];
  const links = [];

  const centerNode = {
    id: 'center',
    label: '曾德荣',
    type: 'center',
    level: 0,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };
  nodes.push(centerNode);

  const contentMap = {};
  projects.forEach(project => {
    contentMap[project._id] = {
      type: 'project',
      ...project
    };
  });
  experiences.forEach(experience => {
    contentMap[experience._id] = {
      type: 'experience',
      ...experience
    };
  });

  const nodeMap = {};
  synapseNodes.forEach(node => {
    const processedNode = {
      id: node._id,
      label: node.label,
      type: 'synapse',
      level: node.level || 1,
      parentId: node.parentNode?._id || 'center',
      content: node.linkedContent ? contentMap[node.linkedContent._id] : null
    };
    nodes.push(processedNode);
    nodeMap[node._id] = processedNode;
  });

  nodes.forEach(node => {
    if (node.parentId && node.parentId !== 'center') {
      const parent = nodeMap[node.parentId];
      if (parent) {
        links.push({
          source: node.parentId,
          target: node.id
        });
      }
    } else if (node.type === 'synapse' && node.level === 1) {
      links.push({
        source: 'center',
        target: node.id
      });
    }
  });

  return { nodes, links };
}

class CognitiveSynapse {
  constructor(containerSelector, data) {
    this.container = d3.select(containerSelector);
    this.data = data;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    this.activeNodes = new Set();
    this.expandedNodes = new Set(['center']);
    this.cardVisible = false;

    this.init();
  }

  init() {
    this.svg = this.container.append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.linkGroup = this.svg.append('g').attr('class', 'links');
    this.nodeGroup = this.svg.append('g').attr('class', 'nodes');

    this.simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force('collision', d3.forceCollide().radius(30));

    this.updateGraph();
  }

  getVisibleNodes() {
    const visibleNodes = [];
    const visibleLinks = [];

    this.data.nodes.forEach(node => {
      if (node.type === 'center' || this.expandedNodes.has(node.parentId)) {
        visibleNodes.push(node);
      }
    });

    this.data.links.forEach(link => {
      const sourceVisible = visibleNodes.some(n => n.id === (typeof link.source === 'object' ? link.source.id : link.source));
      const targetVisible = visibleNodes.some(n => n.id === (typeof link.target === 'object' ? link.target.id : link.target));
      if (sourceVisible && targetVisible) {
        visibleLinks.push(link);
      }
    });

    return { nodes: visibleNodes, links: visibleLinks };
  }

  updateGraph() {
    const { nodes, links } = this.getVisibleNodes();

    const link = this.linkGroup.selectAll('line')
      .data(links);

    link.exit().remove();
    
    const linkEnter = link.enter().append('line')
      .attr('stroke', '#E2E8F0')
      .attr('stroke-width', 2)
      .attr('opacity', 0);

    linkEnter.transition()
      .duration(500)
      .attr('opacity', 0.6);

    const node = this.nodeGroup.selectAll('g')
      .data(nodes);

    node.exit()
      .transition()
      .duration(300)
      .attr('transform', 'scale(0)')
      .remove();

    const nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', 'scale(0)')
      .style('cursor', 'pointer');

    nodeEnter.append('circle')
      .attr('r', d => d.type === 'center' ? 25 : 15)
      .attr('fill', d => d.type === 'center' ? '#4285F4' : '#FFFFFF')
      .attr('stroke', '#4285F4')
      .attr('stroke-width', 2);

    nodeEnter.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('fill', d => d.type === 'center' ? '#FFFFFF' : '#1A202C')
      .attr('font-size', d => d.type === 'center' ? '12px' : '10px')
      .attr('font-weight', '600')
      .text(d => d.label.length > 8 ? d.label.substring(0, 8) + '...' : d.label);

    nodeEnter.transition()
      .duration(500)
      .attr('transform', 'scale(1)');

    const allNodes = nodeEnter.merge(node);

    allNodes.on('click', (event, d) => {
      event.stopPropagation();
      this.handleNodeClick(d);
    });

    allNodes.on('mouseenter', (event, d) => {
      d3.select(event.currentTarget)
        .transition()
        .duration(200)
        .attr('transform', 'scale(1.2)');
    });

    allNodes.on('mouseleave', (event, d) => {
      d3.select(event.currentTarget)
        .transition()
        .duration(200)
        .attr('transform', 'scale(1)');
    });

    this.simulation.nodes(nodes);
    this.simulation.force('link').links(links);
    this.simulation.alpha(0.3).restart();

    this.simulation.on('tick', () => {
      this.linkGroup.selectAll('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      this.nodeGroup.selectAll('g')
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });
  }

  handleNodeClick(node) {
    if (node.type === 'center') {
      document.getElementById('intro-text').style.opacity = '0';
      this.expandFirstLevel();
    } else if (node.content) {
      this.showContentCard(node.content);
    } else if (!this.expandedNodes.has(node.id)) {
      this.expandedNodes.add(node.id);
      this.updateGraph();
    }
  }

  expandFirstLevel() {
    const firstLevelNodes = this.data.nodes.filter(n => n.level === 1);
    firstLevelNodes.forEach(node => {
      this.expandedNodes.add(node.id);
    });
    this.updateGraph();
  }

  showContentCard(content) {
    if (this.cardVisible) return;
    
    this.cardVisible = true;
    
    this.svg.transition()
      .duration(300)
      .style('filter', 'blur(4px)')
      .style('transform', 'scale(0.95)');

    const cardContainer = document.getElementById('card-container');
    cardContainer.style.pointerEvents = 'auto';
    
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 transform scale-0 transition-transform duration-300';
    
    let cardContent = '';
    if (content.type === 'project') {
      cardContent = `
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-2xl font-header font-bold text-brand-text">${content.projectTitle || 'Project'}</h2>
            <button id="close-card" class="text-brand-text/50 hover:text-brand-text transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="text-brand-accent font-medium mb-3">${content.role || ''}</div>
          <p class="text-brand-text/80 mb-4">${content.projectSummary || ''}</p>
          ${content.techStack ? `<div class="flex flex-wrap gap-2 mb-4">
            ${content.techStack.map(tech => `<span class="px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full text-sm">${tech}</span>`).join('')}
          </div>` : ''}
          <div class="space-y-3">
            ${content.challenge ? `<div><strong class="text-brand-text">挑战:</strong> <span class="text-brand-text/80">${content.challenge}</span></div>` : ''}
            ${content.solution ? `<div><strong class="text-brand-text">解决方案:</strong> <span class="text-brand-text/80">${content.solution}</span></div>` : ''}
            ${content.results ? `<div><strong class="text-brand-text">成果:</strong> <span class="text-brand-text/80">${content.results}</span></div>` : ''}
          </div>
        </div>
      `;
    } else if (content.type === 'experience') {
      cardContent = `
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-2xl font-header font-bold text-brand-text">${content.experienceTitle || 'Experience'}</h2>
            <button id="close-card" class="text-brand-text/50 hover:text-brand-text transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="text-brand-accent font-medium mb-3">${content.category || ''}</div>
          <p class="text-brand-text/80">${content.description || ''}</p>
        </div>
      `;
    }

    card.innerHTML = cardContent;
    cardContainer.appendChild(card);
    
    setTimeout(() => {
      card.classList.remove('scale-0');
      card.classList.add('scale-100');
    }, 50);

    document.getElementById('close-card').addEventListener('click', () => {
      this.hideContentCard();
    });

    document.addEventListener('click', (e) => {
      if (e.target === cardContainer) {
        this.hideContentCard();
      }
    });
  }

  hideContentCard() {
    if (!this.cardVisible) return;

    const cardContainer = document.getElementById('card-container');
    const card = cardContainer.querySelector('div');
    
    card.classList.remove('scale-100');
    card.classList.add('scale-0');
    
    setTimeout(() => {
      cardContainer.innerHTML = '';
      cardContainer.style.pointerEvents = 'none';
      this.cardVisible = false;
    }, 300);

    this.svg.transition()
      .duration(300)
      .style('filter', 'none')
      .style('transform', 'scale(1)');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const loadingIndicator = document.getElementById('loading-indicator');
  const introText = document.getElementById('intro-text');
  
  loadingIndicator.classList.remove('hidden');
  introText.style.display = 'none';

  try {
    const graphData = await getGraphData();
    const processedData = processDataForGraph(graphData);
    
    loadingIndicator.classList.add('hidden');
    introText.style.display = 'block';
    
    new CognitiveSynapse('#graph-container', processedData);
  } catch (error) {
    console.error('Failed to initialize cognitive synapse:', error);
    loadingIndicator.innerHTML = '<p class="text-red-500">加载失败，请刷新页面重试</p>';
  }
});
