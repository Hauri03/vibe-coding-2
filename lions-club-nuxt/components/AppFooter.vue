<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>Lions Club</h4>
          <p>Serving our community with pride and dedication since 1917. Together, we make a difference.</p>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin"></i></a>
          </div>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about" @click="scrollToSection('about')">About Us</a></li>
            <li><a href="#products" @click="scrollToSection('products')">Ice Cream</a></li>
            <li><a href="#donate" @click="scrollToSection('donate')">Donate</a></li>
            <li><a href="#contact" @click="scrollToSection('contact')">Contact</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Our Programs</h4>
          <ul>
            <li><a href="#">Vision Screening</a></li>
            <li><a href="#">Youth Programs</a></li>
            <li><a href="#">Community Service</a></li>
            <li><a href="#">Disaster Relief</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Contact Info</h4>
          <p>📍 123 Main Street, Your City</p>
          <p>📞 (555) 123-4567</p>
          <p>✉️ info@lionsclub-charity.org</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Lions Club Charity Event. All rights reserved. | Made with ❤️ for our community</p>
      </div>
    </div>
  </footer>
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
/* Footer styles are already in main.css */
</style>