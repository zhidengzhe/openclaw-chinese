@echo off
echo 更新OpenClaw中文网站导航栏
echo 将导航栏从13项扩展为15项，添加"代理"和"参考"链接
echo.

REM 列出所有需要更新的HTML文件
dir /b /s *.html > html_files.txt

set count=0
for /f "tokens=*" %%f in (html_files.txt) do (
    echo 处理: %%f
    REM 这里需要实际的替换逻辑
    REM 由于批处理字符串处理复杂，建议手动更新或使用其他工具
    set /a count+=1
)

echo.
echo 找到 %count% 个HTML文件
echo 建议手动更新或使用文本编辑器的批量替换功能
echo.
pause