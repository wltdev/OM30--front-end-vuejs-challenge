<script setup>
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'

import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import CIcon from '../CIcon.vue'
import { formatBirthday } from '@/business/helpers/date'

const headers = [
  { text: 'Patient', value: 'name', sortable: true },
  { text: "Mother's name", value: 'motherName' },
  { text: 'Birthday', value: 'birthday' },
  { text: 'CPF', value: 'cpf' },
  { text: 'CNS', value: 'cns' },
  { text: 'Address', value: 'address' },
  { text: '', value: 'actions' }
]

const emit = defineEmits(['edit', 'remove'])
const store = useStore()
const isLoading = ref(true)

const patients = computed(() => store.getters['getPatients'])

const getDocs = async () => {
  await store.dispatch('loadPatients')
  isLoading.value = false
}

onMounted(() => {
  setTimeout(() => {
    getDocs()
  }, 2000)
})
</script>

<template>
  <div>
    <Vue3EasyDataTable
      :loading="isLoading"
      :headers="headers"
      :items="patients"
      :rows-per-page="10"
    >
      <template #loading>
        <img
          src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
          style="width: 100px; height: 80px"
        />
      </template>

      <template #item-name="{ name, photo }">
        <div class="player-wrapper">
          <img class="photo" :src="photo" alt="" />
          <span>{{ name }}</span>
        </div>
      </template>

      <template #item-birthday="{ birthday }">
        {{ formatBirthday(birthday) }}
      </template>

      <template #item-address="{ address }">
        <span>{{
          `${address.street}, ${address.number}, ${address.neighborhood}, ${address.city} - ${address.state}`
        }}</span>
      </template>

      <template #item-actions="item">
        <div class="operation-wrapper">
          <CIcon icon-name="edit" type="success" @click="emit('edit', item)" />
          <CIcon icon-name="delete" type="danger" @click="emit('remove', item)" />
        </div>
      </template>
    </Vue3EasyDataTable>
  </div>
</template>

<style lang="scss" scoped>
.operation-wrapper {
  display: flex;
  gap: 5px;
}
.player-wrapper {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-items: center;

  span {
    color: var(--primary);
    font-weight: 800;
    font-size: 0.825rem;
  }
}
.photo {
  margin-right: 10px;
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 10%);
}
</style>
