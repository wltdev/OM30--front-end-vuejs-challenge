<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

import Sidebar from '@components/layout/Sidebar.vue'

const store = useStore()
const isLogged = computed(() => store.getters['getIsLogged'])
</script>

<template>
  <div class="app">
    <Sidebar v-if="isLogged" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss"></style>
