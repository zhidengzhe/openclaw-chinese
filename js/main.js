// OpenClaw 中文版主脚本

document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 代码块复制功能
    document.querySelectorAll('pre').forEach(pre => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = '复制';
        button.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            padding: 0.25rem 0.5rem;
            background: #f0f0f0;
            border: 1px solid #ddd;
            border-radius: 3px;
            font-size: 0.8rem;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
        `;
        
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        button.addEventListener('click', async () => {
            const code = pre.querySelector('code')?.textContent || pre.textContent;
            try {
                await navigator.clipboard.writeText(code);
                button.textContent = '已复制!';
                button.style.background = '#4CAF50';
                button.style.color = 'white';
                
                setTimeout(() => {
                    button.textContent = '复制';
                    button.style.background = '#f0f0f0';
                    button.style.color = 'inherit';
                }, 2000);
            } catch (err) {
                console.error('复制失败:', err);
                button.textContent = '失败';
                button.style.background = '#f44336';
                button.style.color = 'white';
                
                setTimeout(() => {
                    button.textContent = '复制';
                    button.style.background = '#f0f0f0';
                    button.style.color = 'inherit';
                }, 2000);
            }
        });
        
        pre.addEventListener('mouseenter', () => {
            button.style.opacity = '1';
        });
        
        pre.addEventListener('mouseleave', () => {
            button.style.opacity = '0.7';
        });
    });
    
    // 移动端菜单切换（如果需要）
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // 页面加载动画
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 0.3s ease-in';
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 100);
    }
    
    // 外部链接标记
    document.querySelectorAll('a').forEach(link => {
        if (link.hostname !== window.location.hostname && !link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // 添加外部链接图标
            const icon = document.createElement('span');
            icon.textContent = ' ↗';
            icon.style.fontSize = '0.8em';
            link.appendChild(icon);
        }
    });
    
    // 最后更新时间显示
    const lastSyncElement = document.querySelector('.last-sync');
    if (lastSyncElement) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Asia/Shanghai'
        };
        
        lastSyncElement.textContent = now.toLocaleString('zh-CN', options) + ' 北京时间';
    }
});