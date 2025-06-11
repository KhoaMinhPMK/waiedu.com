---
noteId: "7f5fd7d045ff11f0850a0fa50316615c"
tags: []

---

# 🚀 Getting Started - WAI Education

Chào mừng bạn đến với project WAI Education! Đây là hướng dẫn bắt đầu nhanh để bạn có thể chạy project trong vòng 5 phút.

## ⚡ Quick Start (5 phút)

### Bước 1: Kiểm tra yêu cầu hệ thống ✅

Đảm bảo bạn đã cài đặt:
- **Node.js** >= 16.0.0 ([Download](https://nodejs.org/))
- **Yarn** ([Cài đặt](https://yarnpkg.com/getting-started/install))

Kiểm tra phiên bản:
```bash
node --version  # v16.0.0 hoặc cao hơn
yarn --version  # 1.22.0 hoặc cao hơn
```

### Bước 2: Cài đặt dependencies 📦

```bash
# Cài đặt tất cả packages
yarn install
```

### Bước 3: Chạy development server 🎯

```bash
# Khởi động server
yarn dev
```

✨ **Thành công!** Website sẽ tự động mở tại `http://localhost:3000`

## 🎯 Những gì bạn sẽ thấy

### 🏠 Homepage
- **Hero section** với animation mượt mà
- **Features section** với 6 tính năng chính
- **Statistics** với số liệu ấn tượng
- **Footer** đầy đủ thông tin

### 📱 Responsive Design
- ✅ Mobile-first design
- ✅ Tablet optimization
- ✅ Desktop experience
- ✅ Large screen support

### 🎨 Modern UI/UX
- ✅ Tailwind CSS styling
- ✅ Smooth animations
- ✅ Interactive components
- ✅ Professional color scheme

## 🛠️ Các lệnh quan trọng

| Lệnh | Mục đích | Khi nào sử dụng |
|------|----------|-----------------|
| `yarn dev` | Chạy development server | Khi đang code |
| `yarn build` | Build cho production | Chuẩn bị deploy |
| `yarn preview` | Xem preview của build | Test build locally |
| `yarn format` | Format code đẹp | Trước khi commit |

## 📁 Cấu trúc project tổng quan

```
waiedu-web/
├── 📁 src/                    # Source code chính
│   ├── 📄 index.html         # File HTML chính
│   ├── 📁 styles/            # CSS files
│   ├── 📁 js/                # JavaScript files
│   └── 📁 components/        # Reusable components
├── 📁 public/                # Static assets
├── 📄 package.json           # Dependencies & scripts
├── 📄 tailwind.config.js     # Tailwind configuration
├── 📄 vite.config.js         # Vite configuration
└── 📄 README.md              # Documentation
```

## 🎨 Customize nhanh

### Thay đổi màu chính
Mở `tailwind.config.js` và sửa:
```javascript
primary: {
  500: '#3b82f6', // Thay màu này
  600: '#2563eb', // Và màu này
}
```

### Thay đổi tên website
Mở `src/index.html` và tìm:
```html
<title>WAI Education - Nền tảng học tập thông minh</title>
```

### Thêm content mới
Chỉnh sửa file `src/index.html` hoặc tạo components mới trong `src/components/`

## 🚀 Deploy nhanh

### Vercel (1-click deploy)
```bash
yarn build
vercel --prod
```

### Netlify
```bash
yarn build
# Kéo thả folder dist/ vào Netlify
```

## 🔧 Troubleshooting

### ❌ Lỗi "yarn command not found"
```bash
npm install -g yarn
```

### ❌ Lỗi port 3000 đã được sử dụng
```bash
# Dừng process đang chạy hoặc
yarn dev --port 3001
```

### ❌ Lỗi dependencies
```bash
# Xóa và cài lại
rm -rf node_modules yarn.lock
yarn install
```

### ❌ CSS không load
```bash
# Build lại CSS
yarn dev
# Hoặc
yarn build
```

## 📚 Học thêm

### Tài liệu chính thức
- 📖 [Vite Documentation](https://vitejs.dev/)
- 🎨 [Tailwind CSS Docs](https://tailwindcss.com/docs)
- ⚡ [Alpine.js Guide](https://alpinejs.dev/start-here)

### Video tutorials
- 🎥 [Tailwind CSS Crash Course](https://www.youtube.com/watch?v=UBOj6rqRUME)
- 🎥 [Vite.js Tutorial](https://www.youtube.com/watch?v=KCrXgy8qtjM)

### Best practices
- 📋 Đọc file `DEVELOPMENT.md` cho chi tiết
- 🔍 Xem code trong `src/` để hiểu cấu trúc
- 🎯 Theo dõi các TODO comments trong code

## 💬 Cần hỗ trợ?

- 🐛 **Bug report**: Tạo issue trên GitHub
- 💡 **Feature request**: Thảo luận trong Discussions
- 📧 **Email**: support@waieducation.com
- 💬 **Chat**: Join Discord community

## 🎉 Bước tiếp theo

1. ✅ Chạy thành công project
2. 🔍 Khám phá code trong `src/`
3. 🎨 Thử thay đổi màu sắc/text
4. 📖 Đọc `DEVELOPMENT.md` để hiểu sâu hơn
5. 🚀 Bắt đầu build tính năng của riêng bạn!

---

**Chúc bạn coding vui vẻ! 🎯**

*Tạo bởi WAI Education Team với ❤️* 