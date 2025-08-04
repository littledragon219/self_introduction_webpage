export const initialData = {
    nodes: [
        { id: 'zengderong', label: '曾德荣', level: 0, size: 80, isLeaf: false },


        { id: 'ai', label: '人工智能', level: 1, size: 60, parent: 'zengderong', isLeaf: false },
        { id: 'product', label: '产品设计', level: 1, size: 60, parent: 'zengderong', isLeaf: false },
        { id: 'embodied', label: '具身智能', level: 1, size: 60, parent: 'zengderong', isLeaf: false },


        { 
            id: 'arm', 
            label: '智能无损抓取机械臂', 
            level: 2, 
            size: 45, 
            parent: 'ai',
            isLeaf: true,
            details: {
                title: '智能无损抓取机械臂',
                role: '项目负责人 (智能算法开发设计)',
                description: '研发三位一体系统，配合树莓派与舵机，开发动态闭环力控算法，实现对不同尺寸和材质物体的智能无损抓取。',
                tags: ['Python', 'OpenCV', '力学传感', '树莓派']
            }
        },
        { 
            id: 'cv', 
            label: '计算机视觉', 
            level: 2, 
            size: 45, 
            parent: 'ai',
            isLeaf: true,
            details: {
                title: '计算机视觉应用',
                role: '算法工程师',
                description: '利用深度学习模型进行图像识别与目标检测，应用于自动化质量控制和机器人导航系统。',
                tags: ['PyTorch', 'CNN', 'YOLO', '图像处理']
            }
        },


        { 
            id: 'ux', 
            label: '用户体验研究', 
            level: 2, 
            size: 45, 
            parent: 'product',
            isLeaf: true,
            details: {
                title: '人机交互界面优化',
                role: 'UX Designer',
                description: '通过用户访谈和可用性测试，对机器人控制软件界面进行重新设计，提升操作效率和用户满意度。',
                tags: ['Figma', '用户研究', '原型设计']
            }
        },


        {
            id: 'dragon',
            label: '舞龙舞狮锦标赛',
            level: 2,
            size: 45,
            parent: 'embodied',
            isLeaf: true,
            details: {
                title: '2024年第十六届中国大学生舞龙舞狮锦标赛',
                role: '团队成员 / 龙头',
                description: '平日坚持每周三天早上6点30分训练，将传统文化与现代体育竞技精神结合。在赛场上超常发挥，通过团队协作与默契配合，勇夺季军。这体现了理论与实践、身体与心智结合的“具身”精神。',
                tags: ['团队协作', '体能训练', '传统文化', '竞技精神']
            }
        }
    ],
    links: [
        { source: 'zengderong', target: 'ai' },
        { source: 'zengderong', target: 'product' },
        { source: 'zengderong', target: 'embodied' },

        { source: 'ai', target: 'arm' },
        { source: 'ai', target: 'cv' },

        { source: 'product', target: 'ux' },

        { source: 'embodied', target: 'dragon' },
    ]
};
