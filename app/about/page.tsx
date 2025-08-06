'use client';

import React from 'react';
import { ArrowLeft, Calendar, MapPin, Award, BookOpen, Code, Users } from 'lucide-react';

export default function AboutPage() {
  const timelineEvents = [
    {
      date: '2024',
      title: '大学生创新大赛校赛银奖',
      description: '智能无损抓取机械臂项目获得校级银奖',
      icon: Award,
      category: 'competition'
    },
    {
      date: '2024',
      title: '舞龙舞狮锦标赛',
      description: '获大学生舞龙舞狮锦标赛季军',
      icon: Award,
      category: 'competition'
    },
    {
      date: '2023',
      title: '产品经理实习',
      description: '在基层探索用户需求，将技术与产品结合',
      icon: Users,
      category: 'work'
    },
    {
      date: '2023',
      title: '人力资源实习',
      description: '了解企业运营和人才管理',
      icon: Users,
      category: 'work'
    },
    {
      date: '2022',
      title: '机械工程专业学习',
      description: '开始系统学习机械工程和自动化技术',
      icon: BookOpen,
      category: 'education'
    }
  ];

  const skills = [
    {
      category: '技术技能',
      items: ['Python', 'ROS', '深度学习', '计算机视觉', '力控算法', '原型网络']
    },
    {
      category: '工程技能',
      items: ['机械设计', '传感器融合', '智能控制', '系统集成', '硬件调试']
    },
    {
      category: '产品技能',
      items: ['用户研究', '需求分析', '产品设计', '项目管理', '团队协作']
    },
    {
      category: '软技能',
      items: ['跨学科思维', '创新思维', '问题解决', '沟通表达', '学习能力']
    }
  ];

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
              <a href="/about" className="nav-link active">关于我</a>
              <a href="/resume" className="nav-link">简历</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 个人简介 */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">关于我</h1>
              <div className="prose prose-lg text-gray-700 space-y-6">
                <p>
                  我是曾德荣，一名专注于具身智能领域的产品构想家。我相信在物理世界与数字智能的交汇处，
                  存在着无限的可能性。我的使命是打造无缝的人机交互体验，让智能系统真正理解并适应我们的世界。
                </p>
                <p>
                  作为一名机械工程专业的学生，我不仅掌握了扎实的工程技术基础，更重要的是培养了跨学科的思维方式。
                  从力控算法到深度学习，从硬件设计到产品思维，我不断探索不同领域的知识边界，寻找创新的解决方案。
                </p>
                <p>
                  在具身智能的研究中，我专注于"触觉感知-柔性控制-特征迁移"三位一体的系统设计。
                  通过智能无损抓取机械臂等项目，我深入研究了如何让机器像人类一样感知、思考和行动。
                  这些经历让我深刻认识到，真正的智能产品是算法、硬件和用户场景的深度耦合。
                </p>
                <p>
                  未来，我希望继续在具身智能领域深耕，探索更多前沿技术，并将这些技术转化为真正有用的产品，
                  为人类创造更美好的智能交互体验。
                </p>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">曾</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">曾德荣</h3>
                  <p className="text-gray-600">具身智能的产品构想家</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">机械工程专业</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">2022年入学</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Code size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">Python, ROS, 深度学习</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 经历时间轴 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">我的经历</h2>
          <div className="relative">
            {/* 时间轴线 */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              {timelineEvents.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <div key={index} className="relative flex items-start space-x-6">
                    {/* 时间点 */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <IconComponent size={20} className="text-blue-500" />
                      </div>
                    </div>
                    
                    {/* 内容 */}
                    <div className="flex-1 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {event.date}
                        </span>
                      </div>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 核心技能 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">核心技能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span key={skillIndex} className="tech-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 