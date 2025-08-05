// 项目数据 - TypeScript版本
export interface NodeContent {
  title: string;
  summary?: string;
  role?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  techStack?: string[];
  image?: string;
}

export interface Node {
  id: string;
  label: string;
  type: 'center' | 'category' | 'project' | 'experience';
  parent?: string;
  content?: NodeContent;
  x?: number;
  y?: number;
  radius?: number;
}

export interface ProjectData {
  center: Node;
  categories: Node[];
  projects: Node[];
}

export const projectData: ProjectData = {
  // 中心节点
  center: {
    id: 'center',
    label: '曾德荣',
    type: 'center',
    x: 0,
    y: 0
  },
  
  // 一级节点
  categories: [
    {
      id: 'ai',
      label: '深度学习',
      type: 'category',
      parent: 'center',
      content: {
        title: '深度学习',
        summary: '专注于机器学习、计算机视觉和智能系统开发，包括深度残差学习、神经网络架构设计等前沿技术。',
        role: '算法研究员',
        techStack: ['PyTorch', 'TensorFlow', 'CNN', 'RNN', '计算机视觉'],
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'
      }
    },
    {
      id: 'product',
      label: '产品设计',
      type: 'category',
      parent: 'center',
      content: {
        title: '产品设计',
        summary: '专注于用户体验设计、产品创新和交互设计，将技术能力与用户需求完美结合。',
        role: '产品设计师',
        techStack: ['Figma', '用户研究', '原型设计', '交互设计'],
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'
      }
    },
    {
      id: 'embodied',
      label: '具身智能',
      type: 'category',
      parent: 'center',
      content: {
        title: '具身智能',
        summary: '探索身心合一的智能系统，将物理世界与数字世界融合，实现真正的智能交互。',
        role: '具身智能研究员',
        techStack: ['机器人学', '传感器融合', '物理交互', '智能控制'],
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
      }
    }
  ],
  
  // 二级节点 - 项目
  projects: [
    {
      id: 'arm',
      label: '智能无损抓取机械臂',
      type: 'project',
      parent: 'ai',
      content: {
        title: '智能无损抓取机械臂',
        role: '项目负责人 (智能算法开发设计)',
        summary: '研发"触觉感知-柔性控制-特征迁移"三位一体系统，配合树莓派主控与舵机协同，开发动态闭环力控算法实时感知物体，以0.01N的力控分辨率实现精准控制达到智能无损抓取。',
        challenge: '传统算法换果即重构的泛化难题',
        solution: '突破性设计层级化原型网络，实现"零样本推理+少样本微调"双模式',
        results: '在2025年大学生创新大赛校赛拿了银奖',
        techStack: ['Python', 'OpenCV', '力学传感', '树莓派'],
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop'
      }
    },
    {
      id: 'cv',
      label: '计算机视觉',
      type: 'project',
      parent: 'ai',
      content: {
        title: '计算机视觉应用',
        role: '算法工程师',
        summary: '利用深度学习模型进行图像识别与目标检测，应用于自动化质量控制和机器人导航系统。',
        techStack: ['PyTorch', 'CNN', 'YOLO', '图像处理'],
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop'
      }
    },
    {
      id: 'ux',
      label: '用户体验研究',
      type: 'project',
      parent: 'product',
      content: {
        title: '人机交互界面优化',
        role: 'UX Designer',
        summary: '通过用户访谈和可用性测试，对机器人控制软件界面进行重新设计，提升操作效率和用户满意度。',
        techStack: ['Figma', '用户研究', '原型设计'],
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'
      }
    },
    {
      id: 'dragon',
      label: '舞龙舞狮锦标赛',
      type: 'experience',
      parent: 'embodied',
      content: {
        title: '2024年第十六届中国大学生舞龙舞狮锦标赛',
        role: '团队成员 / 龙头',
        summary: '平日坚持每周三天早上6点30分训练，将传统文化与现代体育竞技精神结合。在赛场上超常发挥，通过团队协作与默契配合，勇夺季军。这体现了理论与实践、身体与心智结合的"具身"精神。',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
      }
    },
    {
      id: 'robotics',
      label: '机器人控制',
      type: 'project',
      parent: 'embodied',
      content: {
        title: '智能机器人控制系统',
        role: '系统工程师',
        summary: '设计并实现基于传感器融合的智能机器人控制系统，将视觉、触觉、力觉等多模态信息整合，实现机器人的精确控制和环境适应。',
        challenge: '多传感器数据融合的实时性和准确性',
        solution: '采用卡尔曼滤波和神经网络相结合的方法，实现多模态信息的有效融合',
        results: '系统响应时间降低40%，控制精度提升60%',
        techStack: ['ROS', 'Python', '传感器融合', '控制算法'],
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
      }
    },
    {
      id: 'haptic',
      label: '触觉反馈',
      type: 'project',
      parent: 'embodied',
      content: {
        title: '智能触觉反馈系统',
        role: '硬件工程师',
        summary: '开发基于压电材料的智能触觉反馈系统，为虚拟现实和远程操作提供真实的触觉体验。',
        challenge: '触觉反馈的实时性和真实感',
        solution: '采用多层级触觉反馈算法，结合力反馈和振动反馈',
        results: '触觉反馈延迟降低到5ms以内，用户体验评分提升80%',
        techStack: ['Arduino', '压电材料', '信号处理', 'VR技术'],
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop'
      }
    }
  ]
};

// 添加新内容的模板
export const contentTemplate = {
  // 项目模板
  project: {
    type: 'project',
    projectTitle: '项目标题',
    role: '角色/职位',
    projectSummary: '项目简介',
    challenge: '面临的挑战',
    solution: '解决方案',
    results: '项目成果',
    techStack: ['技术栈1', '技术栈2'],
    image: '图片URL'
  },
  
  // 经历模板
  experience: {
    type: 'experience',
    experienceTitle: '经历标题',
    category: '分类/角色',
    description: '详细描述',
    image: '图片URL'
  },
  
  // 分类模板
  category: {
    type: 'category',
    title: '分类标题',
    description: '分类描述'
  }
};

// 图片资源库（可以替换为您自己的图片）
export const imageLibrary = {
  robotics: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
  computerVision: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop',
  uxDesign: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
  sports: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
  design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
  technology: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
}; 