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
      data-cy="login-email-input"
    />
    <PInput
      v-model="userPassword"
      width="345px"
      label="Contraseña"
      :appendIconName="hidePassword ? 'visibility_off' : 'visibility'"
      :type="hidePassword ? 'password' : 'text'"
      enableCursorPointerOnIcon
      :rules="[(value:string) => !!value || 'Ingresa tu contraseña']"
      data-cy="login-password-input"
      @append-icon-action="hidePassword = !hidePassword"
    />
    <PButton
      size="plg"
      class="login-btn"
      data-cy="login-btn"
      @click.prevent="validateForm"
    >
      Ingresar
    </PButton>
  </PForm>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import PForm from '../components/Organism/PForm.vue'
import {useLogIn} from '@/Composables/useUserSessionMethods'

interface PFormComp{ validate: () => boolean, component: typeof PForm }
const userEmail = ref<string>('')
const userPassword = ref<string>('')
const formRef = ref<PFormComp | null>(null)
const hidePassword = ref<boolean>(true)

async function validateForm () {
    if (formRef.value?.validate()) {
        await useLogIn(userEmail.value, userPassword.value)
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
