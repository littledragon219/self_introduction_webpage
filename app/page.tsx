'use client';

import { useEffect, useState } from 'react';
import CognitiveSynapseGraph from '../components/CognitiveSynapseGraph';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [cardVisible, setCardVisible] = useState(false);
  const [cardContent, setCardContent] = useState(null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  // 直接作为props传递
  const showCard = (content: any) => {
    setCardContent(content);
    setCardVisible(true);
  };

  const hideCard = () => {
    setCardVisible(false);
    setCardContent(null);
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* 扫描线效果 */}
      <div className="scan-line"></div>
      
      {/* 矩阵雨效果 */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="matrix-rain"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          {String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))}
        </div>
      ))}

      {/* 赛博义体风格标题 */}
      <div className="fixed top-8 left-8 z-50 pointer-events-none">
        <h1 className="cyber-title text-4xl font-bold mb-2 glitch-effect">
          曾德荣
        </h1>
        <p className="text-sm text-cyan-300 opacity-80" style={{ textShadow: '0 0 5px var(--cyber-neon-green)' }}>
          身心合一的智造者
        </p>
      </div>

      {/* 测试按钮 - 用于调试 */}
      <button 
        onClick={() => {
          console.log('测试按钮被点击');
          showCard({
            title: '智能无损抓取机械臂',
            role: '项目负责人 (智能算法开发设计)',
            summary: '研发"触觉感知-柔性控制-特征迁移"三位一体系统，配合树莓派主控与舵机协同，开发动态闭环力控算法实时感知物体，以0.01N的力控分辨率实现精准控制达到智能无损抓取。',
            challenge: '传统工业机械臂在面对水果等易损、形态不一的物体时，极易造成损伤，泛化能力差。核心挑战在于如何让机械臂像人手一样，既"心中有数"（知道抓的是什么），又"手下有谱"（知道用多大力），并能快速适应未知物体。',
            solution: '感知层: 搭建了包含力控传感器的硬件系统，配合树莓派主控，开发动态闭环力控算法，实时感知物体形变。决策层: 设计了创新的"层级化原型网络"，它包含两级分类：第一级进行"域分类"（如苹果、橘子），第二级在域内进行"子域分类"（如成熟、未成熟）。泛化层: 结合"零样本推理"和"少样本微调"双模式。对于新水果，系统可直接进行零样本识别，极大提升了泛化能力和效率。',
            results: '成果: 力控分辨率达到0.01N，实现了对多种水果的智能、无损抓取。在2025年大学生创新大赛校赛中荣获银奖。反思: 这次经历让我深刻体会到，一个成功的智能产品是算法、硬件和用户场景的深度耦合。作为项目负责人，我不仅要设计算法，更要思考成本、可用性和未来的扩展性，这正是我对AI产品经理角色的初步探索。',
            techStack: ['力控算法', '原型网络', '零样本推理', '树莓派', 'ROS', 'Python']
          });
        }}
        className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded"
        style={{ zIndex: 9999 }}
      >
        测试弹窗
      </button>

      {/* 技能树可视化 */}
      <div className="fixed bottom-8 left-8 z-40 pointer-events-none">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30">
          <h3 className="cyber-title text-lg mb-3">核心技能</h3>
          <div className="flex flex-wrap gap-2">
            <span className="tech-tag text-xs">机械工程</span>
            <span className="tech-tag text-xs">人工智能</span>
            <span className="tech-tag text-xs">ROS</span>
            <span className="tech-tag text-xs">Python</span>
            <span className="tech-tag text-xs">深度学习</span>
            <span className="tech-tag text-xs">产品思维</span>
          </div>
        </div>
      </div>

      {/* 项目统计 */}
      <div className="fixed bottom-8 right-8 z-40 pointer-events-none">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30">
          <h3 className="cyber-title text-lg mb-3">项目概览</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-cyan-300">竞赛经历</p>
              <p className="text-cyan-500">3+ 项</p>
            </div>
            <div>
              <p className="text-cyan-300">技术项目</p>
              <p className="text-cyan-500">5+ 个</p>
            </div>
            <div>
              <p className="text-cyan-300">实习经历</p>
              <p className="text-cyan-500">2+ 次</p>
            </div>
            <div>
              <p className="text-cyan-300">技能领域</p>
              <p className="text-cyan-500">6+ 个</p>
            </div>
          </div>
        </div>
      </div>

      {/* 认知突触背景 */}
      <div className="synapse-bg">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="synapse-particle"></div>
        ))}
      </div>

      {/* Canvas图形 */}
      <div className="absolute inset-0 z-20">
        <CognitiveSynapseGraph onNodeClick={showCard} />
      </div>

      {/* 加载指示器 */}
      {isLoading && (
        <div id="loading" className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-30">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-200 border-t-cyan-600 mx-auto mb-6"></div>
            <p className="text-cyan-300 text-lg">加载认知突触中...</p>
            <p className="text-cyan-400 text-sm mt-2">构建思想蓝图</p>
          </div>
        </div>
      )}

      {/* 卡片容器 */}
      {cardVisible && cardContent && (
        <div 
          id="card-container" 
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              hideCard();
            }
          }}
        >
          <div className="card p-8 transform scale-100 transition-transform duration-300 pointer-events-auto holographic">
            <div className="flex justify-between items-start mb-6">
              <h2 className="cyber-title text-3xl font-bold">
                {cardContent.title}
              </h2>
              <button
                onClick={hideCard}
                className="transition-colors p-2 rounded-full hover:bg-cyan-500/10"
                style={{ color: 'var(--cyber-neon-green)' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {cardContent.role && (
              <p className="font-semibold mb-4 text-lg" style={{ color: 'var(--cyber-neon-blue)' }}>
                我的角色: {cardContent.role}
              </p>
            )}

            {cardContent.summary && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2 cyber-title">项目概述</h3>
                <p className="leading-relaxed" style={{ color: 'var(--primary-soft-white)' }}>
                  {cardContent.summary}
                </p>
              </div>
            )}

            {cardContent.image && (
              <img
                src={cardContent.image}
                alt={cardContent.title}
                className="card-image mb-6"
              />
            )}

            {cardContent.challenge && (
              <div className="mb-4 p-4 rounded-lg border-l-4" style={{ background: 'rgba(255, 250, 205, 0.1)', borderLeftColor: 'var(--accent-lemon-yellow)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--accent-lemon-yellow)' }}>挑战与背景</h3>
                <p style={{ color: 'var(--primary-soft-white)' }}>{cardContent.challenge}</p>
              </div>
            )}

            {cardContent.solution && (
              <div className="mb-4 p-4 rounded-lg border-l-4" style={{ background: 'rgba(0, 255, 65, 0.1)', borderLeftColor: 'var(--cyber-neon-green)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--cyber-neon-green)' }}>解决方案与过程</h3>
                <p style={{ color: 'var(--primary-soft-white)' }}>{cardContent.solution}</p>
              </div>
            )}

            {cardContent.results && (
              <div className="mb-4 p-4 rounded-lg border-l-4" style={{ background: 'rgba(240, 128, 128, 0.1)', borderLeftColor: 'var(--accent-light-coral)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--accent-light-coral)' }}>成果与反思</h3>
                <p style={{ color: 'var(--primary-soft-white)' }}>{cardContent.results}</p>
              </div>
            )}

            {cardContent.techStack && cardContent.techStack.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3 cyber-title">
                  技术栈
                </h3>
                <div className="flex flex-wrap gap-3">
                  {cardContent.techStack.map((tech: string, index: number) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}