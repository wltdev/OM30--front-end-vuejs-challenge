<script setup>
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { createToaster } from '@meforma/vue-toaster'
import { cpf } from 'cpf-cnpj-validator'
import { validCNS } from '@/business/helpers/cns'

import BaseModal from '../BaseModal.vue'
import CButton from '../CButton.vue'
import CInput from '../CInput.vue'
import { faker } from '@faker-js/faker'
import { getAddresByCEP } from '@/business/helpers/address'

const props = defineProps({
  record: Object
})

const store = useStore()
const emit = defineEmits('close')
const toast = createToaster({
  position: 'bottom-right'
})

const isLoading = ref(false)

const state = reactive({
  name: props.record.name ?? '',
  motherName: props.record.motherName ?? '',
  birthday: props.record.birthday ?? '',
  photo: props.record.photo ?? faker.image.avatar(),
  cpf: props.record.cpf ?? '',
  cns: props.record.cns ?? '',
  address: {
    zipcode: props.record.address?.zipcode ?? '',
    city: props.record.address?.city ?? '',
    state: props.record.address?.state ?? '',
    street: props.record.address?.street ?? '',
    neighborhood: props.record.address?.neighborhood ?? '',
    complement: props.record.address?.complement ?? '',
    number: props.record.address?.number ?? ''
  }
})

const errors = reactive({
  name: '',
  motherName: '',
  birthday: '',
  cpf: '',
  cns: '',
  address: {
    zipcode: '',
    city: '',
    state: '',
    street: '',
    neighborhood: '',
    number: ''
  }
})

const isValidCPF = computed(() => {
  if (state.cpf.length < 11) return false

  return cpf.isValid(state.cpf)
})

const isValidCNS = computed(() => {
  if (state.cns.length < 15) return false

  return validCNS(state.cns)
})

const resetErrors = () => {
  errors.name = ''
  errors.motherName = ''
  errors.birthday = ''
  errors.cpf = ''
  errors.cns = ''
  errors.address = {
    zipcode: '',
    city: '',
    state: '',
    street: '',
    neighborhood: '',
    number: ''
  }
}

// It's not good approach, maybe using formkit is better
const verifyForm = () => {
  resetErrors()

  let isValid = true

  if (!state.name.length) {
    errors.name = 'Name is required'
    isValid = false
  }
  if (!state.motherName.length) {
    errors.motherName = "Mother's name is required"
    isValid = false
  }
  if (!state.birthday.length) {
    errors.birthday = 'Birthday is required'
    isValid = false
  }
  if (!state.address.zipcode) {
    errors.address.zipcode = 'Zipcode is required'
    isValid = false
  }
  if (!state.address.city) {
    errors.address.city = 'City is required'
    isValid = false
  }
  if (!state.address.state) {
    errors.address.state = 'State is required'
    isValid = false
  }
  if (!state.address.neighborhood) {
    errors.address.neighborhood = 'Neighborhood is required'
    isValid = false
  }
  if (!state.address.number) {
    errors.address.number = 'Number is required'
    isValid = false
  }
  if (!isValidCNS.value) {
    errors.cns = 'Invalid CNS'
    isValid = false
  }
  if (!isValidCPF.value) {
    errors.cpf = 'Invalid CPF'
    isValid = false
  }

  return isValid
}

const getAddress = async () => {
  try {
    const address = await getAddresByCEP(state.address.zipcode)

    if (address.error) {
      errors.address.cep = 'Zipcode is Invalid'
    } else {
      state.address = address
    }
  } catch (error) {
    errors.address.cep = 'Zipcode is Invalid'
  }
}

const onSubmit = async () => {
  const isValidForm = verifyForm()

  let message = 'Patient updated successful'

  if (isValidForm) {
    if (props.record.id) {
      await store.dispatch('updatePatient', { id: props.record.id, payload: state })
    } else {
      await store.dispatch('storePatient', state)
      message = 'Patient created'
    }

    isLoading.value = false
    toast.success(message)
    emit('close')
  }
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
          <CInput
            v-model:value="state.name"
            :error-message="errors.name"
            input-label="Name *"
          />
          <CInput
            v-model:value="state.motherName"
            :error-message="errors.motherName"
            input-label="Mother's Name *"
          />
          <CInput
            v-model:value="state.birthday"
            :error-message="errors.birthday"
            input-label="Birthday *"
            mask="00/00/0000"
          />
          <CInput
            v-model:value="state.cpf"
            :error-message="errors.cpf"
            input-label="CPF *"
            mask="000.000.000-00"
          />
          <CInput
            v-model:value="state.cns"
            :error-message="errors.cns"
            input-label="CNS *"
            mask="000 0000 0000 0000"
          />
          <CInput
            v-model:value="state.address.zipcode"
            :error-message="errors.address.zipcode"
            input-label="Zipcode *"
            mask="00000000"
            :after-on-blur="true"
            @blur="getAddress"
          />
          <CInput
            v-model:value="state.address.city"
            :error-message="errors.address.city"
            input-label="City *"
          />
          <CInput
            v-model:value="state.address.state"
            :error-message="errors.address.state"
            input-label="State *"
          />
          <CInput
            v-model:value="state.address.neighborhood"
            :error-message="errors.address.neighborhood"
            input-label="Neighborhood *"
          />
          <CInput
            v-model:value="state.address.number"
            :error-message="errors.address.number"
            input-label="Number *"
          />
        </div>
        <CButton size="big" button-type="submit" :loading="isLoading">Save</CButton>
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
    justify-content: center;
    gap: 20px;
    align-items: center;
    width: 100%;
  }

  .c-button {
    margin-top: 2rem;
  }
}
</style>
