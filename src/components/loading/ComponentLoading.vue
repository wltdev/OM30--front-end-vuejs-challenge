<script setup>
import LoadingSpinner from '@/components/loading/LoadingSpinner.vue'

defineProps({
  size: String
})
</script>
<template>
  <transition name="fade">
    <div class="component-loading">
      <LoadingSpinner :size="size" />
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.component-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
}

.hide {
  background-color: transparent !important;
}

.fade {
  &-leave-to,
  &-enter {
    opacity: 0;
  }
  &-enter-active,
  &-leave-active {
    transition: opacity 250ms ease 0s;
  }
}
</style>
