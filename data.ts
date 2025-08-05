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
            id: 'competition',
            label: '赛事经历',
            type: 'category',
            parent: 'center',
            content: {
                title: '赛事经历',
                summary: '活跃于课外活动。',
                role: '课外活动积极分子',
                techStack: ['舞龙', '工创大赛', '机器人竞赛', '大创'],
                //image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'
            }
        },
        {
            id: 'work',
            label: '工作实习经历',
            type: 'category',
            parent: 'center',
            content: {
                title: '工作实习经历',
                summary: '不断摸索自己，在基层探索用户需求，将其与技术结合。',
                role: '产品',
                techStack: ['产品经理', '人力资源', '销售', '跨境电商'],
               // image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'
            }
        },
        {
            id: 'embodied',
            label: '具身智能',
            type: 'category',
            parent: 'center',
            content: {
                title: '具身智能',
                summary: '探索身心合一的智能系统，将物理世界与数字世界融合，实现真正的智能交互。专注于机器学习、计算机视觉和智能系统开发，包括深度残差学习、神经网络架构设计等前沿技术',
                role: '具身智能研究员',
                techStack: ['机器人学', '传感器融合', '深度学习', '智能控制'],
                //image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
            }
        }
    ],
    
  
    // 二级节点 - 项目
    projects: [
      {
          id: 'arm',
          label: '智能无损抓取机械臂',
          type: 'project',
          parent: 'embodied',
          content: {
              title: '智能无损抓取机械臂',
              role: '项目负责人 (智能算法开发设计)',
              summary: '研发"触觉感知-柔性控制-特征迁移"三位一体系统，配合树莓派主控与舵机协同，开发动态闭环力控算法实时感知物体，以0.01N的力控分辨率实现精准控制达到智能无损抓取。',
              challenge: '传统算法换果即重构的泛化难题',
              solution: '突破性设计层级化原型网络，实现"零样本推理+少样本微调"双模式',
              results: '在2025年大学生创新大赛校赛拿了银奖',
              techStack: ['Python', '深度学习', '力学传感', '树莓派'],
              //image: 'https://www.thehowai.com/wp-content/uploads/2024/11/OpaXb9JA5o9DZIx9GTWcaxNVnFl-850x485.png'
          }
      },
      {
          id: 'cv1',
          label: '深度学习项目1',
          type: 'project',
          parent: 'embodied',
          content: {
              title: '深度学习项目1',
              role: '风力发电机故障诊断与寿命预测--算法开发设计',
              summary: '风力发电机的振动信号大数据集，采用了自注意力机制、LSTM 算法对时序数据进行特征提取和异常检测。对其进行分析后，通过 SARIMA 模型和最大似然 MLE 估计模型对其建模与预测故障时间。',
              techStack: ['Python', 'CNN', '大数据', 'LSTM'],
              //image: 'https://img2023.cnblogs.com/blog/1306351/202304/1306351-20230423082915860-327045832.png'
          }
      },
      {
          id: 'cv2',
          label: '深度学习项目2',
          type: 'project',
          parent: 'embodied',
          content: {
              title: '深度学习项目2',
              role: '基于深度残差学习的旋转机械故障诊断算法-算法设计与实现',
              summary: '使用 Case Western Reserve University 轴承数据集（10 类工况，四种负载），实现两个残差块堆叠的 1D-CNN 网络，各包含两层卷积层，通过跳跃连接直接传递输入特征，解决传统 CNN 的梯度退化/爆炸问题',
              techStack: ['Python', '1D-CNN', '轴承大数据', '残差网络'],
              //image: 'https://minio.cvmart.net/cvmart-community/images/202503/05/0/v2-78817ef5d946748a8d9377bbedc80c7e_b.jpg'
          }
      },
      {
          id: 'cv3',
          label: '深度学习项目3',
          type: 'project',
          parent: 'embodied',
          content: {
              title: '深度学习项目3',
              role: '基于多层域适应的滚动轴承跨域故障诊断算法-算法设计与实现',
              summary: '使用 Case Western Reserve University 轴承数据集（10 类工况，四种负载），复现搭建基于 1D-CNN的多层多内核 MMD 域适应框架，即在卷积层和全连接层中引入多内核 MMD，通过最小化跨层分布差异，迫使网络学习域不变特征。不仅进行网络结构浮现设计，也进行对比实验设计与参数调优和结果验证。最后得出的结果也是与论文准确率相差不到 1.0%，不排除噪声和参数微调所带来的影响。',
              techStack: ['Python', 'MMD', '轴承大数据', '领域泛化'],
              //image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIxOdrEVlS4-zWxamN9nsu56tIPomVL6RwWA&s'
          }
      },
      {
          id: 'human',
          label: '人力资源实习',
          type: 'project',
          parent: 'work',
          content: {
              title: 'CED Organic&Food',
              role: '人力资源部业务助理',
              summary: '主要负责货物进出货管理与货品申报工作，需与不同部门同时合作完成每天近千食品并出货给各大食品分销商',
              techStack: ['货物管理', '跨部门合作', '多语言交流'],
              //image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ5NfGdM7e5JO388SfllkunRcjqrAEYSNEAw&s'
          }
      },
      {
          id: 'human2',
          label: '食品销售部门实习',
          type: 'project',
          parent: 'work',
          content: {
              title: 'Bee Cheng Hiang 美珍香',
              role: '食品销售与原材料订购助理',
              summary: '主要负责肉干等食品原材料的每日订购工作，也会担任门店销售员，向客户推销店内食品。',
              techStack: ['食品原材料采购', '销售', '多语言交流'],
              //image: 'https://media-cdn.tripadvisor.com/media/photo-s/17/67/60/3d/photo0jpg.jpg'
          }
      },
      {
          id: 'human3',
          label: '项目经理助理实习',
          type: 'project',
          parent: 'work',
          content: {
              title: '上海恒数科技',
              role: '项目经理助理兼系统开发实习',
              summary: '主要负责调研跨境电商在国内设立运营中心的方案，以及开发 ERP 系统等优化运营和集中管理',
              techStack: ['ERP', '项目经理', '跨境电商'],
              //image: 'https://img.cifnews.com/dev/99e3c70deb7748af9376a36d4a089b68.png'
          }
      },
      {
          id: 'dragon',
          label: '舞龙舞狮锦标赛',
          type: 'experience',
          parent: 'competition',
          content: {
              title: '2024年第十六届中国大学生舞龙舞狮锦标赛--全国季军',
              role: '部长/学生教练/龙珠',
              summary: '平日坚持每周三天早上6点30分训练，将传统文化与现代体育竞技精神结合。在赛场上超常发挥，通过团队协作与默契配合，勇夺季军。这体现了理论与实践、身体与心智结合的"具身"精神。',
              //image: 'https://news.xjtu.edu.cn/__local/7/4A/37/DBC3B9AA35445443708575834FA_8BACC227_1F1C0.png?e=.png'
          }
      },
      {
          id: 'robotcar',
          label: '机器人竞赛',
          type: 'experience',
          parent: 'competition',
          content: {
              title: '第六届探索者杯机器人竞赛校园行--校赛二等奖',
              role: '电路搭建与arduino算法开发设计',
              summary: '组装轮式小车整个架构和电路设计，并基于 arduino 开发板开发了智能避障的算法。项目中使用了超声波传感器和颜色传感器融合，配合控制四个轮子的转速实现转向、上下波，循迹移动，颜色识别完成任务等功能',
              //image: 'https://lh5.googleusercontent.com/proxy/BPejMU4kZtJzQcAM55zwpbHz04ssRTm-A6g0szFxVw7ZDkLxk_NEGRqqpnzKiQiLi5mOrvtVw8J4vx5TIK2tvxD6A1CtUvZcYZfyh1lzQyR68_UDoIw0fiZnWGqFIqzCdQLwfOqdHHe2wLE-ELtd7bZ4AvrledhsGkdf_AdFkqGAAsPzrO_ss4Y826jkfI2uIawTqf5ROSu9ComlUdOU1FhqEiTI'
          }
      },
      {
          id: 'company',
          label: '工创大赛',
          type: 'experience',
          parent: 'competition',
          content: {
              title: '2025 年工创大赛虚拟仿真企业运营大赛—入围校赛决赛',
              role: '决策手',
              summary: '每队会由三名同学组成，我们是由金融、工商管理和机械工程跨专业团队。金融专业的同学负责计算成本、税率等；工商管理专业的队长则是综合性，即负责辅助计算也负责给出决策建议；我则是基于理工科思维对竞争公司的竞价、研发投入等综合预测判断，做出各季度的决策。经多轮选拔，在 42 队中脱颖而出进入校赛决赛。',
              //image: 'http://www.qyyyfz.com/statics/ssjs/2025ppt_00.png'
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