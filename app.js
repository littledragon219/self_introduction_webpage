// 思想蓝图应用
class ThoughtBlueprint {
    constructor() {
        console.log('ThoughtBlueprint: 开始初始化');
        this.canvas = null;
        this.ctx = null;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.nodes = [];
        this.links = [];
        this.visibleNodes = new Set(['center']);
        this.cardVisible = false;
        
        // 画布拖拽相关
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
        this.panOffset = { x: 0, y: 0 };
        this.lastPanOffset = { x: 0, y: 0 };
        
        // 节点展开状态
        this.expandedNodes = new Set();
        
        this.init();
    }
    
    init() {
        try {
            console.log('ThoughtBlueprint: 开始初始化方法');
            
            // 创建Canvas
            this.createCanvas();
            console.log('ThoughtBlueprint: Canvas创建完成');
            
            // 初始化数据
            this.initData();
            console.log('ThoughtBlueprint: 数据初始化完成');
            
            // 绑定事件
            this.bindEvents();
            console.log('ThoughtBlueprint: 事件绑定完成');
            
            // 开始渲染
            this.render();
            console.log('ThoughtBlueprint: 渲染完成');
            
            // 隐藏加载界面
            setTimeout(() => {
                console.log('ThoughtBlueprint: 隐藏加载界面');
                const loading = document.getElementById('loading');
                if (loading) {
                    loading.style.display = 'none';
                }
            }, 1000);
            
        } catch (error) {
            console.error('ThoughtBlueprint: 初始化失败', error);
            // 显示错误信息
            const loading = document.getElementById('loading');
            if (loading) {
                loading.innerHTML = `
                    <div class="text-center">
                        <p class="text-red-500 mb-2">加载失败</p>
                        <p class="text-sm text-gray-600">${error.message}</p>
                        <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">重试</button>
                    </div>
                `;
            }
        }
    }
    
    createCanvas() {
        try {
            this.canvas = document.createElement('canvas');
            
            // 设置高分辨率Canvas
            const devicePixelRatio = window.devicePixelRatio || 1;
            this.canvas.width = this.width * devicePixelRatio;
            this.canvas.height = this.height * devicePixelRatio;
            this.canvas.style.width = this.width + 'px';
            this.canvas.style.height = this.height + 'px';
            
            this.canvas.style.position = 'absolute';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.cursor = 'pointer';
            
            const container = document.getElementById('graph-container');
            if (!container) {
                throw new Error('找不到graph-container元素');
            }
            
            container.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            
            if (!this.ctx) {
                throw new Error('无法获取Canvas上下文');
            }
            
            // 设置高分辨率缩放
            this.ctx.scale(devicePixelRatio, devicePixelRatio);
            
        } catch (error) {
            console.error('创建Canvas失败:', error);
            throw error;
        }
    }
    
    initData() {
        try {
            // 检查数据是否存在
            if (typeof projectData === 'undefined') {
                throw new Error('projectData未定义，请检查data.js是否正确加载');
            }
            
            console.log('projectData:', projectData);
            
            // 计算节点位置
            this.calculatePositions();
            
            // 创建连接
            this.createLinks();
            
        } catch (error) {
            console.error('初始化数据失败:', error);
            throw error;
        }
    }
    
    calculatePositions() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        // 中心节点
        this.nodes.push({
            ...projectData.center,
            x: centerX,
            y: centerY,
            radius: 30
        });
        
        // 一级节点 - 围绕中心
        const categoryRadius = 150;
        projectData.categories.forEach((category, index) => {
            const angle = (index / projectData.categories.length) * 2 * Math.PI;
            this.nodes.push({
                ...category,
                x: centerX + categoryRadius * Math.cos(angle),
                y: centerY + categoryRadius * Math.sin(angle),
                radius: 20
            });
        });
        
        // 二级节点 - 围绕父节点
        projectData.projects.forEach((project, index) => {
            const parent = this.nodes.find(n => n.id === project.parent);
            if (parent) {
                // 计算该父节点下的项目数量
                const projectsInParent = projectData.projects.filter(p => p.parent === project.parent);
                const projectIndex = projectsInParent.findIndex(p => p.id === project.id);
                
                const childRadius = 120;
                const angleStep = (2 * Math.PI) / projectsInParent.length;
                const childAngle = angleStep * projectIndex;
                
                this.nodes.push({
                    ...project,
                    x: parent.x + childRadius * Math.cos(childAngle),
                    y: parent.y + childRadius * Math.sin(childAngle),
                    radius: 15
                });
            }
        });
        
        console.log('节点位置计算完成，共', this.nodes.length, '个节点');
    }
    
    createLinks() {
        // 中心到一级节点的连接
        projectData.categories.forEach(category => {
            const source = this.nodes.find(n => n.id === 'center');
            const target = this.nodes.find(n => n.id === category.id);
            if (source && target) {
                this.links.push({ source, target });
            }
        });
        
        // 一级到二级节点的连接
        projectData.projects.forEach(project => {
            const source = this.nodes.find(n => n.id === project.parent);
            const target = this.nodes.find(n => n.id === project.id);
            if (source && target) {
                this.links.push({ source, target });
            }
        });
        
        console.log('连接创建完成，共', this.links.length, '个连接');
    }
    
    bindEvents() {
        // 鼠标按下事件
        this.canvas.addEventListener('mousedown', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const clickedNode = this.getNodeAtPosition(x, y);
            if (clickedNode) {
                // 点击节点
                console.log('点击节点:', clickedNode.label);
                this.handleNodeClick(clickedNode);
            } else {
                // 开始拖拽画布
                this.isDragging = true;
                this.dragStart = { x, y };
                this.lastPanOffset = { ...this.panOffset };
                this.canvas.style.cursor = 'grabbing';
            }
        });
        
        // 鼠标移动事件
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (this.isDragging) {
                // 拖拽画布
                const deltaX = x - this.dragStart.x;
                const deltaY = y - this.dragStart.y;
                this.panOffset.x = this.lastPanOffset.x + deltaX;
                this.panOffset.y = this.lastPanOffset.y + deltaY;
                this.render();
            } else {
                // 更新鼠标样式
                this.canvas.style.cursor = this.getNodeAtPosition(x, y) ? 'pointer' : 'grab';
            }
        });
        
        // 鼠标释放事件
        this.canvas.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.canvas.style.cursor = 'grab';
        });
        
        // 鼠标离开画布
        this.canvas.addEventListener('mouseleave', () => {
            this.isDragging = false;
            this.canvas.style.cursor = 'grab';
        });
    }
    
    getNodeAtPosition(x, y) {
        return this.nodes.find(node => {
            if (!this.visibleNodes.has(node.id)) return false;
            
            // 考虑拖拽偏移
            const adjustedX = node.x + this.panOffset.x;
            const adjustedY = node.y + this.panOffset.y;
            const distance = Math.sqrt((x - adjustedX) ** 2 + (y - adjustedY) ** 2);
            return distance <= node.radius;
        });
    }
    
    handleNodeClick(node) {
        if (node.type === 'center') {
            this.expandFirstLevel();
        } else if (node.type === 'category') {
            this.toggleCategory(node.id);
        } else if (node.content) {
            this.showCard(node.content);
        }
    }
    
    toggleCategory(categoryId) {
        if (this.expandedNodes.has(categoryId)) {
            // 收缩节点
            this.collapseCategory(categoryId);
        } else {
            // 展开节点
            this.expandCategory(categoryId);
        }
    }
    
    collapseCategory(categoryId) {
        this.expandedNodes.delete(categoryId);
        
        // 隐藏该分类下的所有项目
        projectData.projects.forEach(project => {
            if (project.parent === categoryId) {
                this.visibleNodes.delete(project.id);
            }
        });
        
        this.render();
    }
    
    expandFirstLevel() {
        // 隐藏介绍文字
        const introText = document.getElementById('intro-text');
        if (introText) {
            introText.style.opacity = '0';
        }
        
        // 显示所有一级节点并触发动画
        projectData.categories.forEach(category => {
            this.visibleNodes.add(category.id);
            const node = this.nodes.find(n => n.id === category.id);
            if (node) {
                node.animationStart = Date.now();
            }
        });
        
        this.render();
    }
    
    expandCategory(categoryId) {
        this.expandedNodes.add(categoryId);
        
        // 显示该分类下的所有项目并触发动画
        projectData.projects.forEach(project => {
            if (project.parent === categoryId) {
                this.visibleNodes.add(project.id);
                const node = this.nodes.find(n => n.id === project.id);
                if (node) {
                    node.animationStart = Date.now();
                }
            }
        });
        
        this.render();
    }
    
    showCard(content) {
        if (this.cardVisible) return;
        
        console.log('显示卡片，内容:', content);
        
        this.cardVisible = true;
        
        const cardContainer = document.getElementById('card-container');
        cardContainer.style.pointerEvents = 'auto';
        
        let cardHTML = `
            <div class="card p-8 transform scale-0 transition-transform duration-300">
                <div class="flex justify-between items-start mb-6">
                    <h2 class="text-3xl font-bold" style="color: var(--primary-soft-white);">${content.title}</h2>
                    <button id="close-card" class="transition-colors p-2 rounded-full hover:bg-white/10" style="color: var(--secondary-mint-blue);">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
        `;
        
        if (content.image) {
            cardHTML += `<img src="${content.image}" alt="${content.title}" class="card-image mb-6 rounded-lg shadow-lg">`;
        }
        
        if (content.role) {
            cardHTML += `<p class="font-semibold mb-4 text-lg" style="color: var(--secondary-mint-blue);">${content.role}</p>`;
        }
        
        if (content.summary) {
            cardHTML += `<p class="mb-6 leading-relaxed" style="color: var(--primary-soft-white);">${content.summary}</p>`;
        }
        
        if (content.techStack && content.techStack.length > 0) {
            cardHTML += `<div class="mb-6">
                <h3 class="font-semibold mb-3" style="color: var(--primary-soft-white);">技术栈</h3>
                <div class="flex flex-wrap gap-3">
                    ${content.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>`;
        }
        
        if (content.challenge) {
            cardHTML += `<div class="mb-4 p-4 rounded-lg border-l-4" style="background: rgba(255, 250, 205, 0.1); border-left-color: var(--accent-lemon-yellow);">
                <h3 class="font-semibold mb-2" style="color: var(--accent-lemon-yellow);">挑战</h3>
                <p style="color: var(--primary-soft-white);">${content.challenge}</p>
            </div>`;
        }
        
        if (content.solution) {
            cardHTML += `<div class="mb-4 p-4 rounded-lg border-l-4" style="background: rgba(224, 255, 255, 0.1); border-left-color: var(--primary-light-cyan);">
                <h3 class="font-semibold mb-2" style="color: var(--primary-light-cyan);">解决方案</h3>
                <p style="color: var(--primary-soft-white);">${content.solution}</p>
            </div>`;
        }
        
        if (content.results) {
            cardHTML += `<div class="mb-4 p-4 rounded-lg border-l-4" style="background: rgba(240, 128, 128, 0.1); border-left-color: var(--accent-light-coral);">
                <h3 class="font-semibold mb-2" style="color: var(--accent-light-coral);">成果</h3>
                <p style="color: var(--primary-soft-white);">${content.results}</p>
            </div>`;
        }
        
        cardHTML += '</div>';
        
        console.log('生成的卡片HTML:', cardHTML);
        
        cardContainer.innerHTML = cardHTML;
        
        // 显示卡片
        setTimeout(() => {
            const card = cardContainer.querySelector('.card');
            if (card) {
                card.classList.remove('scale-0');
                card.classList.add('scale-100');
                console.log('卡片显示完成');
            } else {
                console.error('找不到卡片元素');
            }
        }, 50);
        
        // 绑定关闭事件
        document.getElementById('close-card').addEventListener('click', () => {
            this.hideCard();
        });
        
        // 点击背景关闭
        cardContainer.addEventListener('click', (e) => {
            if (e.target === cardContainer) {
                this.hideCard();
            }
        });
    }
    
    hideCard() {
        if (!this.cardVisible) return;
        
        const cardContainer = document.getElementById('card-container');
        const card = cardContainer.querySelector('.card');
        
        card.classList.remove('scale-100');
        card.classList.add('scale-0');
        
        setTimeout(() => {
            cardContainer.innerHTML = '';
            cardContainer.style.pointerEvents = 'none';
            this.cardVisible = false;
        }, 300);
    }
    
    render() {
        try {
            // 清空画布
            this.ctx.clearRect(0, 0, this.width, this.height);
            
            // 绘制连接线
            this.drawLinks();
            
            // 绘制节点
            this.drawNodes();
            
            // 如果有动画正在进行，继续渲染
            const hasAnimations = this.nodes.some(node => {
                if (!this.visibleNodes.has(node.id)) return false;
                const now = Date.now();
                const nodeAnimationStart = node.animationStart || now;
                const elapsed = now - nodeAnimationStart;
                return elapsed < 800; // 动画持续时间
            });
            
            if (hasAnimations) {
                requestAnimationFrame(() => this.render());
            }
            
        } catch (error) {
            console.error('渲染失败:', error);
        }
    }
    
    drawLinks() {
        this.ctx.strokeStyle = '#77AAB'; // 中灰蓝色
        this.ctx.lineWidth = 1; // 1px 线条
        this.ctx.globalAlpha = 0.6; // 适中的透明度
        
        this.links.forEach(link => {
            const sourceVisible = this.visibleNodes.has(link.source.id);
            const targetVisible = this.visibleNodes.has(link.target.id);
            
            if (sourceVisible && targetVisible) {
                // 应用拖拽偏移
                const sourceX = link.source.x + this.panOffset.x;
                const sourceY = link.source.y + this.panOffset.y;
                const targetX = link.target.x + this.panOffset.x;
                const targetY = link.target.y + this.panOffset.y;
                
                this.ctx.beginPath();
                this.ctx.moveTo(sourceX, sourceY);
                this.ctx.lineTo(targetX, targetY);
                this.ctx.stroke();
            }
        });
        
        this.ctx.globalAlpha = 1;
    }
    
    drawNodes() {
        this.nodes.forEach(node => {
            if (!this.visibleNodes.has(node.id)) return;
            
            // 计算动画缩放
            const now = Date.now();
            const animationDuration = 800; // 动画持续时间
            const nodeAnimationStart = node.animationStart || now;
            const elapsed = now - nodeAnimationStart;
            const progress = Math.min(elapsed / animationDuration, 1);
            
            // 使用缓动函数
            const easeOutBack = (t) => {
                const c1 = 1.70158;
                const c3 = c1 + 1;
                return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
            };
            
            const scale = easeOutBack(progress);
            const animatedRadius = node.radius * scale;
            
            // 应用拖拽偏移
            const adjustedX = node.x + this.panOffset.x;
            const adjustedY = node.y + this.panOffset.y;
            
            // 绘制节点圆圈
            this.ctx.beginPath();
            this.ctx.arc(adjustedX, adjustedY, animatedRadius, 0, 2 * Math.PI);
            
            if (node.type === 'center') {
                // 核心节点 - 亮色外发光效果
                this.ctx.fillStyle = 'rgba(60, 110, 113, 0.5)'; // 半透明深色填充
                this.ctx.fill();
                
                // 2px 实线边框，主色调
                this.ctx.strokeStyle = '#E0FFFF';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                
                // 外发光效果
                this.ctx.shadowColor = '#E0FFFF';
                this.ctx.shadowBlur = 10;
                this.ctx.shadowOffsetX = 0;
                this.ctx.shadowOffsetY = 0;
                this.ctx.stroke();
                
                // 重置阴影
                this.ctx.shadowColor = 'transparent';
                this.ctx.shadowBlur = 0;
                
            } else if (node.type === 'category') {
                // 分类节点 - 简洁线框
                this.ctx.fillStyle = 'rgba(60, 110, 113, 0.2)'; // 更透明的填充
                this.ctx.fill();
                
                // 1px 实线边框，辅助色
                this.ctx.strokeStyle = '#77AAB';
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
                
                // 绘制展开/收缩指示器
                if (this.expandedNodes.has(node.id)) {
                    // 展开状态：显示 "-" 号
                    this.ctx.fillStyle = '#E0FFFF';
                    this.ctx.font = 'bold 16px Helvetica Neue, Arial, sans-serif';
                    this.ctx.fillText('-', adjustedX + animatedRadius - 8, adjustedY - animatedRadius + 8);
                } else {
                    // 收缩状态：显示 "+" 号
                    this.ctx.fillStyle = '#E0FFFF';
                    this.ctx.font = 'bold 16px Helvetica Neue, Arial, sans-serif';
                    this.ctx.fillText('+', adjustedX + animatedRadius - 8, adjustedY - animatedRadius + 8);
                }
                
            } else {
                // 项目节点 - 简洁线框
                this.ctx.fillStyle = 'rgba(60, 110, 113, 0.2)'; // 更透明的填充
                this.ctx.fill();
                
                // 1px 实线边框，辅助色
                this.ctx.strokeStyle = '#77AAB';
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            }
            
            // 绘制文字
            if (node.type === 'center') {
                this.ctx.fillStyle = '#E0FFFF'; // 主色调
                this.ctx.font = 'bold 14px Helvetica Neue, Arial, sans-serif';
            } else {
                this.ctx.fillStyle = '#A4DDEE'; // 辅助色
                this.ctx.font = 'normal 12px Helvetica Neue, Arial, sans-serif';
            }
            
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            const text = node.label.length > 8 ? node.label.substring(0, 8) + '...' : node.label;
            this.ctx.fillText(text, adjustedX, adjustedY);
        });
    }
}

// 启动应用
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM加载完成，开始初始化应用');
    try {
        new ThoughtBlueprint();
    } catch (error) {
        console.error('应用启动失败:', error);
        const loading = document.getElementById('loading');
        if (loading) {
            loading.innerHTML = `
                <div class="text-center">
                    <p class="text-red-500 mb-2">应用启动失败</p>
                    <p class="text-sm text-gray-600">${error.message}</p>
                    <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">重试</button>
                </div>
            `;
        }
    }
}); 