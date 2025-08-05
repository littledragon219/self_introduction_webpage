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
      {/* 认知突触背景 */}
      <div className="synapse-bg">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="synapse-particle"></div>
        ))}
      </div>

      {/* Canvas图形 */}
      <CognitiveSynapseGraph onNodeClick={showCard} />

      {/* 加载指示器 */}
      {isLoading && (
        <div id="loading" className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-30">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">加载认知突触中...</p>
            <p className="text-gray-400 text-sm mt-2">构建思想蓝图</p>
          </div>
        </div>
      )}

      {/* 卡片容器 */}
      {cardVisible && cardContent && (
        <div id="card-container" className="absolute inset-0 flex items-center justify-center z-40">
          <div className="card p-8 transform scale-100 transition-transform duration-300 pointer-events-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold" style={{ color: 'var(--primary-soft-white)' }}>
                {cardContent.title}
              </h2>
              <button
                onClick={hideCard}
                className="transition-colors p-2 rounded-full hover:bg-white/10"
                style={{ color: 'var(--secondary-mint-blue)' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {cardContent.role && (
              <p className="font-semibold mb-4 text-lg" style={{ color: 'var(--secondary-mint-blue)' }}>
                {cardContent.role}
              </p>
            )}

            {cardContent.summary && (
              <p className="mb-6 leading-relaxed" style={{ color: 'var(--primary-soft-white)' }}>
                {cardContent.summary}
              </p>
            )}

            {cardContent.image && (
              <img
                src={cardContent.image}
                alt={cardContent.title}
                className="card-image mb-6"
              />
            )}

            {cardContent.techStack && cardContent.techStack.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3" style={{ color: 'var(--primary-soft-white)' }}>
                  技术栈
                </h3>
                <div className="flex flex-wrap gap-3">
                  {cardContent.techStack.map((tech: string, index: number) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {cardContent.challenge && (
              <div className="mb-4 p-4 rounded-lg border-l-4" style={{ background: 'rgba(255, 250, 205, 0.1)', borderLeftColor: 'var(--accent-lemon-yellow)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--accent-lemon-yellow)' }}>挑战</h3>
                <p style={{ color: 'var(--primary-soft-white)' }}>{cardContent.challenge}</p>
              </div>
            )}

            {cardContent.solution && (
              <div className="mb-4 p-4 rounded-lg border-l-4" style={{ background: 'rgba(224, 255, 255, 0.1)', borderLeftColor: 'var(--primary-light-cyan)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--primary-light-cyan)' }}>解决方案</h3>
                <p style={{ color: 'var(--primary-soft-white)' }}>{cardContent.solution}</p>
              </div>
            )}

            {cardContent.results && (
              <div className="mb-4 p-4 rounded-lg border-l-4" style={{ background: 'rgba(240, 128, 128, 0.1)', borderLeftColor: 'var(--accent-light-coral)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--accent-light-coral)' }}>成果</h3>
                <p style={{ color: 'var(--primary-soft-white)' }}>{cardContent.results}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}