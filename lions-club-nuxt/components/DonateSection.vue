<template>
  <section id="donate" class="donate">
    <div class="container">
      <h2 class="section-title">Support Our Cause</h2>
      <div class="donate-grid">
        <div class="donate-text">
          <h3>Every Contribution Counts</h3>
          <p>Your generous donations help us expand our community outreach programs, provide essential services to families in need, and fund educational initiatives.</p>
          <ul class="impact-list">
            <li><i class="fas fa-check"></i> $25 provides a week of meals for a family</li>
            <li><i class="fas fa-check"></i> $50 funds school supplies for a child</li>
            <li><i class="fas fa-check"></i> $100 supports community health programs</li>
            <li><i class="fas fa-check"></i> $250 helps fund vision screenings</li>
          </ul>
        </div>
        <div class="donate-form">
          <div class="donation-amounts">
            <button 
              v-for="amount in presetAmounts"
              :key="amount"
              class="amount-btn" 
              :class="{ active: selectedAmount === amount }"
              @click="selectAmount(amount)"
            >
              ${{ amount }}
            </button>
          </div>
          <input 
            type="number" 
            placeholder="Custom amount" 
            class="custom-amount"
            v-model="customAmount"
            @input="onCustomAmountChange"
          >
          <button 
            class="btn-donate"
            @click="processDonation"
            :disabled="isProcessing"
          >
            {{ isProcessing ? 'Processing...' : 'Donate Now' }}
          </button>
          <p class="secure-notice">
            <i class="fas fa-lock"></i>
            Secure donation processing
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const presetAmounts = ref([25, 50, 100, 250])
const selectedAmount = ref(null)
const customAmount = ref('')
const isProcessing = ref(false)

const selectAmount = (amount) => {
  selectedAmount.value = amount
  customAmount.value = ''
}

const onCustomAmountChange = () => {
  selectedAmount.value = null
}

const processDonation = async () => {
  let donationAmount = ''
  
  // Check if a preset amount is selected
  if (selectedAmount.value) {
    donationAmount = selectedAmount.value
  } else if (customAmount.value) {
    donationAmount = customAmount.value
  }
  
  if (donationAmount && donationAmount > 0) {
    // Simulate donation processing
    isProcessing.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      showNotification(`Thank you for your $${donationAmount} donation!`, 'success')
      
      // Reset form
      selectedAmount.value = null
      customAmount.value = ''
    } catch (error) {
      showNotification('Donation failed. Please try again.', 'error')
    } finally {
      isProcessing.value = false
    }
  } else {
    showNotification('Please select or enter a donation amount.', 'error')
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
</script>

<style scoped>
/* Donation styles are already in main.css */
</style>