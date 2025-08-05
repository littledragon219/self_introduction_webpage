import * as framerMotion from 'https://esm.run/framer-motion';

const { animate } = framerMotion;

let simulation;
let handleNodeClickCallback;
const graphContainer = document.getElementById('graph-container');

function createSvgLines() {
    let svg = d3.select(graphContainer).select("svg");
    if (svg.empty()) {
        svg = d3.select(graphContainer).append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .style("position", "absolute")
            .style("top", 0)
            .style("left", 0)
            .style("z-index", -1);
    }
    return svg;
}

export function initGraph(nodeClickHandler) {
    handleNodeClickCallback = nodeClickHandler;

    const width = graphContainer.clientWidth;
    const height = graphContainer.clientHeight;

    simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(d => d.id).distance(120).strength(0.5))
        .force("charge", d3.forceManyBody().strength(-800))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05));

    createSvgLines();

    simulation.on("tick", () => {
        d3.select(graphContainer).selectAll('.node')
            .style('left', d => `${d.x}px`)
            .style('top', d => `${d.y}px`);

        d3.select(graphContainer).select('svg').selectAll('line')
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
    });
}

export function updateGraph(nodes, links) {

    const linkSelection = d3.select(graphContainer).select('svg').selectAll('line')
        .data(links, d => `${d.source.id || d.source}-${d.target.id || d.target}`);

    linkSelection.exit().remove();

    const linkEnter = linkSelection.enter().append('line')
        .attr('stroke', '#4285F4')
        .attr('stroke-opacity', 0)
        .attr('stroke-width', 1.5);
    
    animate(linkEnter.nodes(), { strokeOpacity: 0.4 }, { duration: 0.5 });


    const nodeSelection = d3.select(graphContainer).selectAll('.node')
        .data(nodes, d => d.id);

    nodeSelection.exit().each(function(d) {
        animate(this, { scale: 0, opacity: 0 }, { duration: 0.5 }).then(() => this.remove());
    });

    const nodeEnter = nodeSelection.enter().append('div')
        .attr('class', d => `node ${d.level === 0 ? 'breathing' : ''}`)
        .on('click', (event, d) => {
            event.stopPropagation();
            handleNodeClickCallback(d);
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    nodeEnter.append('div')
        .attr('class', 'node-label')
        .text(d => d.label);

    nodeEnter.style('transform', 'scale(0)');
    nodeEnter.style('opacity', '0');

    animate(nodeEnter.nodes(), 
        { scale: 1, opacity: 1 }, 
        { type: 'spring', stiffness: 300, damping: 20 }
    );
    
    nodeSelection.merge(nodeEnter)
        .style('width', d => `${d.size}px`)
        .style('height', d => `${d.size}px`);

    simulation.nodes(nodes);
    simulation.force("link").links(links);
    simulation.alpha(1).restart();
}


function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
