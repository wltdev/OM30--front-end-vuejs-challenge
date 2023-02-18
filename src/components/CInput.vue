<script setup>
import { ref } from 'vue'

const focus = ref(false)

defineProps({
  disabled: Boolean,
  errorMessage: String,
  inputLabel: String,
  type: { type: String, default: 'text' },
  value: String
})

const emit = defineEmits(['update:value'])
</script>

<template>
  <div
    class="c-input"
    :class="{
      disabled: disabled,
      error: errorMessage && !focus
    }"
  >
    <input
      :value="value"
      :type="type"
      class="c-input__input"
      :disabled="disabled"
      v-bind="$attrs"
      @input="(e) => emit('update:value', e.target.value)"
      @focus="focus = true"
      @blur="focus = false"
    />

    <transition name="fade">
      <label v-if="inputLabel" class="c-input__label">
        {{ inputLabel }}
      </label>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.c-input {
  border-bottom: 2px solid var(--primary);
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  max-width: 230px;
  min-height: 50px;
  margin: 1rem 0;

  label {
    color: var(--primary);
  }

  &.disabled {
    background-color: var(--white-two);
    opacity: 0.8;
  }

  &.error {
    border-color: var(--reddish);
  }

  &__label {
    position: absolute;
    top: 0;
    left: 0;
  }

  &__error {
    font-weight: bold;
    font-size: 0.8rem;
    color: var(--reddish);
    position: absolute;
    bottom: -19px;
    left: 0;
    &.centered {
      display: table;
      width: 100%;
    }
  }

  &__input {
    font-size: 1rem;
    color: var(--grey);
    border: none;
    height: 100%;
    background: none;
    padding: 0px;
    margin: 0;
    align-self: flex-end;
    flex-grow: 1;
    width: 100%;
    left: 0;
    font-weight: 300 !important;

    &.text {
      font-size: 1.25rem;
    }

    &.centered {
      text-align: center;
    }

    &:focus {
      outline: none;
    }
  }
}

.fade {
  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-enter-active,
  &-leave-active {
    transition: opacity 250ms ease 0s;
  }
}
</style>
