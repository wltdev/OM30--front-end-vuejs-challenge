<script setup>
const props = defineProps({
  size: {
    type: String,
    required: false,
    default: () => '',
    validator: (e) => ['', 'large', 'extraLarge'].includes(e)
  },
  hideCloseBtn: {
    type: Boolean,
    required: false,
    default: false
  },

  shadowClose: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['close'])

const shadowClick = ($event) => {
  if ($event.target.className === 'modal__shadow' && props.shadowClose) {
    emit('close')
  }
}
</script>

<template>
  <transition name="fade">
    <div class="modal">
      <div class="modal__shadow" @click="shadowClick($event)">
        <div class="modal__modal" :class="size">
          <div v-if="!hideCloseBtn" class="modal__modal__close" @click="$emit('close')">
            <img src="@/assets/images/close.svg" alt="" />
          </div>
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 20;
  animation: show 200ms linear 0s;

  &__shadow {
    background-color: rgba(0, 0, 0, 0.8);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__modal {
    background-color: var(--white);
    border-radius: 10px;
    padding: 2rem;
    position: relative;
    width: 400px;
    max-width: 90%;
    height: auto;
    max-height: 90%;
    overflow: auto;
    @media (max-width: 767px) {
      max-height: 90%;
      overflow: auto;
      // width: 350px;
    }

    &.large {
      width: 700px;
    }

    &.extraLarge {
      width: 1080px;
    }

    &__close {
      position: absolute;
      top: 2rem;
      right: 2rem;
      height: 0.75rem;
      width: 0.75rem;
      cursor: pointer;
    }
  }
}

@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade {
  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-enter-active,
  &-leave-active {
    transition: opacity 300ms linear 0s;
  }
}
</style>
