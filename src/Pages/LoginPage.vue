<template>
  <PForm
    ref="formRef"
    class="login-page-container absolute-center"
  >
    <img
      class="logo"
      src="../assets/logo.svg"
      alt="logo"
    >
    <PText
      class="main-text"
      variant="text-2"
    >
      Ingresar
    </PText>
    <PInput
      v-model="userEmail"
      width="345px"
      label="Correo electrónico"
      :rules="[(value:string) => !!value || 'Agraga un correo']"
    />
    <PInput
      v-model="userPassword"
      width="345px"
      label="Contraseña"
      :rules="[(value:string) => !!value || 'Ingresa tu contraseña']"
    />
    <PButton
      size="plg"
      class="login-btn"
      @click.prevent="logIn"
    >
      Ingresar
    </PButton>
  </PForm>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import PForm from '../components/Organism/PForm.vue'
interface PFormComp{ validate: () => boolean, component: typeof PForm }
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
const userEmail = ref<string>('')
const userPassword = ref<string>('')
const formRef = ref<PFormComp | null>(null)
const store = useStore()
const router = useRouter()

async function logIn () {
    if (formRef.value?.validate()) {
        await store.dispatch('auth_request', {email: userEmail.value, password: userPassword.value})
        await router.push({name: store.getters['initialPage']})
    }
}
</script>

<style scoped>
.login-page-container{
    width: 500px;
    height: 700px;
    border: 1px solid #DBD9D9;
    display: flex;
    padding-top: 19px;
    align-items: center;
    flex-direction: column;
}
.logo{
    width: 179px;
    height: 159px;
}
.login-btn{ width: 345px }
.main-text{font-weight: 600; margin-bottom: 17px; margin-top: 33px}
</style>
