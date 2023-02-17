<script setup>
import { ref } from 'vue'
import PatientRecordModal from '@/components/patients/PatientRecordModal.vue'
import PatientsTable from '@/components/patients/PatientsTable.vue'

const selectedRecord = ref(undefined)
const patientModalOpened = ref(false)

const editModal = (item) => {
  selectedRecord.value = item
  patientModalOpened.value = true
}
</script>

<template>
  <div class="container">
    <!-- <h3>Patients</h3> -->
    <div class="patients">
      <PatientsTable @edit="(item) => editModal(item)" />
    </div>

    <PatientRecordModal
      v-if="patientModalOpened"
      :record="selectedRecord"
      @close="patientModalOpened = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  @media (min-width: 768px) {
    margin-top: 0.825rem;
  }
}
.patients {
  background-color: var(--white);
  padding: 1rem;
  border-radius: 10px;

  h3 {
    margin-bottom: 1rem;
    text-decoration: underline;
    color: var(--secondary);
  }
}
</style>
