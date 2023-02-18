<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { createToaster } from '@meforma/vue-toaster'

import BaseModal from '../BaseModal.vue'
import CButton from '../CButton.vue'

const props = defineProps({
  record: Object
})

const store = useStore()
const emit = defineEmits('close')
const toast = createToaster({
  position: 'bottom-right'
})

const isLoading = ref(false)

const removePatient = async () => {
  isLoading.value = true
  setTimeout(async () => {
    await store.dispatch('removePatient', props.record.id)
    toast.success('Patient was removed successful')
    emit('close')
  }, 1000)
}
</script>

<template>
  <BaseModal size="large" :shadow-close="true" @close="emit('close')">
    <div class="record">
      <h3>Are you sure to remove Patient?</h3>
      <div class="record__photo">
        <img :src="record.photo" />
      </div>
      <p v-if="record.name" class="record__name">{{ record.name }}</p>
      <p v-if="record.motherName" class="record__name">{{ record.motherName }}</p>
      <p v-if="record.cpf" class="record__name">{{ record.cpf }}</p>
      <p v-if="record.cns" class="record__name">{{ record.cnse }}</p>

      <CButton :loading="isLoading" @click="removePatient">Remove</CButton>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
.record {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    margin-bottom: 2rem;
  }

  &__photo {
    width: 100px;
    height: 100px;

    img {
      border-radius: 40%;
      width: 100%;
      height: 100%;
    }
  }

  &__name {
    margin: 0.5rem 0 2rem 0;
    font-size: 1.3rem;
    font-weight: 800;
  }

  .form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* gap: 20px; */
    align-items: center;
    width: 100%;
  }

  .c-button {
    margin-top: 2rem;
  }
}
</style>
