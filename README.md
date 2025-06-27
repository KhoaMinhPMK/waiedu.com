# 🚀 WAI Education - Nền tảng học tập thông minh

Một project web hiện đại được xây dựng với **Vite + Tailwind CSS + Alpine.js**, tạo ra trải nghiệm học tập tuyệt vời với giao diện đẹp mắt và hiệu suất cao.

## ✨ Tính năng nổi bật

- 🎨 **Giao diện hiện đại**: Thiết kế responsive với Tailwind CSS
- ⚡ **Hiệu suất cao**: Sử dụng Vite để build và dev server nhanh chóng
- 🔄 **Tương tác mượt mà**: Alpine.js cho các component reactive
- 📱 **Responsive Design**: Hoạt động tốt trên mọi thiết bị
- 🎭 **Animations**: Các hiệu ứng chuyển động mượt mà
- 🔧 **Code Quality**: ESLint + Prettier tự động format code
- 🌟 **Modern JavaScript**: ES6+ modules và async/await

## 📁 Cấu trúc project

```
waiedu-web/
├── src/                          # Source code chính
│   ├── index.html               # File HTML chính
│   ├── styles/                  # Stylesheets
│   │   └── main.css            # CSS chính với Tailwind
│   └── js/                      # JavaScript files
│       └── main.js             # JavaScript chính
├── dist/                        # Build output (auto-generated)
├── node_modules/               # Dependencies (auto-generated)
├── package.json                # Project dependencies và scripts
├── vite.config.js             # Cấu hình Vite
├── tailwind.config.js         # Cấu hình Tailwind CSS
├── postcss.config.js          # Cấu hình PostCSS
├── .eslintrc.json            # Cấu hình ESLint
├── .prettierrc               # Cấu hình Prettier
├── .gitignore               # Git ignore rules
└── README.md               # Documentation
```

## 🛠️ Cài đặt và sử dụng

### Yêu cầu hệ thống
- Node.js >= 16.0.0
- npm >= 8.0.0 hoặc yarn >= 1.22.0

### 1. Cài đặt dependencies

```bash
# Sử dụng npm
npm install

# Hoặc sử dụng yarn
yarn install
```

### 2. Chạy development server

```bash
# Sử dụng npm
npm run dev

# Hoặc sử dụng yarn
yarn dev
```

Server sẽ chạy tại `http://localhost:3000` và tự động mở browser.

### 3. Build cho production

```bash
# Sử dụng npm
npm run build

# Hoặc sử dụng yarn
yarn build
```

File build sẽ được tạo trong thư mục `dist/`.

### 4. Preview build

```bash
# Sử dụng npm
npm run preview

# Hoặc sử dụng yarn
yarn preview
```

## 📋 Các scripts có sẵn

| Script | Mô tả |
|--------|--------|
| `npm run dev` | Chạy development server |
| `npm run build` | Build project cho production |
| `npm run preview` | Preview production build |
| `npm run lint` | Kiểm tra code với ESLint |
| `npm run lint:fix` | Tự động fix lỗi ESLint |
| `npm run format` | Format code với Prettier |
| `npm run clean` | Xóa thư mục dist |

## 🎨 Customization

### Thay đổi theme colors

Mở file `tailwind.config.js` và chỉnh sửa trong phần `theme.extend.colors`:

```javascript
colors: {
  primary: {
    // Thay đổi màu primary của bạn ở đây
    500: '#3b82f6',
    600: '#2563eb',
    // ...
  }
}
```

### Thêm animations mới

Trong file `tailwind.config.js`, thêm vào phần `theme.extend.animation`:

```javascript
animation: {
  'custom-bounce': 'bounce 1s infinite',
  // Thêm animation mới
}
```

### Thêm components mới

Tạo file component mới trong `src/components/` và import vào `main.js`.

## 🔧 Technologies sử dụng

- **[Vite](https://vitejs.dev/)** - Build tool và dev server siêu nhanh
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Alpine.js](https://alpinejs.dev/)** - Lightweight reactive framework
- **[PostCSS](https://postcss.org/)** - CSS processor
- **[ESLint](https://eslint.org/)** - JavaScript linter
- **[Prettier](https://prettier.io/)** - Code formatter

## 📱 Browser Support

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 🤝 Contributing

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📝 License

Project này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## 📞 Liên hệ

- **Email**: contact@waieducation.com
- **Website**: https://waieducation.com
- **GitHub**: https://github.com/yourusername/waiedu-web

## 🙏 Acknowledgments

- [Heroicons](https://heroicons.com/) cho các icons đẹp
- [Google Fonts](https://fonts.google.com/) cho font Inter
- [Unsplash](https://unsplash.com/) cho các hình ảnh chất lượng cao

---

**Được tạo với ❤️ bởi WAI Education Team** "# waiedu.com" 
"# waiedu-web-client" 
