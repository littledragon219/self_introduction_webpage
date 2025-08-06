'use client';

import React from 'react';
import { ArrowLeft, Download, Eye, FileText } from 'lucide-react';

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <a href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft size={20} />
                <span>返回首页</span>
              </a>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/" className="nav-link">首页</a>
              <a href="/about" className="nav-link">关于我</a>
              <a href="/resume" className="nav-link active">简历</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">我的简历</h1>
          <p className="text-lg text-gray-600">
            查看我的完整简历，了解我的教育背景、技能和项目经历
          </p>
        </div>

        {/* 简历预览卡片 */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText size={24} className="text-blue-600" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">曾德荣 - 个人简历</h2>
                  <p className="text-sm text-gray-600">具身智能的产品构想家</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Eye size={16} />
                  <span>预览</span>
                </a>
                <a 
                  href="/resume.pdf" 
                  download 
                  className="btn-primary flex items-center space-x-2"
                >
                  <Download size={16} />
                  <span>下载PDF</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* PDF嵌入 */}
          <div className="h-[800px] w-full">
            <iframe
              src="/resume.pdf"
              className="w-full h-full border-0"
              title="曾德荣个人简历"
            />
          </div>
        </div>

        {/* 简历摘要 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">教育背景</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-900">机械工程专业</p>
                <p className="text-sm text-gray-600">2022年入学</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">核心技能</h3>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                <span className="tech-tag text-xs">Python</span>
                <span className="tech-tag text-xs">ROS</span>
                <span className="tech-tag text-xs">深度学习</span>
                <span className="tech-tag text-xs">力控算法</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">项目经历</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-900">智能无损抓取机械臂</p>
                <p className="text-sm text-gray-600">项目负责人，获校赛银奖</p>
              </div>
            </div>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">联系我</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">专业领域</h4>
              <p className="text-gray-600">
                具身智能、机器人学、深度学习、产品设计
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">求职意向</h4>
              <p className="text-gray-600">
                AI产品经理、机器人工程师、具身智能研究员
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 