/**
 * OpenClaw中文网站导航栏生成器
 * 自动化生成和管理网站导航栏
 */

const fs = require('fs');
const path = require('path');

// 读取配置文件
const configPath = path.join(__dirname, 'nav-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

/**
 * 生成导航栏HTML
 * @param {string} currentPath - 当前页面路径
 * @returns {string} 导航栏HTML
 */
function generateNavigation(currentPath = '/') {
  const { logo, navigation, styles } = config;
  
  // 排序导航项
  const sortedNav = [...navigation].sort((a, b) => a.order - b.order);
  
  // 生成Logo
  const logoHtml = `
    <a href="${logo.path}" class="${styles.logoClass}">
      <i class="${logo.icon}"></i>${logo.text}
    </a>`;
  
  // 生成导航链接
  let navLinksHtml = '';
  sortedNav.forEach(item => {
    const isActive = isCurrentPage(item.path, currentPath);
    const activeClass = isActive ? ` class="${styles.activeClass}"` : '';
    const targetAttr = item.external ? ` target="${item.target || '_blank'}"` : '';
    const relAttr = item.external ? ` rel="${item.rel || 'noopener noreferrer'}"` : '';
    
    navLinksHtml += `
                <li><a href="${item.path}"${activeClass}${targetAttr}${relAttr}>${item.title}</a></li>`;
  });
  
  // 组合完整导航栏
  return `
        <div class="${styles.navContainerClass}">
            ${logoHtml}
            <ul class="${styles.navLinksClass}">
${navLinksHtml}
            </ul>
        </div>`;
}

/**
 * 判断是否为当前页面
 * @param {string} navPath - 导航项路径
 * @param {string} currentPath - 当前页面路径
 * @returns {boolean}
 */
function isCurrentPage(navPath, currentPath) {
  if (navPath === '/') {
    return currentPath === '/' || currentPath === '/index.html';
  }
  
  // 处理外部链接
  if (navPath.startsWith('http')) {
    return false;
  }
  
  // 检查当前路径是否以导航路径开头
  return currentPath.startsWith(navPath);
}

/**
 * 更新单个文件的导航栏
 * @param {string} filePath - 文件路径
 * @param {string} currentPath - 当前页面路径（相对于网站根目录）
 */
function updateFileNavigation(filePath, currentPath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 查找并替换导航栏
    const navRegex = /<div class="nav-container">[\s\S]*?<\/div>\s*<\/nav>/;
    const newNav = `<nav class="${config.styles.navbarClass}">\n${generateNavigation(currentPath)}\n    </nav>`;
    
    if (navRegex.test(content)) {
      content = content.replace(navRegex, newNav);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ 已更新: ${filePath}`);
      return true;
    } else {
      console.log(`⚠️  未找到导航栏: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ 更新失败 ${filePath}: ${error.message}`);
    return false;
  }
}

/**
 * 批量更新所有页面
 */
function updateAllPages() {
  console.log('🚀 开始批量更新导航栏...\n');
  
  const siteRoot = __dirname;
  const htmlFiles = [];
  
  // 收集所有HTML文件
  function collectHtmlFiles(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        // 跳过.git目录
        if (item.name !== '.git') {
          collectHtmlFiles(fullPath);
        }
      } else if (item.name.endsWith('.html')) {
        htmlFiles.push(fullPath);
      }
    }
  }
  
  collectHtmlFiles(siteRoot);
  console.log(`找到 ${htmlFiles.length} 个HTML文件\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  // 更新每个文件
  htmlFiles.forEach(filePath => {
    // 计算当前页面路径（相对于网站根目录）
    const relativePath = path.relative(siteRoot, filePath);
    const dirName = path.dirname(relativePath);
    const fileName = path.basename(relativePath);
    
    let currentPath = '/';
    if (dirName !== '.') {
      // 目录页面
      currentPath = `/${dirName}/`;
    } else if (fileName === 'index.html') {
      // 首页
      currentPath = '/';
    }
    
    if (updateFileNavigation(filePath, currentPath)) {
      successCount++;
    } else {
      failCount++;
    }
  });
  
  console.log('\n📊 批量更新完成:');
  console.log(`   总文件数: ${htmlFiles.length}`);
  console.log(`   成功更新: ${successCount}`);
  console.log(`   失败文件: ${failCount}`);
  
  // 生成更新报告
  const report = {
    timestamp: new Date().toISOString(),
    totalFiles: htmlFiles.length,
    successCount,
    failCount,
    configVersion: config.version
  };
  
  const reportPath = path.join(siteRoot, 'nav-update-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\n📄 更新报告已保存: ${reportPath}`);
}

/**
 * 验证导航一致性
 */
function validateNavigation() {
  console.log('🔍 验证导航一致性...\n');
  
  const siteRoot = __dirname;
  const issues = [];
  
  // 检查每个HTML文件
  const htmlFiles = [];
  function findHtmlFiles(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory() && item.name !== '.git') {
        findHtmlFiles(fullPath);
      } else if (item.name.endsWith('.html')) {
        htmlFiles.push(fullPath);
      }
    }
  }
  
  findHtmlFiles(siteRoot);
  
  htmlFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(siteRoot, filePath);
    
    // 检查是否包含所有导航项
    config.navigation.forEach(navItem => {
      if (!navItem.external) {
        const expectedLink = `href="${navItem.path}"`;
        if (!content.includes(expectedLink)) {
          issues.push({
            file: relativePath,
            issue: `缺少导航项: ${navItem.title}`,
            expected: expectedLink
          });
        }
      }
    });
    
    // 检查active类数量（应该只有1个或0个）
    const activeCount = (content.match(/class="active"/g) || []).length;
    if (activeCount > 1) {
      issues.push({
        file: relativePath,
        issue: `有 ${activeCount} 个active类，应该只有1个或0个`
      });
    }
  });
  
  if (issues.length === 0) {
    console.log('✅ 所有页面导航一致且正确');
  } else {
    console.log(`⚠️  发现 ${issues.length} 个问题:`);
    issues.forEach(issue => {
      console.log(`   ${issue.file}: ${issue.issue}`);
    });
  }
  
  return issues;
}

// 命令行接口
if (require.main === module) {
  const command = process.argv[2] || 'update';
  
  switch (command) {
    case 'update':
      updateAllPages();
      break;
    case 'validate':
      validateNavigation();
      break;
    case 'generate':
      // 测试生成导航栏
      console.log(generateNavigation('/api/'));
      break;
    case 'help':
      console.log(`
OpenClaw导航栏管理工具
用法: node nav-generator.js [command]

命令:
  update     - 更新所有页面的导航栏
  validate   - 验证导航一致性
  generate   - 测试生成导航栏
  help       - 显示帮助信息

示例:
  node nav-generator.js update
  node nav-generator.js validate
      `);
      break;
    default:
      console.log(`未知命令: ${command}`);
      console.log('使用 "node nav-generator.js help" 查看帮助');
  }
}

// 导出模块
module.exports = {
  generateNavigation,
  updateAllPages,
  validateNavigation,
  config
};