<script setup>
import { ref } from 'vue'
import PatientRecordModal from '@/components/patients/PatientRecordModal.vue'
import PatientsTable from '@/components/patients/PatientsTable.vue'
import RemovePatientModal from '@/components/patients/RemovePatientModal.vue'
import CButton from '@/components/CButton.vue'

const selectedRecord = ref(undefined)
const removeRecord = ref(undefined)
const patientModalOpened = ref(false)
const removeModalOpened = ref(false)

const patientModal = (item) => {
  selectedRecord.value = item
  patientModalOpened.value = true
}

const closeEditModal = () => {
  patientModalOpened.value = false
  selectedRecord.value = undefined
}

const removeModal = (item) => {
  removeRecord.value = item
  removeModalOpened.value = true
}

const closeRemoveModal = () => {
  removeRecord.value = undefined
  removeModalOpened.value = false
}
</script>

<template>
  <div class="container">
    <div class="patients">
      <dic class="patients__header">
        <h3>Patients</h3>

        <CButton size="small" @click="patientModal({})">
          <span class="material-icons">add_circle</span>
          Add Patient
        </CButton>
      </dic>
      <PatientsTable
        @edit="(item) => patientModal(item)"
        @remove="(item) => removeModal(item)"
      />
    </div>

    <PatientRecordModal
      v-if="patientModalOpened"
      :record="selectedRecord"
      @close="closeEditModal"
    />

    <RemovePatientModal
      v-if="removeModalOpened"
      :record="removeRecord"
      @close="closeRemoveModal"
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

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 2rem;

    .c-button {
      .material-icons {
        font-size: 14px;
      }
    }
  }

  h3 {
    margin-bottom: 1rem;
    color: var(--secondary);
  }
}
</style>
