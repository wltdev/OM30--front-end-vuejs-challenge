<script setup>
import Sidebar from '@components/layout/Sidebar.vue'
</script>

<template>
  <div class="app">
    <Sidebar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss"></style>
