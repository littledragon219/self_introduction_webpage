'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import { projectData, Node, NodeContent } from '../data';

interface CognitiveSynapseGraphProps {
  onNodeClick: (content: NodeContent) => void;
}

const CognitiveSynapseGraph: React.FC<CognitiveSynapseGraphProps> = ({ onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 清空现有内容
    svg.selectAll("*").remove();

    // 创建力导向图
    const simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // 准备数据
    const nodes = [
      // 中心节点
      {
        id: projectData.center.id,
        label: projectData.center.label,
        type: projectData.center.type,
        radius: 20,
        color: '#007BFF',
      },
      // 一级节点（分类）
      ...projectData.categories.map(category => ({
        id: category.id,
        label: category.label,
        type: category.type,
        parent: category.parent,
        radius: 15,
        color: '#6C757D',
      })),
      // 二级节点（项目）
      ...projectData.projects.map(project => ({
        id: project.id,
        label: project.label,
        type: project.type,
        parent: project.parent,
        radius: 10,
        color: '#ADB5BD',
      }))
    ];

    const links = [
      // 中心到一级节点的连接
      ...projectData.categories.map(category => ({
        source: category.parent!,
        target: category.id,
      })),
      // 一级到二级节点的连接
      ...projectData.projects.map(project => ({
        source: project.parent!,
        target: project.id,
      }))
    ];

    // 创建连接线
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#007BFF")
      .attr("stroke-width", 2)
      .attr("stroke-opacity", 0.6);

    // 创建节点
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .enter().append("g")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("click", handleNodeClick);

    // 添加节点圆圈
    node.append("circle")
      .attr("r", (d: any) => d.radius)
      .attr("fill", (d: any) => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // 添加节点文字
    node.append("text")
      .text((d: any) => d.label)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "#fff")
      .attr("font-size", "12px")
      .attr("font-weight", "bold");

    // 设置模拟
    simulation
      .nodes(nodes as any)
      .on("tick", ticked);

    simulation.force<d3.ForceLink<any, any>>("link")!
      .links(links);

    function ticked() {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    }

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    function handleNodeClick(event: any, d: any) {
      // 找到对应的项目数据
      const projectNode = projectData.projects.find(p => p.id === d.id);
      const categoryNode = projectData.categories.find(c => c.id === d.id);
      
      if (projectNode?.content) {
        onNodeClick(projectNode.content);
      } else if (categoryNode?.content) {
        onNodeClick(categoryNode.content);
      }
    }

    // 清理函数
    return () => {
      simulation.stop();
    };
  }, [isClient, onNodeClick]);

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载网络图...</p>
        </div>
      </div>
    );
  }

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
};

export default CognitiveSynapseGraph;
