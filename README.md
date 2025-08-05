# 曾德荣个人网站 - 赛博义体风格

## 项目概述

这是一个采用赛博义体风格的交互式个人网站，展示了曾德荣的个人经历和项目成果。网站使用D3.js创建动态的力导向图网络，具有炫酷的视觉效果和丰富的交互功能。

## 主要功能

### 🎯 交互式节点网络
- 使用D3.js力导向图展示个人技能和项目关系
- 支持节点拖拽和交互
- 三级节点结构：个人中心 → 技能领域 → 具体项目

### 🧠 智能内容关联
- 点击二级节点（具体项目）显示详细内容
- 包含项目挑战、解决方案、成果等完整信息
- 全息投影风格的弹窗展示

### 🎨 赛博义体视觉风格
- 荧光绿发光效果和脉冲动画
- 矩阵雨背景和扫描线效果
- 六边形网格和认知突触粒子动画
- 全息投影和数据流动画

## 技术栈

- **前端框架**: Next.js 14 + React 18
- **可视化**: D3.js (力导向图)
- **样式**: Tailwind CSS + 自定义CSS动画
- **语言**: TypeScript
- **构建工具**: Next.js

## 项目结构

```
gBbsyaT/
├── app/
│   ├── page.tsx          # 主页面组件
│   └── globals.css       # 全局样式（赛博义体风格）
├── components/
│   └── NetworkGraph.tsx  # D3.js网络图组件
├── data.ts               # 数据定义和项目内容
└── package.json
```

## 数据结构

### 网络节点数据
```typescript
interface NetworkNode {
  id: string;           // 节点ID
  level: number;        // 层级（0=中心，1=领域，2=项目）
  contentKey?: string;  // 关联的内容键
  parentNode?: string;  // 父节点
}
```

### 项目详细内容
```typescript
interface ProjectContent {
  title: string;        // 项目标题
  role: string;         // 担任角色
  challenge: string;    // 面临的挑战
  solution: string;     // 解决方案
  outcome: string;      // 成果与反思
}
```

## 运行项目

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

## 交互说明

- **拖拽节点**: 可以拖拽任何节点来调整位置
- **点击项目节点**: 点击二级节点（具体项目）查看详细信息
- **视觉效果**: 享受赛博义体风格的动画和发光效果

## 自定义内容

要添加新的项目或修改内容，请编辑 `data.ts` 文件：

1. 在 `networkData.nodes` 中添加新节点
2. 在 `networkData.links` 中添加连接关系
3. 在 `projectDetails` 中添加详细内容

## 视觉特色

- 🌟 荧光绿发光效果
- ⚡ 脉冲和数据流动画
- 🌧️ 矩阵雨背景
- 🔍 扫描线效果
- 🧬 认知突触粒子
- 💎 全息投影弹窗

这个网站完美融合了技术与艺术，展现了现代Web开发的无限可能！ 