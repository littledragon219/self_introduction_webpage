'use client';

import React, { useState, useEffect } from 'react';
import CognitiveSynapseGraph from '../components/CognitiveSynapseGraph';
import { NodeContent } from '../data';
import { X, Download, ExternalLink } from 'lucide-react';

export default function HomePage() {
  const [isBrowser, setIsBrowser] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [cardContent, setCardContent] = useState<NodeContent | null>(null);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const showCard = (content: NodeContent) => {
    setCardContent(content);
    setCardVisible(true);
  };

  const hideCard = () => {
    setCardVisible(false);
    setCardContent(null);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold text-gray-900">曾德荣</h1>
              <p className="text-sm text-gray-600">具身智能的产品构想家</p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/about" className="nav-link">关于我</a>
              <a href="/resume" className="nav-link">简历</a>
              <a 
                href="/resume.pdf" 
                download 
                className="btn-primary flex items-center space-x-2"
              >
                <Download size={16} />
                <span>下载简历</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="pt-16 h-screen">
        {/* 左侧信息面板 */}
        <div className="fixed left-8 top-24 z-40 max-w-sm">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">曾德荣</h2>
            <p className="text-lg text-gray-700 mb-4">具身智能的产品构想家</p>
            <p className="text-sm text-gray-600 mb-6">
              在物理世界与数字智能的交汇处，打造无缝的人机交互体验。专注于机器学习、计算机视觉和智能系统开发。
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">核心技能</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="tech-tag">机械工程</span>
                  <span className="tech-tag">人工智能</span>
                  <span className="tech-tag">ROS</span>
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">深度学习</span>
                  <span className="tech-tag">产品思维</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">项目概览</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">竞赛经历</p>
                    <p className="text-blue-600 font-medium">3+ 项</p>
                  </div>
                  <div>
                    <p className="text-gray-600">技术项目</p>
                    <p className="text-blue-600 font-medium">5+ 个</p>
                  </div>
                  <div>
                    <p className="text-gray-600">实习经历</p>
                    <p className="text-blue-600 font-medium">2+ 次</p>
                  </div>
                  <div>
                    <p className="text-gray-600">技能领域</p>
                    <p className="text-blue-600 font-medium">6+ 个</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 网络图区域 */}
        <div className="absolute inset-0 z-10">
          <CognitiveSynapseGraph onNodeClick={showCard} />
        </div>

        {/* 交互提示 */}
        <div className="fixed bottom-8 right-8 z-40">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              💡 点击节点探索项目详情
            </p>
          </div>
        </div>
      </main>

      {/* 详情卡片 */}
      {cardVisible && cardContent && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              hideCard();
            }
          }}
        >
          <div className="card p-8 slide-in max-w-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {cardContent.title}
                </h2>
                {cardContent.role && (
                  <p className="text-lg text-blue-600 font-medium">
                    {cardContent.role}
                  </p>
                )}
              </div>
              <button
                onClick={hideCard}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {cardContent.summary && (
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {cardContent.summary}
                </p>
              </div>
            )}

            {cardContent.challenge && (
              <div className="mb-6 p-4 rounded-lg border-l-4 border-yellow-400 bg-yellow-50">
                <h3 className="font-semibold text-gray-900 mb-2">挑战与背景</h3>
                <p className="text-gray-700">{cardContent.challenge}</p>
              </div>
            )}

            {cardContent.solution && (
              <div className="mb-6 p-4 rounded-lg border-l-4 border-green-400 bg-green-50">
                <h3 className="font-semibold text-gray-900 mb-2">解决方案与过程</h3>
                <p className="text-gray-700">{cardContent.solution}</p>
              </div>
            )}

            {cardContent.results && (
              <div className="mb-6 p-4 rounded-lg border-l-4 border-red-400 bg-red-50">
                <h3 className="font-semibold text-gray-900 mb-2">成果与反思</h3>
                <p className="text-gray-700">{cardContent.results}</p>
              </div>
            )}

            {cardContent.techStack && cardContent.techStack.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">技术栈</h3>
                <div className="flex flex-wrap gap-2">
                  {cardContent.techStack.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button 
                onClick={hideCard}
                className="btn-secondary"
              >
                关闭
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <ExternalLink size={16} />
                <span>了解更多</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}