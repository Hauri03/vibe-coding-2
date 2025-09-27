<template>
  <section id="contact" class="contact">
    <div class="container">
      <h2 class="section-title">Get In Touch</h2>
      <div class="contact-grid">
        <div class="contact-info">
          <div 
            class="contact-item"
            v-for="item in contactInfo"
            :key="item.title"
            ref="contactItems"
          >
            <i :class="item.icon"></i>
            <div>
              <h4>{{ item.title }}</h4>
              <p v-html="item.content"></p>
            </div>
          </div>
        </div>
        <div class="contact-form">
          <form @submit.prevent="submitForm">
            <input 
              type="text" 
              placeholder="Your Name" 
              required
              v-model="form.name"
            >
            <input 
              type="email" 
              placeholder="Your Email" 
              required
              v-model="form.email"
            >
            <input 
              type="text" 
              placeholder="Subject" 
              required
              v-model="form.subject"
            >
            <textarea 
              placeholder="Your Message" 
              rows="5" 
              required
              v-model="form.message"
            ></textarea>
            <button 
              type="submit" 
              class="btn-submit"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const contactItems = ref([])
const isSubmitting = ref(false)

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const contactInfo = ref([
  {
    title: 'Location',
    icon: 'fas fa-map-marker-alt',
    content: 'Community Center<br>123 Main Street<br>Your City, State 12345'
  },
  {
    title: 'Phone',
    icon: 'fas fa-phone',
    content: '(555) 123-4567'
  },
  {
    title: 'Email',
    icon: 'fas fa-envelope',
    content: 'info@lionsclub-charity.org'
  },
  {
    title: 'Event Hours',
    icon: 'fas fa-clock',
    content: 'Saturday & Sunday<br>10:00 AM - 6:00 PM'
  }
])

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success')
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    showNotification('Failed to send message. Please try again.', 'error')
  } finally {
    isSubmitting.value = false
  }
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
  
  contactItems.value.forEach(item => {
    if (item) {
      item.style.opacity = '0'
      item.style.transform = 'translateY(30px)'
      item.style.transition = 'all 0.6s ease'
      observer.observe(item)
    }
  })
})
</script>

<style scoped>
/* Contact styles are already in main.css */
</style>