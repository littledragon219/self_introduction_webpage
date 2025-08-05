# Cognitive Synapse - 个人思想蓝图

这是一个交互式的个人作品集网站，将个人经历、项目和技术能力以网络图的形式展示。

## 功能特性

- 🧠 交互式思维网络图
- 📱 响应式设计
- 🎨 现代化UI设计
- 📸 图片支持
- ⚡ 流畅动画效果

## 如何添加新内容

### 1. 添加新项目

在 `data.js` 文件的 `nodes` 数组中添加新节点：

```javascript
{
    id: 'your-project-id', 
    label: '项目名称', 
    level: 2, 
    size: 45, 
    parent: 'ai', // 父节点ID
    isLeaf: true,
    content: {
        type: 'project',
        projectTitle: '项目标题',
        role: '角色/职位',
        projectSummary: '项目简介',
        challenge: '面临的挑战',
        solution: '解决方案',
        results: '项目成果',
        techStack: ['技术栈1', '技术栈2'],
        image: '图片URL'
    }
}
```

### 2. 添加新经历

```javascript
{
    id: 'your-experience-id',
    label: '经历名称',
    level: 2,
    size: 45,
    parent: 'embodied', // 父节点ID
    isLeaf: true,
    content: {
        type: 'experience',
        experienceTitle: '经历标题',
        category: '分类/角色',
        description: '详细描述',
        image: '图片URL'
    }
}
```

### 3. 添加新分类

```javascript
{
    id: 'new-category',
    label: '新分类',
    level: 1,
    size: 60,
    parent: 'zengderong',
    isLeaf: false,
    content: {
        type: 'category',
        title: '分类标题',
        description: '分类描述'
    }
}
```

### 4. 添加连接关系

在 `links` 数组中添加连接：

```javascript
{ source: 'parent-id', target: 'child-id' }
```

## 图片管理

### 使用在线图片

可以使用 Unsplash 等免费图片服务：

```javascript
image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop'
```

### 使用本地图片

1. 将图片文件放在项目根目录的 `images/` 文件夹中
2. 在代码中引用：

```javascript
image: './images/your-image.jpg'
```

### 推荐的图片尺寸

- 宽度：400px
- 高度：300px
- 格式：JPG, PNG, WebP
- 优化：使用适当的压缩比例

## 内容模板

项目提供了内容模板，可以在 `data.js` 文件中找到：

- `contentTemplate.project` - 项目模板
- `contentTemplate.experience` - 经历模板
- `contentTemplate.category` - 分类模板

## 图片资源库

在 `data.js` 文件中提供了 `imageLibrary` 对象，包含常用的图片URL：

- `robotics` - 机器人相关
- `computerVision` - 计算机视觉
- `uxDesign` - 用户体验设计
- `sports` - 体育运动
- `ai` - 人工智能
- `design` - 设计相关
- `technology` - 技术相关

## 故障排除

### 节点无法点击

1. 检查节点是否有 `content` 属性
2. 确保 `content.type` 正确设置
3. 检查控制台是否有JavaScript错误

### 图片不显示

1. 检查图片URL是否正确
2. 确保图片可以公开访问
3. 检查网络连接

### 样式问题

1. 确保 `style.css` 文件正确加载
2. 检查 Tailwind CSS 是否正确引入
3. 清除浏览器缓存

## 技术栈

- HTML5/CSS3
- JavaScript (ES6+)
- D3.js (数据可视化)
- Tailwind CSS (样式框架)
- Sanity CMS (内容管理)

## 部署

1. 将所有文件上传到Web服务器
2. 确保服务器支持静态文件服务
3. 配置正确的MIME类型
4. 测试所有功能是否正常工作

## 自定义

### 修改颜色主题

在 `style.css` 文件中修改CSS变量：

```css
:root {
    --brand-background: #F9F9F9;
    --brand-text: #1A202C;
    --brand-accent: #4285F4;
}
```

### 修改字体

在 `index.html` 中更换Google Fonts链接，然后在CSS中更新字体变量。

### 修改动画效果

在 `main.js` 中调整动画参数和过渡时间。 