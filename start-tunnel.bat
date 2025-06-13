@echo off
echo 🚀 Khởi động Cloudflare Tunnel cho WAI Education...
echo.
echo 🔗 Website sẽ available tại: https://waiedu.live
echo 🏠 Local development: http://localhost:3000
echo.
echo 📝 Để dừng tunnel, nhấn Ctrl+C
echo ----------------------------------------

cloudflared tunnel --config C:\Users\fujitsu\.cloudflared\config.yml run
