# 🔧 Development Guide

Hướng dẫn chi tiết cho việc phát triển và customize project WAI Education.

## 🚀 Quick Start

### 1. Clone và setup
```bash
git clone <repository-url>
cd waiedu-web
yarn install
```

### 2. Chạy development server
```bash
yarn dev
```

Truy cập http://localhost:3000 để xem website.

### 3. Build cho production
```bash
yarn build
yarn preview
```

## 📝 Development Scripts

| Command | Mô tả | Sử dụng khi |
|---------|--------|-------------|
| `yarn dev` | Dev server + hot reload | Đang code |
| `yarn build` | Build production | Chuẩn bị deploy |
| `yarn preview` | Preview build locally | Test trước khi deploy |
| `yarn lint` | Check code quality | Trước khi commit |
| `yarn lint:fix` | Auto fix lint errors | Clean up code |
| `yarn format` | Format code với Prettier | Make code đẹp |

## 🎨 Customization Guide

### Thay đổi màu sắc theme

**File**: `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Thay đổi màu chính ở đây
        50: '#eff6ff',
        500: '#3b82f6', // Màu chính
        600: '#2563eb', // Hover state
        700: '#1d4ed8', // Active state
      }
    }
  }
}
```

### Thêm fonts mới

1. **Thêm vào HTML** (`src/index.html`):
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;500;700&display=swap" rel="stylesheet">
```

2. **Update Tailwind config**:
```javascript
fontFamily: {
  sans: ['YourFont', 'Inter', 'system-ui', 'sans-serif'],
}
```

### Tạo component mới

1. **Tạo file component** trong `src/components/`:
```javascript
// src/components/common/MyComponent.js
export function createMyComponent(options = {}) {
  const element = document.createElement('div')
  element.className = 'my-component-class'
  return element
}
```

2. **Import và sử dụng** trong `src/js/main.js`:
```javascript
import { createMyComponent } from '../components/common/MyComponent.js'

const myComp = createMyComponent({ /* options */ })
document.body.appendChild(myComp)
```

## 🏗️ Cấu trúc File

```
src/
├── index.html              # Entry point
├── styles/
│   └── main.css           # CSS chính + Tailwind
├── js/
│   └── main.js            # JavaScript chính
└── components/            # Reusable components
    ├── common/            # UI components
    ├── layout/            # Layout components
    └── forms/             # Form components
```

## 📱 Responsive Design

Project sử dụng mobile-first approach với breakpoints:

```css
/* Mobile: < 640px (mặc định) */
.text-base

/* Tablet: >= 640px */
.sm:text-lg

/* Desktop: >= 768px */
.md:text-xl

/* Large Desktop: >= 1024px */
.lg:text-2xl

/* Extra Large: >= 1280px */
.xl:text-3xl
```

## 🎭 Animations & Effects

### Sử dụng animations có sẵn:
```html
<div class="animate-fade-in">Fade in</div>
<div class="animate-slide-up">Slide up</div>
<div class="animate-bounce-in">Bounce in</div>
```

### Tạo animation mới:
1. **Thêm vào Tailwind config**:
```javascript
animation: {
  'my-animation': 'myKeyframes 1s ease-in-out'
},
keyframes: {
  myKeyframes: {
    '0%': { transform: 'scale(0)' },
    '100%': { transform: 'scale(1)' }
  }
}
```

2. **Sử dụng**:
```html
<div class="animate-my-animation">Content</div>
```

## 🔧 Performance Tips

### 1. Lazy Loading Images
```html
<img data-src="image.jpg" class="lazy" alt="Description">
```

### 2. Code Splitting
```javascript
// Dynamic import cho components lớn
const MyComponent = await import('./components/MyComponent.js')
```

### 3. Optimize Build
```bash
# Analyze bundle size
yarn build --analyze

# Clean cache
yarn clean
```

## 🐛 Debugging

### 1. CSS Issues
- Sử dụng browser dev tools
- Check Tailwind classes trong console
- Verify CSS build output

### 2. JavaScript Errors
- Check browser console
- Use debugger statements
- Enable source maps

### 3. Build Issues
```bash
# Clear cache
rm -rf node_modules/.cache
rm -rf dist

# Reinstall
yarn install
```

## 📋 Code Style Guide

### HTML
- Sử dụng semantic HTML5 tags
- Luôn có alt attribute cho images
- Proper heading hierarchy (h1 -> h2 -> h3...)

### CSS
- Ưu tiên Tailwind classes
- Tránh inline styles
- Sử dụng CSS custom properties cho themes

### JavaScript
- ES6+ modules
- Async/await thay vì callbacks
- Proper error handling
- JSDoc comments cho functions

## 🔄 Git Workflow

### Branch naming:
- `feature/new-component`
- `fix/bug-description`
- `update/dependency-name`

### Commit messages:
```
feat: add new hero section
fix: mobile menu not closing
style: update button hover effects
docs: update README
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
yarn build
# Upload dist/ folder
```

### GitHub Pages
```bash
yarn build
# Push dist/ to gh-pages branch
```

## 📞 Support

- 📧 Email: dev@waieducation.com
- 💬 Discord: [Community Server]
- 📖 Docs: [Documentation Site]
- 🐛 Issues: [GitHub Issues]

---

**Happy Coding! 🎉** 