'use client';

import { useEffect, useRef, useState } from 'react';
import { projectData, Node, NodeContent } from '../data';

interface Link {
  source: Node;
  target: Node;
}

export default function CognitiveSynapseGraph({onNodeClick}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [lastPanOffset, setLastPanOffset] = useState({ x: 0, y: 0 });
  const [visibleNodes, setVisibleNodes] = useState(new Set(['center']));
  const [expandedNodes, setExpandedNodes] = useState(new Set<string>());
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);

  // 调试初始状态
  console.log('初始可见节点:', Array.from(visibleNodes));
  console.log('初始展开节点:', Array.from(expandedNodes));

  // 初始化数据
  useEffect(() => {
    const allNodes: Node[] = [
      { ...projectData.center, radius: 60 },
      ...projectData.categories.map(cat => ({ ...cat, radius: 50 })),
      ...projectData.projects.map(proj => ({ ...proj, radius: 40 }))
    ];
    console.log('初始化节点数据:', allNodes.length, '个节点');
    console.log('中心节点:', projectData.center);
    console.log('分类节点:', projectData.categories.length, '个');
    console.log('项目节点:', projectData.projects.length, '个');
    
    setNodes(calculatePositions(allNodes));
    const allLinks: Link[] = [
      ...projectData.categories.map(cat => ({
        source: projectData.center,
        target: cat
      })),
      ...projectData.projects.map(proj => {
        const parent = allNodes.find(n => n.id === proj.parent);
        return parent ? { source: parent, target: proj } : null;
      }).filter(Boolean) as Link[]
    ];
    console.log('初始化连接数据:', allLinks.length, '个连接');
    setLinks(allLinks);
  }, []);

  // 修正后的 calculatePositions
  const calculatePositions = (nodes: Node[]) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    console.log('屏幕中心位置:', centerX, centerY);
    
    const newNodes = nodes.map(node => ({ ...node }));
    // 中心节点
    const centerNode = newNodes.find(n => n.id === 'center');
    if (centerNode) {
      centerNode.x = centerX;
      centerNode.y = centerY;
      console.log('中心节点位置:', centerNode.x, centerNode.y);
    }
    // 一级节点
    const categories = newNodes.filter(n => n.type === 'category');
    const categoryRadius = 200;
    const angleStep = (2 * Math.PI) / categories.length;
    categories.forEach((category, index) => {
      const angle = index * angleStep;
      category.x = centerX + categoryRadius * Math.cos(angle);
      category.y = centerY + categoryRadius * Math.sin(angle);
      console.log(`分类节点 ${category.id} 位置:`, category.x, category.y);
    });
    // 二级节点
    categories.forEach(category => {
      const projects = newNodes.filter(n => n.parent === category.id);
      if (projects.length > 0) {
        const projectRadius = 150;
        const projectAngleStep = (2 * Math.PI) / projects.length;
        projects.forEach((project, index) => {
          const angle = index * projectAngleStep;
          project.x = category.x! + projectRadius * Math.cos(angle);
          project.y = category.y! + projectRadius * Math.sin(angle);
          console.log(`项目节点 ${project.id} 位置:`, project.x, project.y);
        });
      }
    });
    return newNodes;
  };

  // 渲染Canvas
  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置Canvas尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log('Canvas尺寸:', canvas.width, 'x', canvas.height);

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制连接线 - 赛博义体风格
    ctx.strokeStyle = '#00FF41';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.6;
    ctx.shadowColor = '#00FF41';
    ctx.shadowBlur = 5;

    links.forEach(link => {
      const sourceVisible = visibleNodes.has(link.source.id);
      const targetVisible = visibleNodes.has(link.target.id);
      
      if (sourceVisible && targetVisible) {
        const sourceNode = nodes.find(n => n.id === link.source.id);
        const targetNode = nodes.find(n => n.id === link.target.id);
        
        if (sourceNode && targetNode) {
          const startX = sourceNode.x! + panOffset.x;
          const startY = sourceNode.y! + panOffset.y;
          const endX = targetNode.x! + panOffset.x;
          const endY = targetNode.y! + panOffset.y;
          
          // 绘制发光连接线
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
          
          // 添加数据流效果
          const time = Date.now() * 0.001;
          const dashLength = 20;
          const dashGap = 10;
          const dashOffset = (time * 50) % (dashLength + dashGap);
          
          ctx.setLineDash([dashLength, dashGap]);
          ctx.lineDashOffset = -dashOffset;
          ctx.strokeStyle = '#00FF41';
          ctx.globalAlpha = 0.3;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
          
          ctx.setLineDash([]);
          ctx.globalAlpha = 0.6;
        }
      }
    });

    // 绘制节点 - 赛博义体风格
    let renderedNodes = 0;
    nodes.forEach(node => {
      if (!visibleNodes.has(node.id)) return;
      renderedNodes++;
      
      const x = node.x! + panOffset.x;
      const y = node.y! + panOffset.y;
      
      // 根据节点类型设置不同的样式
      let fillColor, strokeColor, glowIntensity;
      
      if (node.type === 'center') {
        // 中心节点 - 最强发光效果
        fillColor = 'rgba(0, 255, 65, 0.9)';
        strokeColor = '#00FF41';
        glowIntensity = 20;
      } else if (node.type === 'category') {
        // 分类节点 - 中等发光效果
        fillColor = 'rgba(0, 255, 65, 0.6)';
        strokeColor = '#00FF41';
        glowIntensity = 15;
      } else {
        // 项目/经历节点 - 较弱发光效果
        fillColor = 'rgba(0, 255, 65, 0.4)';
        strokeColor = '#00FF41';
        glowIntensity = 10;
      }
      
      // 节点发光效果
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, node.radius);
      gradient.addColorStop(0, fillColor);
      gradient.addColorStop(0.7, fillColor.replace('0.9', '0.3').replace('0.6', '0.2').replace('0.4', '0.1'));
      gradient.addColorStop(1, 'rgba(0, 255, 65, 0.1)');
      
      ctx.fillStyle = gradient;
      ctx.shadowColor = '#00FF41';
      ctx.shadowBlur = glowIntensity;
      ctx.beginPath();
      ctx.arc(x, y, node.radius, 0, 2 * Math.PI);
      ctx.fill();
      
      // 节点边框
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(x, y, node.radius, 0, 2 * Math.PI);
      ctx.stroke();
      
      // 节点文字
      ctx.fillStyle = '#00FF41';
      ctx.font = node.type === 'center' ? 'bold 14px Arial' : '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#00FF41';
      ctx.shadowBlur = 3;
      
      // 文字换行处理
      const text = node.label.length > 8 ? node.label.substring(0, 8) + '...' : node.label;
      ctx.fillText(text, x, y);
      
      // 为分类节点添加展开/收缩指示器
      if (node.type === 'category') {
        ctx.fillStyle = '#00FF41';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        if (expandedNodes.has(node.id)) {
          ctx.fillText('-', x + node.radius - 8, y - node.radius + 8);
        } else {
          ctx.fillText('+', x + node.radius - 8, y - node.radius + 8);
        }
      }
      
      // 重置阴影
      ctx.shadowBlur = 0;
    });
    console.log('渲染节点数量:', renderedNodes);
  };

  // 获取点击的节点
  const getNodeAtPosition = (x: number, y: number): Node | null => {
    return nodes.find(node => {
      if (!visibleNodes.has(node.id)) return false;
      
      const adjustedX = node.x! + panOffset.x;
      const adjustedY = node.y! + panOffset.y;
      const distance = Math.sqrt((x - adjustedX) ** 2 + (y - adjustedY) ** 2);
      return distance <= node.radius!;
    }) || null;
  };

  // 处理节点点击
  const handleNodeClick = (node: Node) => {
    if (node.type === 'center') {
      // 展开第一级
      const newVisibleNodes = new Set(['center']);
      projectData.categories.forEach(cat => newVisibleNodes.add(cat.id));
      setVisibleNodes(newVisibleNodes);
    } else if (node.type === 'category') {
      // 切换展开/收缩
      if (expandedNodes.has(node.id)) {
        // 收缩
        const newExpandedNodes = new Set(expandedNodes);
        newExpandedNodes.delete(node.id);
        setExpandedNodes(newExpandedNodes);
        const newVisibleNodes = new Set(visibleNodes);
        projectData.projects.forEach(proj => {
          if (proj.parent === node.id) {
            newVisibleNodes.delete(proj.id);
          }
        });
        setVisibleNodes(newVisibleNodes);
      } else {
        // 展开
        const newExpandedNodes = new Set(expandedNodes);
        newExpandedNodes.add(node.id);
        setExpandedNodes(newExpandedNodes);
        const newVisibleNodes = new Set(visibleNodes);
        projectData.projects.forEach(proj => {
          if (proj.parent === node.id) {
            newVisibleNodes.add(proj.id);
          }
        });
        setVisibleNodes(newVisibleNodes);
      }
    } else if (node.type === 'project' || node.type === 'experience') {
      // 处理项目/经历节点点击 - 显示详情卡片
      if (node.content) {
        onNodeClick(node.content);
      }
    }
  };

  // 鼠标事件处理
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const clickedNode = getNodeAtPosition(x, y);
    if (clickedNode) {
      handleNodeClick(clickedNode);
    } else {
      setIsDragging(true);
      setDragStart({ x, y });
      setLastPanOffset({ ...panOffset });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (isDragging) {
      const deltaX = x - dragStart.x;
      const deltaY = y - dragStart.y;
      setPanOffset({
        x: lastPanOffset.x + deltaX,
        y: lastPanOffset.y + deltaY
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 依赖 visibleNodes/expandedNodes/panOffset/nodes 时，只 render，不 setNodes
  useEffect(() => {
    render();
  }, [visibleNodes, expandedNodes, panOffset, nodes]);

  // 只在窗口resize时 setNodes
  useEffect(() => {
    const handleResize = () => {
      if (nodes.length > 0) {
        setNodes(calculatePositions(nodes));
      }
      render();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [nodes]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 cursor-grab"
      style={{ 
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: 20,
        pointerEvents: 'auto'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
}
