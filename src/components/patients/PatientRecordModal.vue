<script setup>
import { reactive, ref } from 'vue'
import BaseModal from '../BaseModal.vue'
import CButton from '../CButton.vue'
import CInput from '../CInput.vue'

const props = defineProps({
  record: Object
})

const emit = defineEmits('close')

const isLoading = ref(false)

const state = reactive({
  name: props.record.name ?? '',
  motherName: props.record.motherName ?? '',
  birthday: props.record.birthday ?? '',
  photo: props.record.photo ?? '',
  cpf: props.record.cpf ?? '',
  cns: props.record.cns ?? '',
  address: props.record.address ?? ''
})

const onSubmit = () => {
  isLoading.value = true
  setTimeout(() => {
    console.log(state.name)
    isLoading.value = false
  }, 1000)
}
</script>

<template>
  <BaseModal size="large" :shadow-close="true" @close="emit('close')">
    <div class="record">
      <h3>{{ props.record.name ? 'Edit Patient' : 'Register' }}</h3>
      <div class="record__photo">
        <img :src="state.photo" />
      </div>
      <p v-if="record.name" class="record__name">{{ record.name }}</p>

      <form @submit.prevent="onSubmit">
        <div class="form">
          <CInput v-model:value="state.name" input-label="Name" />
          <CInput v-model:value="state.motherName" input-label="Mother's Name" />
          <CInput v-model:value="state.birthday" input-label="Birthday" />
          <CInput v-model:value="state.cpf" input-label="CPF" />
          <CInput v-model:value="state.cns" input-label="CNS" />
          <CInput v-model:value="state.address" input-label="Address" />
        </div>

        <CButton size="big" button-type="submit" :loading="isLoading" @click="onSubmit"
          >Save</CButton
        >
      </form>
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
