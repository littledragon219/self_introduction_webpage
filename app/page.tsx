'use client';

import { useEffect, useState } from 'react';
import CognitiveSynapseGraph from '../components/CognitiveSynapseGraph';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载过程
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* 认知突触背景 */}
      <div className="synapse-bg">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="synapse-particle"></div>
        ))}
      </div>

      {/* Canvas图形 */}
      <CognitiveSynapseGraph />

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
    </div>
  );
}
