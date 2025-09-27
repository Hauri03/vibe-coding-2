<template>
  <section id="products" class="products">
    <div class="container">
      <h2 class="section-title">Premium Ice Cream Selection</h2>
      <p class="section-subtitle">Handcrafted flavors made with love and purpose</p>
      <div class="products-grid">
        <div 
          class="product-card" 
          v-for="product in products" 
          :key="product.id"
          ref="productCards"
        >
          <div class="product-image">
            <i class="fas fa-ice-cream fa-4x"></i>
          </div>
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <div class="product-price">${{ product.price }}</div>
          <button 
            class="btn-product" 
            @click="addToCart(product)"
            :ref="el => productButtons[product.id] = el"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const productCards = ref([])
const productButtons = ref({})

const products = ref([
  {
    id: 1,
    name: 'Classic Vanilla Bean',
    description: 'Rich, creamy vanilla made with real Madagascar vanilla beans',
    price: 8
  },
  {
    id: 2,
    name: 'Chocolate Fudge',
    description: 'Decadent chocolate ice cream with swirls of rich fudge',
    price: 8
  },
  {
    id: 3,
    name: 'Strawberry Delight',
    description: 'Fresh strawberry ice cream with real fruit pieces',
    price: 8
  },
  {
    id: 4,
    name: 'Mint Chocolate Chip',
    description: 'Refreshing mint ice cream loaded with chocolate chips',
    price: 8
  },
  {
    id: 5,
    name: 'Cookies & Cream',
    description: 'Vanilla ice cream mixed with crushed chocolate cookies',
    price: 8
  },
  {
    id: 6,
    name: 'Caramel Swirl',
    description: 'Creamy caramel ice cream with golden caramel ribbons',
    price: 8
  }
])

// Shopping cart functionality
const cart = ref([])

const addToCart = (product) => {
  // Add item to cart
  const item = {
    ...product,
    cartId: Date.now() + Math.random()
  }
  
  cart.value.push(item)
  
  // Visual feedback
  const button = productButtons.value[product.id]
  if (button) {
    button.textContent = 'Added!'
    button.style.background = '#28a745'
    
    setTimeout(() => {
      button.textContent = 'Add to Cart'
      button.style.background = ''
    }, 1500)
  }
  
  // Show success notification
  showNotification(`${product.name} added to cart!`, 'success')
  
  // Update cart display
  updateCartDisplay()
}

const updateCartDisplay = () => {
  console.log('Cart updated:', cart.value)
}

// Notification system
const showNotification = (message, type = 'info') => {
  // Create notification element
  const notification = document.createElement('div')
  notification.className = `notification notification-${type}`
  notification.textContent = message
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '15px 20px',
    borderRadius: '5px',
    color: 'white',
    fontWeight: '600',
    zIndex: '9999',
    opacity: '0',
    transform: 'translateX(100%)',
    transition: 'all 0.3s ease',
    maxWidth: '300px',
    wordWrap: 'break-word'
  })
  
  // Set background color based on type
  switch (type) {
    case 'success':
      notification.style.background = '#28a745'
      break
    case 'error':
      notification.style.background = '#dc3545'
      break
    default:
      notification.style.background = '#2E86AB'
  }
  
  // Add to DOM
  document.body.appendChild(notification)
  
  // Animate in
  setTimeout(() => {
    notification.style.opacity = '1'
    notification.style.transform = 'translateX(0)'
  }, 100)
  
  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.opacity = '0'
    notification.style.transform = 'translateX(100%)'
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 4000)
}

onMounted(() => {
  // Animate elements on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })
  
  productCards.value.forEach(card => {
    if (card) {
      card.style.opacity = '0'
      card.style.transform = 'translateY(30px)'
      card.style.transition = 'all 0.6s ease'
      observer.observe(card)
    }
  })
})

// Expose cart for potential parent component access
defineExpose({
  cart
})
</script>

<style scoped>
/* Product styles are already in main.css */
</style>