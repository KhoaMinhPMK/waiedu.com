# 📦 Components Directory

Thư mục này chứa các component tái sử dụng cho project. Các component được tổ chức theo cấu trúc module để dễ dàng maintain và scale.

## 📁 Cấu trúc

```
components/
├── common/              # Các component dùng chung
│   ├── Button.js       # Button component
│   ├── Modal.js        # Modal component
│   └── Loading.js      # Loading spinner
├── layout/             # Layout components
│   ├── Header.js       # Header component
│   ├── Footer.js       # Footer component
│   └── Sidebar.js      # Sidebar component
├── forms/              # Form components
│   ├── Input.js        # Input field
│   ├── Select.js       # Select dropdown
│   └── Checkbox.js     # Checkbox component
└── utils/              # Utility components
    ├── ScrollToTop.js  # Scroll to top button
    └── LazyImage.js    # Lazy loading image
```

## 🔧 Cách sử dụng

### Tạo component mới

1. Tạo file `.js` trong thư mục phù hợp
2. Export component function
3. Import và sử dụng trong `main.js`

### Ví dụ tạo component:

```javascript
// components/common/Button.js
export function createButton(options = {}) {
  const {
    text = 'Button',
    variant = 'primary',
    size = 'medium',
    onClick = () => {}
  } = options

  const button = document.createElement('button')
  button.textContent = text
  button.className = `btn btn-${variant} btn-${size}`
  button.addEventListener('click', onClick)
  
  return button
}
```

### Sử dụng component:

```javascript
// main.js
import { createButton } from './components/common/Button.js'

const myButton = createButton({
  text: 'Click me',
  variant: 'secondary',
  onClick: () => alert('Clicked!')
})

document.body.appendChild(myButton)
```

## 📝 Quy tắc đặt tên

- Sử dụng PascalCase cho tên file component
- Sử dụng camelCase cho function names
- Prefix `create` cho các factory functions
- Prefix `init` cho các initialization functions

## 🎨 Styling

Các component sử dụng Tailwind CSS classes. Tránh viết custom CSS trừ khi thực sự cần thiết.

## 📚 Documentation

Mỗi component nên có:
- JSDoc comments
- Ví dụ sử dụng
- Props/options documentation
- Return value description 
noteId: "cdf105a045fe11f0850a0fa50316615c"
tags: []

---

 