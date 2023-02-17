<script setup>
import { onMounted, ref } from 'vue'
import { getFakePatients } from '@/business/services/patientsService'

import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import CIcon from '../CIcon.vue'

const headers = [
  { text: 'Patient', value: 'name', sortable: true },
  { text: "Mother's name", value: 'motherName' },
  { text: 'Birthday', value: 'birthday' },
  { text: 'CPF', value: 'cpf' },
  { text: 'CNS', value: 'cns' },
  { text: 'Address', value: 'address' },
  { text: 'CreatedAt', value: 'createdAt' },
  { text: '', value: 'actions' }
]

const items = ref([])

const editItem = (id) => {
  console.log(id)
}

onMounted(() => {
  setTimeout(() => {
    items.value = getFakePatients()
  }, 2000)
})
</script>

<template>
  <div>
    <Vue3EasyDataTable
      :header-item-class-name="headerItemClassNameFunction"
      :headers="headers"
      :items="items"
      :rows-per-page="10"
    >
      <template #loading>
        <img
          src="https://thumbs.gfycat.com/AngelicYellowIberianmole.webp"
          style="width: 60px; height: 100px"
        />
      </template>

      <template #item-name="{ name, photo }">
        <div class="player-wrapper">
          <img class="photo" :src="photo" alt="" />
          <span>{{ name }}</span>
        </div>
      </template>

      <template #item-actions="item">
        <div class="operation-wrapper">
          <CIcon icon-name="edit" type="success" @click="editItem(item.id)" />
          <CIcon icon-name="delete" type="danger" @click="editItem(item.id)" />
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
