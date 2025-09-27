<template>
  <header class="header" ref="header">
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <i class="fas fa-heart"></i>
          <span>Lions Club</span>
        </div>
        <ul class="nav-menu" :class="{ active: mobileMenuOpen }">
          <li><a href="#home" @click="scrollToSection('home')">Home</a></li>
          <li><a href="#about" @click="scrollToSection('about')">About</a></li>
          <li><a href="#products" @click="scrollToSection('products')">Ice Cream</a></li>
          <li><a href="#donate" @click="scrollToSection('donate')">Donate</a></li>
          <li><a href="#contact" @click="scrollToSection('contact')">Contact</a></li>
        </ul>
        <div 
          class="hamburger" 
          :class="{ active: mobileMenuOpen }"
          @click="toggleMobileMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const header = ref(null)
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const scrollToSection = (sectionId) => {
  // Close mobile menu
  mobileMenuOpen.value = false
  
  // Scroll to section
  const targetSection = document.getElementById(sectionId)
  if (targetSection) {
    const offsetTop = targetSection.offsetTop - 80 // Account for fixed header
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
}

const handleScroll = () => {
  if (header.value) {
    if (window.scrollY > 100) {
      header.value.style.background = 'rgba(46, 134, 171, 0.95)'
      header.value.style.backdropFilter = 'blur(10px)'
    } else {
      header.value.style.background = 'linear-gradient(135deg, #2E86AB 0%, #A23B72 100%)'
      header.value.style.backdropFilter = 'none'
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.hamburger.active span:nth-child(1) {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(45deg) translate(-5px, -6px);
}
</style>