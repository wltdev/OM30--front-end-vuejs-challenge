<script setup>
defineProps({
  iconName: String,
  type: String
})
</script>

<template>
  <button>
    <span class="material-icons" :class="type">{{ iconName }}</span>
  </button>
</template>

<style scoped lang="scss">
button {
  display: flex;
  border-radius: 10px;
  padding: 5px;

  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  .material-icons {
    font-size: 16px;

    &.danger {
      color: var(--reddish);
    }

    &.success {
      color: var(--greenish);
    }
  }
}
</style>
