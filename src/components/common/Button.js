/**
 * Button Component - Tạo button với các variant và size khác nhau
 * @param {Object} options - Các tùy chọn cho button
 * @param {string} options.text - Text hiển thị trên button
 * @param {string} options.variant - Variant của button (primary, secondary, outline, ghost)
 * @param {string} options.size - Kích thước button (sm, md, lg)
 * @param {string} options.icon - Icon SVG (optional)
 * @param {boolean} options.disabled - Trạng thái disabled
 * @param {boolean} options.loading - Trạng thái loading
 * @param {Function} options.onClick - Callback khi click
 * @returns {HTMLButtonElement} Button element
 */
export function createButton(options = {}) {
  const {
    text = 'Button',
    variant = 'primary',
    size = 'md',
    icon = null,
    disabled = false,
    loading = false,
    onClick = () => {}
  } = options

  // Tạo button element
  const button = document.createElement('button')
  
  // Base classes
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'rounded-lg',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed'
  ]

  // Variant classes
  const variantClasses = {
    primary: [
      'bg-primary-600',
      'hover:bg-primary-700',
      'text-white',
      'focus:ring-primary-500',
      'shadow-sm',
      'hover:shadow-md'
    ],
    secondary: [
      'bg-secondary-600',
      'hover:bg-secondary-700',
      'text-white',
      'focus:ring-secondary-500',
      'shadow-sm',
      'hover:shadow-md'
    ],
    outline: [
      'border-2',
      'border-primary-600',
      'text-primary-600',
      'hover:bg-primary-600',
      'hover:text-white',
      'focus:ring-primary-500',
      'bg-transparent'
    ],
    ghost: [
      'text-gray-700',
      'hover:bg-gray-100',
      'focus:ring-gray-500',
      'bg-transparent'
    ]
  }

  // Size classes
  const sizeClasses = {
    sm: ['px-3', 'py-1.5', 'text-sm'],
    md: ['px-4', 'py-2', 'text-base'],
    lg: ['px-6', 'py-3', 'text-lg']
  }

  // Apply classes
  const allClasses = [
    ...baseClasses,
    ...(variantClasses[variant] || variantClasses.primary),
    ...(sizeClasses[size] || sizeClasses.md)
  ]

  button.className = allClasses.join(' ')

  // Set attributes
  button.type = 'button'
  button.disabled = disabled || loading

  // Create button content
  const content = document.createElement('span')
  content.className = 'flex items-center gap-2'

  // Add loading spinner if loading
  if (loading) {
    const spinner = document.createElement('div')
    spinner.className = 'w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin'
    content.appendChild(spinner)
  }

  // Add icon if provided
  if (icon && !loading) {
    const iconElement = document.createElement('span')
    iconElement.innerHTML = icon
    iconElement.className = 'w-4 h-4'
    content.appendChild(iconElement)
  }

  // Add text
  const textElement = document.createElement('span')
  textElement.textContent = loading ? 'Đang xử lý...' : text
  content.appendChild(textElement)

  button.appendChild(content)

  // Add click handler
  button.addEventListener('click', (e) => {
    if (!disabled && !loading) {
      onClick(e)
    }
  })

  // Add hover effects
  button.addEventListener('mouseenter', () => {
    if (!disabled && !loading) {
      button.style.transform = 'translateY(-1px)'
    }
  })

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)'
  })

  return button
}

/**
 * Tạo button group với nhiều button
 * @param {Array} buttons - Array các button options
 * @returns {HTMLDivElement} Button group element
 */
export function createButtonGroup(buttons = []) {
  const group = document.createElement('div')
  group.className = 'inline-flex rounded-lg shadow-sm'
  
  buttons.forEach((buttonOptions, index) => {
    const button = createButton(buttonOptions)
    
    // Remove individual rounded corners for middle buttons
    if (index === 0) {
      button.classList.add('rounded-r-none')
    } else if (index === buttons.length - 1) {
      button.classList.add('rounded-l-none', '-ml-px')
    } else {
      button.classList.add('rounded-none', '-ml-px')
    }
    
    group.appendChild(button)
  })
  
  return group
}

/**
 * Tạo floating action button
 * @param {Object} options - Button options
 * @returns {HTMLButtonElement} FAB element
 */
export function createFAB(options = {}) {
  const {
    icon,
    position = 'bottom-right',
    onClick = () => {}
  } = options

  const fab = createButton({
    ...options,
    variant: 'primary',
    size: 'lg'
  })

  // Add FAB specific classes
  fab.classList.add(
    'fixed',
    'z-50',
    'w-14',
    'h-14',
    'rounded-full',
    'shadow-lg',
    'hover:shadow-xl'
  )

  // Position classes
  const positions = {
    'top-left': ['top-4', 'left-4'],
    'top-right': ['top-4', 'right-4'],
    'bottom-left': ['bottom-4', 'left-4'],
    'bottom-right': ['bottom-4', 'right-4']
  }

  const positionClasses = positions[position] || positions['bottom-right']
  fab.classList.add(...positionClasses)

  return fab
}

// Export default
export default {
  createButton,
  createButtonGroup,
  createFAB
} 