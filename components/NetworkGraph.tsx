'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { networkData, projectDetails, NetworkNode, NetworkLink } from '../data';

// 扩展NetworkNode以兼容D3的SimulationNodeDatum
interface D3Node extends NetworkNode, d3.SimulationNodeDatum {
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface NetworkGraphProps {
  onNodeClick: (content: any) => void;
}

export default function NetworkGraph({ onNodeClick }: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [simulation, setSimulation] = useState<d3.Simulation<any, undefined> | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // 清除之前的SVG内容
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 转换数据为D3兼容格式
    const nodes: D3Node[] = networkData.nodes.map(node => ({ ...node }));
    const links = networkData.links.map(link => ({ ...link }));

    // 创建力导向模拟
    const sim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(60));

    setSimulation(sim);

    // 创建连接线
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#00FF41")
      .attr("stroke-width", 2)
      .style("filter", "drop-shadow(0 0 5px #00FF41)")
      .style("opacity", 0.6);

    // 创建节点组
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .enter().append("g")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // 添加节点圆圈
    node.append("circle")
      .attr("r", (d: D3Node) => d.level === 0 ? 40 : d.level === 1 ? 35 : 30)
      .attr("fill", (d: D3Node) => {
        if (d.level === 0) return "rgba(0, 255, 65, 0.9)";
        if (d.level === 1) return "rgba(0, 255, 65, 0.6)";
        return "rgba(0, 255, 65, 0.4)";
      })
      .attr("stroke", "#00FF41")
      .attr("stroke-width", 2)
      .style("filter", (d: D3Node) => {
        const glow = d.level === 0 ? 20 : d.level === 1 ? 15 : 10;
        return `drop-shadow(0 0 ${glow}px #00FF41)`;
      })
      .style("cursor", "pointer")
      .on("click", (event, d: D3Node) => {
        if (d.level === 2 && d.contentKey) {
          const content = projectDetails[d.contentKey as keyof typeof projectDetails];
          if (content) {
            onNodeClick(content);
          }
        }
      });

    // 添加节点文字
    node.append("text")
      .text((d: D3Node) => d.id)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "#00FF41")
      .style("font-size", (d: D3Node) => d.level === 0 ? "14px" : "12px")
      .style("font-weight", (d: D3Node) => d.level === 0 ? "bold" : "normal")
      .style("filter", "drop-shadow(0 0 3px #00FF41)")
      .style("pointer-events", "none");

    // 更新函数
    function ticked() {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    }

    // 拖拽函数
    function dragstarted(event: any, d: any) {
      if (!event.active) sim.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) sim.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // 启动模拟
    sim.on("tick", ticked);

    // 清理函数
    return () => {
      if (simulation) {
        simulation.stop();
      }
    };
  }, [onNodeClick]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 20 }}
    />
  );
} 