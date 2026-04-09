#!/usr/bin/env python3
"""
更新OpenClaw中文网站导航栏脚本
将导航栏从13项扩展为15项，添加"代理"和"参考"链接
"""

import os
import re
from pathlib import Path

# 网站根目录
SITE_ROOT = Path(__file__).parent

# 旧的导航栏HTML（13项）
OLD_NAV_HTML = '''<ul class="nav-links">
                <li><a href="/openclaw-chinese/" class="active">首页</a></li>
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

# 新的导航栏HTML（15项）
NEW_NAV_HTML = '''<ul class="nav-links">
                <li><a href="/openclaw-chinese/" class="active">首页</a></li>
                <li><a href="/openclaw-chinese/getting-started/">快速开始</a></li>
                <li><a href="/openclaw-chinese/installation/">安装</a></li>
                <li><a href="/openclaw-chinese/gateway/">网关与运维</a></li>
                <li><a href="/openclaw-chinese/messaging-channels/">消息渠道</a></li>
                <li><a href="/openclaw-chinese/platforms/">平台</a></li>
                <li><a href="/openclaw-chinese/tools/">工具</a></li>
                <li><a href="/openclaw-chinese/models/">模型</a></li>
                <li><a href="/openclaw-chinese/agents/">代理</a></li>
                <li><a href="/openclaw-chinese/api/">API</a></li>
                <li><a href="/openclaw-chinese/reference/">参考</a></li>
                <li><a href="/openclaw-chinese/community/">社区</a></li>
                <li><a href="/openclaw-chinese/help/">帮助</a></li>
                <li><a href="https://github.com/openclaw/openclaw" target="_blank">GitHub</a></li>
            </ul>'''

def update_navigation_in_file(file_path):
    """更新单个文件中的导航栏"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否包含旧的导航栏
        if OLD_NAV_HTML in content:
            new_content = content.replace(OLD_NAV_HTML, NEW_NAV_HTML)
            
            # 更新active类（根据当前页面）
            current_dir = file_path.parent.name
            if current_dir == '' or current_dir == 'openclaw-chinese-full':
                # 首页
                new_content = new_content.replace(
                    '<li><a href="/openclaw-chinese/" class="active">首页</a></li>',
                    '<li><a href="/openclaw-chinese/" class="active">首页</a></li>'
                )
            else:
                # 其他页面，更新对应的active类
                page_path = f'/openclaw-chinese/{current_dir}/'
                # 移除所有active类
                new_content = re.sub(r'class="active"', '', new_content)
                # 添加当前页面的active类
                new_content = new_content.replace(
                    f'<li><a href="{page_path}">',
                    f'<li><a href="{page_path}" class="active">'
                )
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"✅ 已更新: {file_path}")
            return True
        else:
            print(f"⚠️  未找到旧导航栏: {file_path}")
            return False
            
    except Exception as e:
        print(f"❌ 更新失败 {file_path}: {e}")
        return False

def main():
    """主函数：更新所有HTML文件"""
    html_files = []
    
    # 收集所有HTML文件
    for root, dirs, files in os.walk(SITE_ROOT):
        for file in files:
            if file.endswith('.html'):
                html_files.append(Path(root) / file)
    
    print(f"找到 {len(html_files)} 个HTML文件")
    
    updated_count = 0
    for html_file in html_files:
        if update_navigation_in_file(html_file):
            updated_count += 1
    
    print(f"\n📊 更新完成:")
    print(f"   总文件数: {len(html_files)}")
    print(f"   成功更新: {updated_count}")
    print(f"   失败文件: {len(html_files) - updated_count}")
    
    # 验证更新
    print(f"\n🔍 验证更新:")
    index_file = SITE_ROOT / "index.html"
    if index_file.exists():
        with open(index_file, 'r', encoding='utf-8') as f:
            content = f.read()
            if "代理</a></li>" in content and "参考</a></li>" in content:
                print("✅ 导航栏已成功添加'代理'和'参考'链接")
            else:
                print("❌ 导航栏更新可能未生效")

if __name__ == "__main__":
    main()