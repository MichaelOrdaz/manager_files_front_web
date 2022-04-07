<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="close-bar">
          <PIcon iconName="close" />
        </div>
        <PForm
          ref="formRef"
          class="form"
        >
          <NewUserImgLoader @capture-new-image="getNewImage" />
          <div class="selects">
            <PSelect
              label="Filtro de usuarios"
              :options="options"
              width="270px"
            />
            <PSelect
              label="Selecciona departamento"
              :options="options"
              width="270px"
            />
          </div>
          <PInput
            class="q-mt-lg"
            label="Nombre"
            width="554px"
            v-model="newUser.name"
            :rules="[value => !!value.trim() || 'Agregar nombre']"
          />
          <div class="input-pair">
            <PInput
              label="Apellido paterno"
              width="363px"
              v-model="newUser.lastName"
              :rules="[value => !!value.trim() || 'Agregar apellido paterno']"
            />
            <PInput
              label="Apellido materno"
              width="363px"
              v-model="newUser.secondLastName"
              :rules="[value => !!value.trim() || 'Agregar apellido materno']"
            />
          </div>
          <div class="input-pair">
            <PInput
              label="Correo"
              width="363px"
              v-model="newUser.email"
              :rules="[value => !!value.trim() || 'Agregar correo']"
            />
            <PInput
              label="Celular"
              width="363px"
              v-model="newUser.phone"
              :rules="[value => !!value.trim() || 'Agregar celular']"
            />
          </div>
          <div class="input-pair">
            <PInput
              label="Contraseña"
              width="363px"
              v-model="newUser.password"
              :rules="[value => !!value.trim() || 'Agregar celular']"
            />
            <PInput
              label="Contraseña"
              width="363px"
              v-model="password"
              :rules="[value => !!value.trim() || 'Agregar celular']"
            />
          </div>
          <div class="buttons">
            <PButton
              variant="white"
              size="plg"
            >
              Cancelar
            </PButton>
            <PButton
              size="plg q-ml-sm"
              @click.prevent="log"
            >
              Aceptar
            </PButton>
          </div>
        </PForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NewUserImgLoader from './NewUserImgLoader.vue'
import {NewUser} from '../../../Types/NewUserType'
import {ref} from 'vue'

const formRef = ref<any>(null)
const password = ref<string>('')
const newUser = ref<NewUser>({
    name: '', lastName: '', secondLastName: '', password: '', phone: '', department: '', email: '', rol: ''
})
const options = ref([1,2,3,4])
const getNewImage = (file: File) => { newUser.value.img = file }
function log() {
    formRef.value.validate()
}
</script>

<style scoped lang="scss">
@import "RegisterUserModal";
</style>


