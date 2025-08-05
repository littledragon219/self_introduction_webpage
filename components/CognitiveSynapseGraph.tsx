'use client';

import { useEffect, useRef, useState } from 'react';
import { projectData, Node, NodeContent } from '../data';

interface Link {
  source: Node;
  target: Node;
}

export default function CognitiveSynapseGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [lastPanOffset, setLastPanOffset] = useState({ x: 0, y: 0 });
  const [visibleNodes, setVisibleNodes] = useState(new Set(['center']));
  const [expandedNodes, setExpandedNodes] = useState(new Set<string>());
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);

  // 初始化数据
  useEffect(() => {
    const allNodes: Node[] = [
      { ...projectData.center, radius: 60 },
      ...projectData.categories.map(cat => ({ ...cat, radius: 50 })),
      ...projectData.projects.map(proj => ({ ...proj, radius: 40 }))
    ];

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

    setNodes(allNodes);
    setLinks(allLinks);
  }, []);

  // 计算节点位置
  const calculatePositions = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // 中心节点
    const centerNode = nodes.find(n => n.id === 'center');
    if (centerNode) {
      centerNode.x = centerX;
      centerNode.y = centerY;
    }

    // 一级节点（分类）
    const categories = nodes.filter(n => n.type === 'category');
    const categoryRadius = 200;
    const angleStep = (2 * Math.PI) / categories.length;
    
    categories.forEach((category, index) => {
      const angle = index * angleStep;
      category.x = centerX + categoryRadius * Math.cos(angle);
      category.y = centerY + categoryRadius * Math.sin(angle);
    });

    // 二级节点（项目）
    categories.forEach(category => {
      const projects = nodes.filter(n => n.parent === category.id);
      if (projects.length > 0) {
        const projectRadius = 150;
        const projectAngleStep = (2 * Math.PI) / projects.length;
        
        projects.forEach((project, index) => {
          const angle = index * projectAngleStep;
          project.x = category.x! + projectRadius * Math.cos(angle);
          project.y = category.y! + projectRadius * Math.sin(angle);
        });
      }
    });
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

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制连接线
    ctx.strokeStyle = '#77AAB';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.6;

    links.forEach(link => {
      const sourceVisible = visibleNodes.has(link.source.id);
      const targetVisible = visibleNodes.has(link.target.id);
      
      if (sourceVisible && targetVisible) {
        const sourceX = link.source.x! + panOffset.x;
        const sourceY = link.source.y! + panOffset.y;
        const targetX = link.target.x! + panOffset.x;
        const targetY = link.target.y! + panOffset.y;
        
        ctx.beginPath();
        ctx.moveTo(sourceX, sourceY);
        ctx.lineTo(targetX, targetY);
        ctx.stroke();
      }
    });

    ctx.globalAlpha = 1;

    // 绘制节点
    nodes.forEach(node => {
      if (!visibleNodes.has(node.id)) return;

      const adjustedX = node.x! + panOffset.x;
      const adjustedY = node.y! + panOffset.y;

      // 绘制节点圆圈
      ctx.beginPath();
      ctx.arc(adjustedX, adjustedY, node.radius!, 0, 2 * Math.PI);

      if (node.type === 'center') {
        // 核心节点
        ctx.fillStyle = 'rgba(60, 110, 113, 0.5)';
        ctx.fill();
        ctx.strokeStyle = '#E0FFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 外发光效果
        ctx.shadowColor = '#E0FFFF';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      } else if (node.type === 'category') {
        // 分类节点
        ctx.fillStyle = 'rgba(60, 110, 113, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#77AAB';
        ctx.lineWidth = 1;
        ctx.stroke();

        // 绘制展开/收缩指示器
        if (expandedNodes.has(node.id)) {
          ctx.fillStyle = '#E0FFFF';
          ctx.font = 'bold 16px Helvetica Neue, Arial, sans-serif';
          ctx.fillText('-', adjustedX + node.radius! - 8, adjustedY - node.radius! + 8);
        } else {
          ctx.fillStyle = '#E0FFFF';
          ctx.font = 'bold 16px Helvetica Neue, Arial, sans-serif';
          ctx.fillText('+', adjustedX + node.radius! - 8, adjustedY - node.radius! + 8);
        }
      } else {
        // 项目节点
        ctx.fillStyle = 'rgba(60, 110, 113, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#77AAB';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 绘制文字
      if (node.type === 'center') {
        ctx.fillStyle = '#E0FFFF';
        ctx.font = 'bold 14px Helvetica Neue, Arial, sans-serif';
      } else {
        ctx.fillStyle = '#A4DDEE';
        ctx.font = 'normal 12px Helvetica Neue, Arial, sans-serif';
      }

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const text = node.label.length > 8 ? node.label.substring(0, 8) + '...' : node.label;
      ctx.fillText(text, adjustedX, adjustedY);
    });
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
        // 这里需要触发显示卡片的逻辑
        // 由于这是Canvas组件，我们需要通过props传递回调函数
        console.log('点击项目节点:', node.content);
        // 可以通过自定义事件或者props回调来显示卡片
        window.dispatchEvent(new CustomEvent('showNodeCard', { 
          detail: node.content 
        }));
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

  // 初始化和渲染
  useEffect(() => {
    calculatePositions();
    render();
  }, [nodes, visibleNodes, expandedNodes, panOffset]);

  // 窗口大小变化处理
  useEffect(() => {
    const handleResize = () => {
      calculatePositions();
      render();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 cursor-grab"
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
}
