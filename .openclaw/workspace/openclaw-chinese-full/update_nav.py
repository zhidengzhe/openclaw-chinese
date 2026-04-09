#!/usr/bin/env python3
"""
批量更新所有HTML文件的导航栏
"""

import os
import re

# 统一的导航栏HTML
new_nav = '''            <ul class="nav-links">
                <li><a href="/openclaw-chinese/">首页</a></li>
                <li><a href="/openclaw-chinese/getting-started/">快速开始</a></li>
                <li><a href="/openclaw-chinese/installation/">安装</a></li>
                <li><a href="/openclaw-chinese/gateway/">网关与运维</a></li>
                <li><a href="/openclaw-chinese/messaging-channels/">消息渠道</a></li>
                <li><a href="/openclaw-chinese/platforms/">平台</a></li>
                <li><a href="/openclaw-chinese/tools/">工具</a></li>
                <li><a href="/openclaw-chinese/models/">模型</a></li>
                <li><a href="/openclaw-chinese/api/">API</a></li>
                <li><a href="/openclaw-chinese/community/">社区</a></li>
                <li><a href="/openclaw-chinese/help/">帮助</a></li>
                <li><a href="https://github.com/openclaw/openclaw" target="_blank">GitHub</a></li>
            </ul>'''

# 为每个页面生成特定的active链接
def update_nav_for_page(filepath, page_name):
    """更新指定页面的导航栏"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 根据页面名称设置active类
    active_nav = new_nav
    if page_name == 'index':
        active_nav = active_nav.replace('href="/openclaw-chinese/">首页</a>', 'href="/openclaw-chinese/" class="active">首页</a>')
    elif page_name == 'getting-started':
        active_nav = active_nav.replace('href="/openclaw-chinese/getting-started/">快速开始</a>', 'href="/openclaw-chinese/getting-started/" class="active">快速开始</a>')
    elif page_name == 'installation':
        active_nav = active_nav.replace('href="/openclaw-chinese/installation/">安装</a>', 'href="/openclaw-chinese/installation/" class="active">安装</a>')
    elif page_name == 'gateway':
        active_nav = active_nav.replace('href="/openclaw-chinese/gateway/">网关与运维</a>', 'href="/openclaw-chinese/gateway/" class="active">网关与运维</a>')
    elif page_name == 'messaging-channels':
        active_nav = active_nav.replace('href="/openclaw-chinese/messaging-channels/">消息渠道</a>', 'href="/openclaw-chinese/messaging-channels/" class="active">消息渠道</a>')
    elif page_name == 'platforms':
        active_nav = active_nav.replace('href="/openclaw-chinese/platforms/">平台</a>', 'href="/openclaw-chinese/platforms/" class="active">平台</a>')
    elif page_name == 'tools':
        active_nav = active_nav.replace('href="/openclaw-chinese/tools/">工具</a>', 'href="/openclaw-chinese/tools/" class="active">工具</a>')
    elif page_name == 'models':
        active_nav = active_nav.replace('href="/openclaw-chinese/models/">模型</a>', 'href="/openclaw-chinese/models/" class="active">模型</a>')
    elif page_name == 'api':
        active_nav = active_nav.replace('href="/openclaw-chinese/api/">API</a>', 'href="/openclaw-chinese/api/" class="active">API</a>')
    elif page_name == 'community':
        active_nav = active_nav.replace('href="/openclaw-chinese/community/">社区</a>', 'href="/openclaw-chinese/community/" class="active">社区</a>')
    elif page_name == 'help':
        active_nav = active_nav.replace('href="/openclaw-chinese/help/">帮助</a>', 'href="/openclaw-chinese/help/" class="active">帮助</a>')
    
    # 替换导航栏
    # 查找现有的nav-links并替换
    pattern = r'<ul class="nav-links">[\s\S]*?</ul>'
    if re.search(pattern, content):
        content = re.sub(pattern, active_nav, content)
        print(f"✓ 更新了 {filepath}")
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    else:
        print(f"✗ 未找到导航栏: {filepath}")
        return False

# 主函数
def main():
    base_dir = "."
    
    # 要更新的页面列表
    pages = [
        ("index.html", "index"),
        ("getting-started/index.html", "getting-started"),
        ("installation/index.html", "installation"),
        ("gateway/index.html", "gateway"),
        ("messaging-channels/index.html", "messaging-channels"),
        ("platforms/index.html", "platforms"),
        ("tools/index.html", "tools"),
        ("models/index.html", "models"),
        ("api/index.html", "api"),
        ("community/index.html", "community"),
        ("help/index.html", "help"),
        ("concepts/index.html", "concepts"),
        ("reference/index.html", "reference"),
    ]
    
    updated_count = 0
    total_count = len(pages)
    
    for filename, page_name in pages:
        filepath = os.path.join(base_dir, filename)
        if os.path.exists(filepath):
            if update_nav_for_page(filepath, page_name):
                updated_count += 1
        else:
            print(f"✗ 文件不存在: {filepath}")
    
    print(f"\n更新完成: {updated_count}/{total_count} 个文件")

if __name__ == "__main__":
    main()