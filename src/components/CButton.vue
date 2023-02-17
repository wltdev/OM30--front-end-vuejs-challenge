<script setup>
import ComponentLoading from '@/components/loading/ComponentLoading.vue'

defineProps({
  buttonType: String,
  size: String,
  disabled: Boolean,
  loading: Boolean
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="c-button"
    :type="buttonType"
    :class="[size, { disabled: disabled }]"
    @click.prevent="!disabled && emit('click')"
  >
    <ComponentLoading v-if="loading" size="small" />
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.c-button {
  text-transform: uppercase;
  font-size: 1rem;
  background-color: var(--primary);
  font-family: 'Nexa';

  &:hover {
    background-color: var(--secondary);
  }

  color: var(--white);
  border: none;
  padding: 0.8rem 1rem;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 2rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &.big {
    width: 100%;
    padding: 1rem 1.3rem;
  }

  &.medium {
    width: 50%;
    padding: 1rem 1.3rem;
    max-height: 3.125rem;
  }

  &.small {
    font-size: 0.75rem;
    padding: 0.6875rem 1.5rem 0.5625rem 1.5rem;
    @media (max-width: 767px) {
      // width: 50%;
      font-size: 0.625rem;
      padding: 0.6rem 1.1rem;
    }
  }

  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
