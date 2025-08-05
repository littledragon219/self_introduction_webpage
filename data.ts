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
              challenge: '传统工业机械臂在面对水果等易损、形态不一的物体时，极易造成损伤，泛化能力差。核心挑战在于如何让机械臂像人手一样，既"心中有数"（知道抓的是什么），又"手下有谱"（知道用多大力），并能快速适应未知物体。',
              solution: '感知层: 搭建了包含力控传感器的硬件系统，配合树莓派主控，开发动态闭环力控算法，实时感知物体形变。决策层: 设计了创新的"层级化原型网络"，它包含两级分类：第一级进行"域分类"（如苹果、橘子），第二级在域内进行"子域分类"（如成熟、未成熟）。泛化层: 结合"零样本推理"和"少样本微调"双模式。对于新水果，系统可直接进行零样本识别，极大提升了泛化能力和效率。',
              results: '成果: 力控分辨率达到0.01N，实现了对多种水果的智能、无损抓取。在2025年大学生创新大赛校赛中荣获银奖。反思: 这次经历让我深刻体会到，一个成功的智能产品是算法、硬件和用户场景的深度耦合。作为项目负责人，我不仅要设计算法，更要思考成本、可用性和未来的扩展性，这正是我对AI产品经理角色的初步探索。',
              techStack: ['力控算法', '原型网络', '零样本推理', '树莓派', 'ROS', 'Python'],
              //image: 'https://www.thehowai.com/wp-content/uploads/2024/11/OpaXb9JA5o9DZIx9GTWcaxNVnFl-850x485.png'
          }
      },
      {
          id: 'cv1',
          label: '风力发电机故障诊断',
          type: 'project',
          parent: 'embodied',
          content: {
              title: '风力发电机故障诊断与寿命预测',
              role: '算法开发设计',
              summary: '基于风力发电机的振动信号大数据集，采用了自注意力机制、LSTM 算法对时序数据进行特征提取和异常检测。对其进行分析后，通过 SARIMA 模型和最大似然 MLE 估计模型对其建模与预测故障时间。',
              challenge: '风力发电机运行环境复杂，振动信号噪声大，传统方法难以准确识别故障模式和预测剩余寿命。需要处理高维时序数据，同时考虑多种故障类型的特征提取和分类问题。',
              solution: '采用深度学习与传统统计方法相结合的策略：1) 使用自注意力机制处理长序列振动数据，捕获时序依赖关系；2) 设计LSTM网络进行特征提取和异常检测；3) 结合SARIMA模型进行时间序列预测；4) 使用最大似然估计(MLE)优化模型参数，提高预测精度。',
              results: '成功实现了对风力发电机故障的准确诊断和寿命预测，为工业设备维护提供了可靠的技术支持。通过多模型融合，显著提升了预测精度和泛化能力。',
              techStack: ['Python', 'CNN', '大数据', 'LSTM', '自注意力机制', 'SARIMA', 'MLE'],
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
              challenge: '舞龙舞狮是一项需要高度团队协作的传统体育项目，要求队员之间默契配合，动作协调一致。作为龙珠（龙头），需要承担引领整个团队的重任，既要保持个人技术的精湛，又要确保团队的整体表现。',
              solution: '1) 制定科学的训练计划：每周三天早上6:30开始训练，确保队员体能和技术的持续提升；2) 强化团队协作：通过反复练习，培养队员间的默契配合；3) 融合传统与现代：将传统文化精神与现代体育竞技理念相结合；4) 心理素质训练：在高压比赛环境下保持冷静，发挥最佳水平。',
              results: '在全国42支参赛队伍中脱颖而出，荣获全国季军。这次经历让我深刻体会到团队协作的重要性，以及传统文化在现代竞技中的价值。作为学生教练，也锻炼了我的领导能力和组织协调能力。',
              techStack: ['团队协作', '传统文化', '体育竞技', '领导力', '组织协调'],
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

// 新的数据结构 - 按照用户指定的格式
export interface NetworkNode {
  id: string;
  level: number;
  contentKey?: string;
  parentNode?: string;
}

export interface NetworkLink {
  source: string;
  target: string;
}

export interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

// 网络数据结构
export const networkData: NetworkData = {
  nodes: [
    { id: "曾德荣", level: 0 },
    { id: "人工智能", level: 1 },
    { id: "机械工程", level: 1 },
    { id: "领导力与协作", level: 1 },
    { id: "智能无损抓取机械臂", level: 2, contentKey: "graspingArm", parentNode: "人工智能" },
    { id: "风力发电机故障诊断", level: 2, contentKey: "windPower", parentNode: "人工智能" },
    { id: "舞龙舞狮锦标赛", level: 2, contentKey: "dragonDance", parentNode: "领导力与协作" },
    { id: "工创大赛", level: 2, contentKey: "bizSim", parentNode: "领导力与协作" }
  ],
  links: [
    { source: "曾德荣", target: "人工智能" },
    { source: "曾德荣", target: "机械工程" },
    { source: "曾德荣", target: "领导力与协作" },
    { source: "人工智能", target: "智能无损抓取机械臂" },
    { source: "人工智能", target: "风力发电机故障诊断" },
    { source: "领导力与协作", target: "舞龙舞狮锦标赛" },
    { source: "领导力与协作", target: "工创大赛" }
  ]
};

// 项目详细内容数据
export const projectDetails = {
  graspingArm: {
    title: "智能无损抓取机械臂",
    role: "项目负责人(智能算法开发设计)",
    challenge: "传统工业机械臂在面对水果等易损、形态不一的物体时，极易造成损伤，泛化能力差。核心挑战在于如何让机械臂像人手一样，既\"心中有数\"（知道抓的是什么），又\"手下有谱\"（知道用多大力）。",
    solution: "设计了创新的\"层级化原型网络\"，并结合\"零样本推理\"和\"少样本微调\"双模式。对于新水果，系统可直接进行零样本识别，极大提升了泛化能力和效率。",
    outcome: "力控分辨率达到0.01N，实现了对多种水果的智能、无损抓取。在2025年大学生创新大赛校赛中荣获银奖。"
  },
  windPower: {
    title: "风力发电机故障诊断与寿命预测",
    role: "算法开发设计",
    challenge: "风力发电机运行环境复杂，振动信号噪声大，传统方法难以准确识别故障模式和预测剩余寿命。",
    solution: "采用深度学习与传统统计方法相结合的策略：使用自注意力机制处理长序列振动数据，设计LSTM网络进行特征提取和异常检测。",
    outcome: "成功实现了对风力发电机故障的准确诊断和寿命预测，为工业设备维护提供了可靠的技术支持。"
  },
  dragonDance: {
    title: "2024年第十六届中国大学生舞龙舞狮锦标赛",
    role: "舞龙队校队队员",
    challenge: "作为一名工科学生，我面临的是体能和艺术表现力的双重挑战。在高压的比赛环境下，团队一度陷入烦躁和失误的困境。",
    solution: "通过每周数日的清晨集训和暑期的强化训练，与队友们互相鼓励，在教练的指导下重整旗鼓，将压力转化为动力。",
    outcome: "在赛场上超常发挥，最终为学校赢得了全国季军的荣誉。这段经历磨练了我的意志力，更让我懂得了在高压下如何进行团队协作与情绪管理。"
  },
  bizSim: {
    title: "2025年工创大赛虚拟仿真企业运营大赛",
    role: "决策手",
    challenge: "作为跨专业团队的一员，需要在金融、工商管理和机械工程三个不同专业背景之间协调，做出最优的企业运营决策。",
    solution: "基于理工科思维对竞争公司的竞价、研发投入等综合预测判断，与金融专业同学的成本计算和工商管理同学的决策建议相结合。",
    outcome: "在42队中脱颖而出进入校赛决赛，体现了跨专业协作和综合决策能力。"
  }
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