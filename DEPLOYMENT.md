# 部署指南

## Vercel 部署

### 1. 准备项目
确保项目已经推送到 GitHub 仓库。

### 2. 在 Vercel 中部署
1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账户登录
3. 点击 "New Project"
4. 选择你的 GitHub 仓库
5. 配置项目设置：
   - Framework Preset: Next.js
   - Root Directory: `./` (默认)
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. 环境变量配置
在 Vercel 项目设置中添加以下环境变量：

```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

### 4. 部署
点击 "Deploy" 按钮，Vercel 将自动构建并部署你的网站。

## Contentful 集成

### 1. 创建 Contentful 账户
1. 访问 [contentful.com](https://contentful.com)
2. 注册账户并创建新的 Space

### 2. 创建内容模型
在 Contentful 中创建以下内容模型：

#### Project 模型
- `title` (Short Text) - 项目标题
- `role` (Short Text) - 你的角色
- `coverImage` (Media) - 项目封面图
- `challenge` (Rich Text) - 项目挑战
- `solution` (Rich Text) - 解决方案
- `outcome` (Rich Text) - 成果与反思
- `techStack` (Tags) - 技术栈标签
- `category` (Short Text) - 分类

#### TimelineEvent 模型
- `date` (Date) - 事件日期
- `title` (Short Text) - 事件标题
- `description` (Short Text) - 事件描述

#### Skill 模型
- `name` (Short Text) - 技能名称
- `category` (Short Text) - 技能分类

### 3. 获取 API 密钥
1. 在 Contentful 中进入 Settings > API keys
2. 创建新的 API key
3. 复制 Space ID 和 Access Token

## 其他部署平台

### Netlify
1. 将代码推送到 GitHub
2. 在 Netlify 中导入项目
3. 配置构建命令：`npm run build`
4. 配置发布目录：`.next`

### Railway
1. 在 Railway 中创建新项目
2. 连接 GitHub 仓库
3. 自动检测 Next.js 项目
4. 配置环境变量

### 自托管
1. 构建项目：`npm run build`
2. 启动服务器：`npm start`
3. 配置反向代理（如 Nginx）

## 自定义域名

### Vercel
1. 在项目设置中添加自定义域名
2. 配置 DNS 记录
3. 等待 DNS 传播

### 其他平台
参考各平台的域名配置文档。

## 性能优化

### 图片优化
- 使用 Next.js Image 组件
- 压缩图片文件
- 使用 WebP 格式

### 代码分割
- 使用动态导入
- 优化包大小
- 启用 gzip 压缩

## 监控和分析

### Vercel Analytics
在 Vercel 中启用 Analytics 功能。

### Google Analytics
添加 Google Analytics 跟踪代码。

## 故障排除

### 常见问题
1. **构建失败**：检查依赖版本和 TypeScript 错误
2. **环境变量未生效**：确保在部署平台正确配置
3. **图片加载失败**：检查图片路径和格式

### 调试技巧
- 查看构建日志
- 检查浏览器控制台
- 使用 Vercel 的调试功能 