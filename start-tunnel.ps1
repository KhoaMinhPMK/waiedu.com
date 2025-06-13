# Script để khởi động development server với Cloudflare tunnel
# Sử dụng: .\start-tunnel.ps1

Write-Host "🚀 Khởi động WAI Education với Cloudflare Tunnel..." -ForegroundColor Green

# Đường dẫn đến cloudflared.exe
$cloudflaredPath = "C:\Users\fujitsu\.cloudflared\cloudflared.exe"

# Kiểm tra xem cloudflared có tồn tại không
if (!(Test-Path $cloudflaredPath)) {
    Write-Host "❌ Không tìm thấy cloudflared.exe tại: $cloudflaredPath" -ForegroundColor Red
    Write-Host "📥 Hướng dẫn cài đặt: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/" -ForegroundColor Yellow
    exit 1
}

# Kiểm tra file config
$configPath = "C:\Users\fujitsu\.cloudflared\config.yml"
if (!(Test-Path $configPath)) {
    Write-Host "❌ Không tìm thấy file config.yml tại: $configPath" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Config file tìm thấy tại: $configPath" -ForegroundColor Green
Write-Host "✅ Cloudflared tìm thấy tại: $cloudflaredPath" -ForegroundColor Green

# Khởi động development server trong background
Write-Host "🔧 Khởi động Vite development server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-Command", "cd '$PWD'; yarn dev" -WindowStyle Minimized

# Đợi một chút để server khởi động
Start-Sleep -Seconds 3

# Khởi động Cloudflare tunnel
Write-Host "🌐 Khởi động Cloudflare tunnel..." -ForegroundColor Cyan
Write-Host "🔗 Website sẽ available tại: https://waiedu.live" -ForegroundColor Green
Write-Host "🏠 Local development: http://localhost:3000" -ForegroundColor Blue
Write-Host "" 
Write-Host "📝 Để dừng tunnel, nhấn Ctrl+C" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray

& $cloudflaredPath tunnel --config $configPath run
