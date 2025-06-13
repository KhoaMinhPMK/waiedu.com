# Test script để kiểm tra Cloudflare tunnel
# Chạy: .\test-tunnel.ps1

Write-Host "🧪 Testing Cloudflare Tunnel Setup..." -ForegroundColor Cyan
Write-Host ""

# Đường dẫn đến cloudflared.exe
$cloudflaredPath = "C:\Users\fujitsu\.cloudflared\cloudflared.exe"

# Kiểm tra cloudflared
Write-Host "1. Kiểm tra Cloudflared..." -ForegroundColor Yellow
if (Test-Path $cloudflaredPath) {
    $version = & $cloudflaredPath --version
    Write-Host "   ✅ Cloudflared found: $version" -ForegroundColor Green
} else {
    Write-Host "   ❌ Cloudflared not found at: $cloudflaredPath" -ForegroundColor Red
    exit 1
}

# Kiểm tra config file
Write-Host "2. Kiểm tra Config file..." -ForegroundColor Yellow
$configPath = "C:\Users\fujitsu\.cloudflared\config.yml"
if (Test-Path $configPath) {
    Write-Host "   ✅ Config file found at: $configPath" -ForegroundColor Green
} else {
    Write-Host "   ❌ Config file not found at: $configPath" -ForegroundColor Red
    exit 1
}

# Kiểm tra credentials file
Write-Host "3. Kiểm tra Credentials file..." -ForegroundColor Yellow
$credPath = "C:\Users\fujitsu\.cloudflared\32cc775b-1764-4947-9340-eb080c27e860.json"
if (Test-Path $credPath) {
    Write-Host "   ✅ Credentials file found" -ForegroundColor Green
} else {
    Write-Host "   ❌ Credentials file not found at: $credPath" -ForegroundColor Red
    exit 1
}

# Kiểm tra localhost
Write-Host "4. Kiểm tra Development server..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ Development server running on port 3000" -ForegroundColor Green
    }
} catch {
    Write-Host "   ⚠️  Development server not running. Start with: yarn dev" -ForegroundColor Orange
}

Write-Host ""
Write-Host "🎯 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Run 'yarn dev' if not already running" -ForegroundColor White
Write-Host "   2. Run 'yarn tunnel' or '.\start-tunnel.bat'" -ForegroundColor White
Write-Host "   3. Access https://waiedu.live" -ForegroundColor White
Write-Host ""
Write-Host "✨ Everything looks good!" -ForegroundColor Green
