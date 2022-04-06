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
      width="345px"
      v-model="userEmail"
      label="Correo electrónico"
      :rules="[value => !!value || 'Agraga un correo']"
    />
    <PInput
      width="345px"
      v-model="userPassword"
      label="Contraseña"
      :rules="[value => !!value || 'Ingresa tu contraseña']"
    />
    <PButton
      @click.prevent="logIn"
      size="plg"
      class="login-btn"
    >
      Ingresar
    </PButton>
  </PForm>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import PForm from '../components/Organism/PForm.vue'

const userEmail = ref<string>('')
const userPassword = ref<string>('')
const formRef = ref<any>(null)

async function logIn () {
    formRef.value.validate()
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
