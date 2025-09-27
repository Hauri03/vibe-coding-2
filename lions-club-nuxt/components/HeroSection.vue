<template>
  <section id="home" class="hero">
    <div class="hero-content">
      <div>
        <h1 class="hero-title">Sweet Scoops for a Cause</h1>
        <p class="hero-subtitle">Join Lions Club in making a difference, one delicious scoop at a time!</p>
        <p class="hero-description">Every ice cream purchase helps fund community projects and supports families in need. Together, we can create positive change while enjoying premium ice cream.</p>
        <div class="hero-buttons">
          <a href="#products" class="btn-primary" @click="scrollToSection('products')">Order Ice Cream</a>
          <a href="#donate" class="btn-secondary" @click="scrollToSection('donate')">Donate Now</a>
        </div>
      </div>
      <div class="hero-image">
        <div class="ice-cream-visual">
          <i class="fas fa-ice-cream fa-8x"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const scrollToSection = (sectionId) => {
  const targetSection = document.getElementById(sectionId)
  if (targetSection) {
    const offsetTop = targetSection.offsetTop - 80 // Account for fixed header
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped>
/* Hero styles are already in main.css */
</style>