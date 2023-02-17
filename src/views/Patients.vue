<script setup>
import PatientsTable from '@/components/patients/PatientsTable.vue'
</script>

<template>
  <div class="container">
    <!-- <h3>Patients</h3> -->
    <div class="patients">
      <PatientsTable />
    </div>
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
