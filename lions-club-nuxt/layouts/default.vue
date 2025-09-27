<template>
  <div>
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
// Auto-imported components don't need explicit imports in Nuxt 3
</script>

<style scoped>
main {
  min-height: calc(100vh - 200px);
}
</style>