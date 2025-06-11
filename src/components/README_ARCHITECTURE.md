---
noteId: "a96a5650460311f0850a0fa50316615c"
tags: []

---

# WAI Education - Component Architecture

## 📁 Cấu trúc dự án đã được tách thành component

### 🎯 Lý do tách component:
- **Dễ bảo trì**: Mỗi section được quản lý riêng biệt
- **Tái sử dụng**: Components có thể được sử dụng ở nhiều nơi
- **Phát triển song song**: Nhiều người có thể làm việc trên các component khác nhau
- **Hiệu suất**: Lazy loading và tối ưu hóa tải trang

## 📂 Cấu trúc file:

```
src/
├── components/           # Các component HTML
│   ├── header.html      # Header navigation
│   ├── hero.html        # Landing hero section
│   ├── about.html       # About us section
│   ├── solution.html    # Our solution section
│   ├── product.html     # Products section
│   ├── competition.html # Competition section
│   ├── blog.html        # Blog section
│   ├── download.html    # Download app section
│   └── footer.html      # Footer section
│
├── styles/              # CSS được tách theo component
│   ├── main.css         # CSS chính, import tất cả
│   └── components/      # CSS cho từng component
│       ├── header.css   # Styles cho header
│       ├── hero.css     # Styles cho hero section
│       └── sections.css # Styles chung cho sections
│
├── js/                  # JavaScript modules
│   ├── components.js    # Component loader system
│   └── main.js          # Main JavaScript functionality
│
├── index.html          # File gốc (monolithic)
├── index_new.html      # File mới (component-based)
└── assets/             # Images, fonts, etc.
```

## 🔧 Cách hoạt động:

### 1. Component Loader (`js/components.js`):
- Tự động tải tất cả component HTML
- Inject vào các placeholder trong index_new.html
- Initialize các functionality sau khi load xong

### 2. CSS Modular:
- Mỗi component có CSS riêng
- Import tập trung trong `main.css`
- Tránh xung đột CSS giữa các component

### 3. File HTML chính (`index_new.html`):
- Chỉ chứa structure và placeholder
- Lightweight và tải nhanh
- Components được load bất đồng bộ

## 🚀 Cách sử dụng:

### Development:
1. Mở `index_new.html` thay vì `index.html`
2. Edit component riêng biệt trong thư mục `components/`
3. CSS được hot-reload tự động

### Thêm component mới:
1. Tạo file HTML trong `components/`
2. Thêm CSS tương ứng trong `styles/components/`
3. Update `components.js` để load component mới
4. Thêm placeholder trong `index_new.html`

### Tối ưu hóa:
- Preload các component quan trọng
- Lazy load các component ít sử dụng
- Compress và minify khi production

## 📝 Benefits của Architecture mới:

✅ **Maintainability**: Dễ sửa đổi từng phần riêng biệt
✅ **Scalability**: Dễ thêm/xóa section mới
✅ **Performance**: Tải component theo yêu cầu
✅ **Collaboration**: Nhiều dev có thể làm việc song song
✅ **Testing**: Test từng component độc lập
✅ **Reusability**: Component có thể tái sử dụng

## 🔄 Migration:

Để chuyển từ file cũ sang file mới:
1. Copy `index.html` thành backup
2. Rename `index_new.html` thành `index.html`
3. Tất cả functionality vẫn hoạt động như cũ

## 🛠️ Tools hỗ trợ:

- **Vite**: Module bundler với HMR
- **Tailwind CSS**: Utility-first CSS framework
- **ES6 Modules**: Modern JavaScript imports
- **Fetch API**: Async component loading 