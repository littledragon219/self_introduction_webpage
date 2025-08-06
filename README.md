# 曾德荣个人品牌网站

## 项目概述

这是一个现代化的个人品牌网站，展示了曾德荣作为"具身智能的产品构想家"的专业形象。网站采用人文科技主义设计风格，通过交互式神经网络图展示个人经历和项目。

## 设计理念

### 核心身份
- **具身智能的产品构想家**：在物理世界与数字智能的交汇处，打造无缝的人机交互体验

### 设计风格
- **人文科技主义 (Human-Tech Humanism)**：清晰、亲和、质感、构想、人性
- **浅色模式**：灵感来自现代建筑、极简主义和明亮的实验室
- **现代字体**：Plus Jakarta Sans (标题) + Inter (正文)

### 视觉识别系统
- **主色**：`#F8F9FA` (云朵白) - 页面背景
- **辅色**：`#212529` (炭黑) - 主要文字
- **高亮色**：`#007BFF` (信号蓝) - 按钮、链接、交互高亮

## 技术栈

| 层面 | 技术/工具 | 职责 |
| :--- | :--- | :--- |
| **前端框架** | **Next.js** (React) | 构建网站的用户界面和交互逻辑 |
| **CSS 方案** | **Tailwind CSS** | 快速实现定制化的视觉风格 |
| **交互组件** | **react-force-graph** | 实现核心的交互式神经网络图 |
| **图标库** | **Lucide React** | 提供现代化的图标 |
| **内容管理** | **Contentful** | 存储所有网站内容，提供 API 接口 |
| **部署平台** | **Vercel** | 自动构建并发布网站 |

## 网站结构

### 页面布局
- **/ (首页)**：核心交互体验入口，展示神经网络图
- **/about (关于我)**：个人故事、经历时间轴和技能列表
- **/resume (简历)**：内嵌 PDF 简历及下载链接

### 核心体验
访客通过探索一个以"曾德荣"为中心的动态知识图谱来了解个人故事。这个网络将**项目、经历、技能**作为节点连接起来，直观地展示整合不同领域知识的能力。

## 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本
```bash
npm run build
npm start
```

## 项目结构

```
self_introduction_webpage/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── about/             # 关于我页面
│   └── resume/            # 简历页面
├── components/            # React 组件
│   ├── CognitiveSynapseGraph.tsx  # 神经网络图组件
│   └── NetworkGraph.tsx   # 旧版网络图组件
├── data.ts               # 项目数据
├── public/               # 静态资源
└── package.json          # 项目配置
```

## 内容管理

### Contentful 集成
网站设计为与 Contentful CMS 集成，支持以下内容模型：

1. **project** - 项目信息
2. **timelineEvent** - 时间轴事件
3. **skill** - 技能信息

### 环境变量
在部署时需要配置以下环境变量：
```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

## 部署

### Vercel 部署
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 自动部署

### 其他平台
网站可以部署到任何支持 Next.js 的平台，如：
- Netlify
- Railway
- 自托管服务器

## 自定义

### 修改数据
编辑 `data.ts` 文件来更新项目信息和网络图数据。

### 修改样式
- 全局样式：`app/globals.css`
- 组件样式：使用 Tailwind CSS 类名

### 添加新页面
在 `app/` 目录下创建新的页面文件。

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 许可证

MIT License

---

**曾德荣** - 具身智能的产品构想家  
*在物理世界与数字智能的交汇处，打造无缝的人机交互体验* 