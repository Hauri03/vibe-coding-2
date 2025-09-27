<template>
  <section id="about" class="about">
    <div class="container">
      <h2 class="section-title">About Our Mission</h2>
      <div class="about-grid">
        <div class="about-text">
          <h3>Making a Difference Together</h3>
          <p>Lions Club International is the world's largest service club organization, dedicated to serving communities worldwide. Our ice cream charity event brings our community together for a sweet cause.</p>
          <p>Every purchase directly supports local families, educational programs, and community development projects. Your participation helps us continue our mission of serving those in need.</p>
          <div class="stats">
            <div class="stat" v-for="stat in stats" :key="stat.label">
              <span class="stat-number" ref="statNumbers">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
        <div class="about-image">
          <div class="lions-visual">
            <i class="fas fa-users fa-6x"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const statNumbers = ref([])
const stats = ref([
  { value: '500+', label: 'Families Helped' },
  { value: '$25,000', label: 'Funds Raised' },
  { value: '50+', label: 'Volunteers' }
])

// Animation for counters
const animateCounters = () => {
  statNumbers.value.forEach((counter, index) => {
    const targetText = stats.value[index].value
    const target = parseInt(targetText.replace(/\D/g, ''))
    const increment = target / 100
    let current = 0
    
    const updateCounter = () => {
      if (current < target) {
        current += increment
        if (targetText.includes('$')) {
          counter.textContent = `$${Math.floor(current).toLocaleString()}`
        } else if (targetText.includes('+')) {
          counter.textContent = `${Math.floor(current)}+`
        } else {
          counter.textContent = Math.floor(current)
        }
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = targetText
      }
    }
    
    updateCounter()
  })
}

onMounted(() => {
  // Intersection Observer for stats animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters()
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })
  
  const statsSection = document.querySelector('.stats')
  if (statsSection) {
    observer.observe(statsSection)
  }
})
</script>

<style scoped>
/* About styles are already in main.css */
</style>