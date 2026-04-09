@echo off
echo ========================================
echo OpenClaw中文网站导航栏管理工具
echo ========================================
echo.

if "%1"=="" (
  echo 用法: nav-manager [command]
  echo.
  echo 命令:
  echo   update    - 更新所有页面的导航栏
  echo   validate  - 验证导航一致性
  echo   help      - 显示帮助信息
  echo.
  echo 示例:
  echo   nav-manager update
  echo   nav-manager validate
  goto :end
)

if "%1"=="update" (
  echo 🚀 开始更新所有页面的导航栏...
  echo.
  node nav-generator.js update
  goto :end
)

if "%1"=="validate" (
  echo 🔍 开始验证导航一致性...
  echo.
  node nav-generator.js validate
  goto :end
)

if "%1"=="help" (
  node nav-generator.js help
  goto :end
)

echo 未知命令: %1
echo 使用 "nav-manager help" 查看帮助

:end
echo.
pause