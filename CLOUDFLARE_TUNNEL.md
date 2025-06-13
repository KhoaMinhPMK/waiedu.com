# 🌐 Hướng dẫn setup Cloudflare Tunnel cho WAI Education

## 📋 Tổng quan

File này hướng dẫn cách cấu hình để host localhost ra public sử dụng Cloudflare Tunnel, cho phép người khác truy cập vào website từ bất kỳ đâu.

## ✅ Yêu cầu

- ✅ Cloudflared đã cài đặt
- ✅ Domain `waiedu.live` đã được config
- ✅ File config.yml đã được tạo

## 🚀 Cách sử dụng

### Phương pháp 1: Sử dụng npm scripts (Khuyến nghị)

```bash
# Chạy cả dev server và tunnel cùng lúc
yarn dev:tunnel

# Hoặc chạy riêng tunnel (khi dev server đã chạy)
yarn tunnel

# Chạy preview build với tunnel
yarn preview:tunnel
```

### Phương pháp 2: Sử dụng script files

```bash
# Windows PowerShell
.\start-tunnel.ps1

# Windows Command Prompt
start-tunnel.bat
```

### Phương pháp 3: Chạy thủ công

```bash
# Terminal 1: Chạy dev server
yarn dev

# Terminal 2: Chạy tunnel
cloudflared tunnel --config C:\Users\fujitsu\.cloudflared\config.yml run
```

## 🔗 Truy cập

Sau khi chạy thành công:

- 🌐 **Public URL**: https://waiedu.live
- 🏠 **Local URL**: http://localhost:3000

## 📁 Files đã được tạo/cập nhật

### 1. `vite.config.js`
- Cấu hình `host: '0.0.0.0'` để có thể access từ bên ngoài
- `allowedHosts: 'all'` để cho phép Cloudflare tunnel
- Tắt auto-open browser
- Cấu hình HMR và CORS

### 2. `package.json`
- Thêm script `dev:tunnel` - chạy cả dev và tunnel
- Thêm script `tunnel` - chỉ chạy tunnel
- Thêm script `preview:tunnel` - preview với tunnel

### 3. `start-tunnel.ps1`
- PowerShell script để khởi động tự động
- Kiểm tra requirements
- Chạy background processes

### 4. `start-tunnel.bat`
- Windows batch script đơn giản
- Backup option cho PowerShell

## 🔧 Troubleshooting

### ❌ Lỗi "cloudflared command not found"

```bash
# Kiểm tra cài đặt
cloudflared --version

# Nếu chưa cài, download từ:
# https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
```

### ❌ Lỗi "config file not found"

Kiểm tra đường dẫn config file:
```
C:\Users\fujitsu\.cloudflared\config.yml
```

### ❌ Tunnel không connect

1. Kiểm tra tunnel status:
```bash
cloudflared tunnel list
```

2. Kiểm tra credentials file:
```
C:\Users\fujitsu\.cloudflared\32cc775b-1764-4947-9340-eb080c27e860.json
```

### ❌ Website không load

1. Kiểm tra dev server có chạy không:
```bash
curl http://localhost:3000
```

2. Kiểm tra port trong config.yml (phải là 3000)

### ❌ Hot reload không hoạt động qua tunnel

Hot reload (HMR) chỉ hoạt động trên localhost. Với public domain, bạn cần refresh trang thủ công sau khi thay đổi code.

## 🎯 Best Practices

### Development workflow

1. **Khi code một mình**:
```bash
yarn dev  # Chỉ cần localhost
```

2. **Khi chia sẻ với team**:
```bash
yarn dev:tunnel  # Chạy cả tunnel
```

3. **Khi demo/test**:
```bash
yarn build
yarn preview:tunnel
```

### Security considerations

- ⚠️ Chỉ chia sẻ public URL khi cần thiết
- 🔒 Không commit credentials files vào git
- 🛡️ Tắt tunnel khi không sử dụng

### Performance tips

- 🚀 Build mode (`yarn preview:tunnel`) sẽ nhanh hơn dev mode
- 📦 Sử dụng `yarn build` trước khi demo chính thức
- 🔄 HMR chỉ hoạt động trên localhost:3000

## 📞 Support

Nếu gặp vấn đề:

1. Kiểm tra logs của cloudflared
2. Restart cả dev server và tunnel
3. Kiểm tra firewall/antivirus
4. Tham khảo [Cloudflare docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)

---

**Chúc bạn deploy thành công! 🎉**
