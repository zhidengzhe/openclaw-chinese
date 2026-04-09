# 更新OpenClaw中文网站导航栏脚本
# 将导航栏从13项扩展为15项，添加"代理"和"参考"链接

$SiteRoot = "C:\Users\黑暗森林\.openclaw\workspace\openclaw-chinese-full"

# 旧的导航栏HTML（13项）
$OldNavHtml = @'
<ul class="nav-links">
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
            </ul>
'@

# 新的导航栏HTML（15项）
$NewNavHtml = @'
<ul class="nav-links">
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
            </ul>
'@

# 获取所有HTML文件
$HtmlFiles = Get-ChildItem -Path $SiteRoot -Recurse -Filter "*.html"

Write-Host "找到 $($HtmlFiles.Count) 个HTML文件" -ForegroundColor Cyan

$UpdatedCount = 0
$FailedCount = 0

foreach ($File in $HtmlFiles) {
    try {
        $Content = Get-Content -Path $File.FullName -Raw -Encoding UTF8
        
        if ($Content -match [regex]::Escape($OldNavHtml)) {
            # 更新导航栏
            $NewContent = $Content -replace [regex]::Escape($OldNavHtml), $NewNavHtml
            
            # 更新active类（根据当前页面）
            $CurrentDir = $File.Directory.Name
            if ($CurrentDir -eq $null -or $CurrentDir -eq "openclaw-chinese-full") {
                # 首页 - 保持首页为active
                # 不需要额外处理
            } else {
                # 其他页面，更新对应的active类
                $PagePath = "/openclaw-chinese/$CurrentDir/"
                # 移除所有active类
                $NewContent = $NewContent -replace 'class="active"', ''
                # 添加当前页面的active类
                $NewContent = $NewContent -replace "href=`"$PagePath`">", "href=`"$PagePath`" class=`"active`">"
            }
            
            Set-Content -Path $File.FullName -Value $NewContent -Encoding UTF8
            Write-Host "✅ 已更新: $($File.FullName)" -ForegroundColor Green
            $UpdatedCount++
        } else {
            Write-Host "⚠️  未找到旧导航栏: $($File.FullName)" -ForegroundColor Yellow
            $FailedCount++
        }
    } catch {
        Write-Host "❌ 更新失败 $($File.FullName): $_" -ForegroundColor Red
        $FailedCount++
    }
}

Write-Host "`n📊 更新完成:" -ForegroundColor Cyan
Write-Host "   总文件数: $($HtmlFiles.Count)" -ForegroundColor White
Write-Host "   成功更新: $UpdatedCount" -ForegroundColor Green
Write-Host "   失败文件: $FailedCount" -ForegroundColor Red

# 验证更新
Write-Host "`n🔍 验证更新:" -ForegroundColor Cyan
$IndexFile = Join-Path $SiteRoot "index.html"
if (Test-Path $IndexFile) {
    $IndexContent = Get-Content -Path $IndexFile -Raw -Encoding UTF8
    if ($IndexContent -match "代理</a></li>" -and $IndexContent -match "参考</a></li>") {
        Write-Host "✅ 导航栏已成功添加'代理'和'参考'链接" -ForegroundColor Green
    } else {
        Write-Host "❌ 导航栏更新可能未生效" -ForegroundColor Red
    }
}