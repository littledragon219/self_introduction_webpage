'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { projectData, Node, NodeContent } from '../data';

interface CognitiveSynapseGraphProps {
  onNodeClick: (content: NodeContent) => void;
}

const CognitiveSynapseGraph: React.FC<CognitiveSynapseGraphProps> = ({ onNodeClick }) => {
  const [ForceGraph2D, setForceGraph2D] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const fgRef = useRef<any>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // 客户端检查
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 动态导入 ForceGraph2D
  useEffect(() => {
    if (isClient) {
      import('react-force-graph').then((module) => {
        setForceGraph2D(() => module.ForceGraph2D);
      });
    }
  }, [isClient]);

  // 转换数据格式为react-force-graph需要的格式
  const graphData = {
    nodes: [
      // 中心节点
      {
        id: projectData.center.id,
        label: projectData.center.label,
        type: projectData.center.type,
        val: 20, // 节点大小
        color: '#007BFF', // 信号蓝
      },
      // 一级节点（分类）
      ...projectData.categories.map(category => ({
        id: category.id,
        label: category.label,
        type: category.type,
        parent: category.parent,
        val: 15,
        color: '#6C757D', // 炭黑
      })),
      // 二级节点（项目）
      ...projectData.projects.map(project => ({
        id: project.id,
        label: project.label,
        type: project.type,
        parent: project.parent,
        val: 10,
        color: '#ADB5BD', // 浅灰
      }))
    ],
    links: [
      // 中心到一级节点的连接
      ...projectData.categories.map(category => ({
        source: category.parent!,
        target: category.id,
        value: 1
      })),
      // 一级到二级节点的连接
      ...projectData.projects.map(project => ({
        source: project.parent!,
        target: project.id,
        value: 1
      }))
    ]
  };

  const handleNodeClick = useCallback((node: any) => {
    // 找到对应的项目数据
    const projectNode = projectData.projects.find(p => p.id === node.id);
    const categoryNode = projectData.categories.find(c => c.id === node.id);
    
    if (projectNode?.content) {
      onNodeClick(projectNode.content);
    } else if (categoryNode?.content) {
      onNodeClick(categoryNode.content);
    }
  }, [onNodeClick]);

  const handleNodeHover = useCallback((node: any | null) => {
    setHoveredNode(node?.id || null);
  }, []);

  const handleNodeDragEnd = useCallback((node: any) => {
    node.fx = node.x;
    node.fy = node.y;
  }, []);

  // 如果不在客户端或组件未加载，显示加载状态
  if (!isClient || !ForceGraph2D) {
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
    <div className="w-full h-full">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel="label"
        nodeColor="color"
        nodeVal="val"
        linkColor={() => '#007BFF'}
        linkWidth={2}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        onNodeDragEnd={handleNodeDragEnd}
        cooldownTicks={100}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.label;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Inter`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = node.color;
          ctx.fillText(label, node.x, node.y);
        }}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.1}
        enableNodeDrag={true}
        enableZoomInteraction={true}
        enablePanInteraction={true}
      />
    </div>
  );
};

export default CognitiveSynapseGraph;
