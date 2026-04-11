#!/bin/bash

# OpenClaw 中文文档网站部署脚本

echo "🚀 开始部署 OpenClaw 中文文档网站..."

# 检查 Git 状态
if [ -d ".git" ]; then
    echo "📦 Git 仓库已初始化"
    
    # 添加所有文件
    git add .
    
    # 提交更改
    git commit -m "更新网站内容 $(date '+%Y-%m-%d %H:%M:%S')"
    
    # 推送到 GitHub
    echo "📤 推送到 GitHub..."
    git push origin main
    
    echo "✅ 部署完成！网站将在几分钟内更新。"
    echo "🌐 访问: https://zhidengzhe.github.io/openclaw-chinese/"
else
    echo "❌ 错误: 当前目录不是 Git 仓库"
    echo "请先初始化 Git 仓库:"
    echo "  git init"
    echo "  git remote add origin https://github.com/zhidengzhe/openclaw-chinese.git"
    echo "  git branch -M main"
fi