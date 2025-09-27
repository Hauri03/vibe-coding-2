<template>
  <div>
    <HeroSection />
    <AboutSection />
    <ProductsSection />
    <DonateSection />
    <ContactSection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Page metadata
useHead({
  title: 'Sweet Scoops for a Cause - Lions Club Charity Event',
  meta: [
    { 
      name: 'description', 
      content: 'Join Lions Club in making a difference, one delicious scoop at a time! Every ice cream purchase helps fund community projects and supports families in need.' 
    }
  ]
})

onMounted(() => {
  // Show welcome message
  setTimeout(() => {
    showNotification('Welcome to our charity ice cream event! 🍦', 'info')
  }, 1000)
})

// Notification system - shared function
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
</script>

<style scoped>
/* All styles are in the global CSS */
</style>