<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import CInput from '@/components/CInput.vue'
import CButton from '@/components/CButton.vue'

const store = useStore()
const router = useRouter()

const state = reactive({
  email: '',
  password: ''
})

const onSubmit = async () => {
  try {
    await store.dispatch('signIn', state)
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="login">
    <form @submit.prevent="onSubmit">
      <div class="login__content">
        <h3>Login Page</h3>

        <CInput v-model:value="state.email" type="email" input-label="Email" />
        <CInput v-model:value="state.password" type="password" input-label="Password" />

        <CButton size="small" button-type="submit">Login</CButton>
      </div>
    </form>
    <!-- <div class="login__image">
      <img src="@assets/images/blue-curved.jpg" />
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.login {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: center;

  h3 {
    margin-bottom: 2rem;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 3rem;
    background-color: var(--white);

    border-radius: 1rem;

    .c-button {
      margin-top: 2rem;
    }
  }

  &__image {
    /* position: absolute; */
    right: 0;
    top: 0;
    /* transform: skew(10deg); */
  }
}
</style>
