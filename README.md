# OpenClaw 中文文档网站

OpenClaw 的中文文档网站，为中文用户提供完整的使用指南和文档。

## 网站地址

🌐 **在线访问**: [https://zhidengzhe.github.io/openclaw-chinese/](https://zhidengzhe.github.io/openclaw-chinese/)

## 功能特性

- 📖 **完整文档**: 包含安装、配置、API 等完整文档
- 🎨 **现代化设计**: 响应式设计，支持移动设备
- 🔍 **易于导航**: 清晰的导航结构和侧边栏
- 📱 **多平台支持**: 在桌面和移动设备上都有良好体验
- 🚀 **快速加载**: 静态 HTML 页面，加载速度快

## 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

### 构建网站

```bash
npm run build
```

## 部署

网站使用 GitHub Pages 自动部署。只需将代码推送到 `main` 分支即可自动部署。

### 手动部署

```bash
./deploy.sh
```

或

```bash
git add .
git commit -m "更新网站内容"
git push origin main
```

## 项目结构

```
openclaw-chinese/
├── index.html              # 首页
├── docs/                   # 文档目录
│   ├── getting-started/    # 快速开始
│   ├── installation/       # 安装指南
│   ├── configuration/      # 配置指南
│   └── api/               # API 文档
├── css/                   # 样式文件
├── js/                    # JavaScript 文件
├── .nojekyll              # 禁用 Jekyll 处理
└── README.md              # 项目说明
```

## 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/新功能`)
3. 提交更改 (`git commit -m '添加新功能'`)
4. 推送到分支 (`git push origin feature/新功能`)
5. 创建 Pull Request

## 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

## 联系方式

- GitHub: [zhidengzhe](https://github.com/zhidengzhe)
- 项目地址: [openclaw-chinese](https://github.com/zhidengzhe/openclaw-chinese)
- 网站地址: [https://zhidengzhe.github.io/openclaw-chinese/](https://zhidengzhe.github.io/openclaw-chinese/)

---

**感谢使用 OpenClaw 中文文档！** 🦞