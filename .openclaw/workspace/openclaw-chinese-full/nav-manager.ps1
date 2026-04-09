# OpenClaw中文网站导航栏管理工具

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "OpenClaw中文网站导航栏管理工具" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($args.Count -eq 0) {
    Write-Host "用法: .\nav-manager.ps1 [command]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "命令:" -ForegroundColor White
    Write-Host "  update    - 更新所有页面的导航栏" -ForegroundColor Green
    Write-Host "  validate  - 验证导航一致性" -ForegroundColor Green
    Write-Host "  help      - 显示帮助信息" -ForegroundColor Green
    Write-Host ""
    Write-Host "示例:" -ForegroundColor White
    Write-Host "  .\nav-manager.ps1 update" -ForegroundColor Gray
    Write-Host "  .\nav-manager.ps1 validate" -ForegroundColor Gray
    exit
}

$command = $args[0]

switch ($command) {
    "update" {
        Write-Host "🚀 开始更新所有页面的导航栏..." -ForegroundColor Green
        Write-Host ""
        node nav-generator.js update
    }
    "validate" {
        Write-Host "🔍 开始验证导航一致性..." -ForegroundColor Green
        Write-Host ""
        node nav-generator.js validate
    }
    "help" {
        node nav-generator.js help
    }
    default {
        Write-Host "未知命令: $command" -ForegroundColor Red
        Write-Host "使用 `".\nav-manager.ps1 help`" 查看帮助" -ForegroundColor Yellow
    }
}