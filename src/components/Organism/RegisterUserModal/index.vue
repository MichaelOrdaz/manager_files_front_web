<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="close-bar">
          <PIcon
            class="cursor-pointer"
            iconName="close"
            @click.prevent.stop="$emit('cancel')"
          />
        </div>
        <PForm
          ref="formRef"
          class="form"
        >
          <NewUserImgLoader @capture-new-image="getNewImage" />
          <div class="selects">
            <PSelect
              v-model="newUser.rolId"
              label="Filtro de usuarios"
              :options="props.roles"
              width="270px"
              optionValue="id"
              optionLabel="name"
              :rules="[value => !!value || 'Selecciona un rol']"
              data-cy="rolIdSelector"
            />
            <PSelect
              v-model="newUser.department.id"
              label="Selecciona departamento"
              :options="departmentsList"
              width="270px"
              optionValue="id"
              optionLabel="name"
              :rules="[value => !!value || 'Selecciona un departamento']"
              data-cy="departmentIdSelector"
            />
          </div>
          <PInput
            v-model="newUser.name"
            class="q-mt-lg"
            label="Nombre"
            width="554px"
            :rules="[(value:string) => !!value.trim() || 'Agregar nombre']"
            data-cy="userNameInput"
          />
          <div class="input-pair">
            <PInput
              v-model="newUser.lastname"
              label="Apellido paterno"
              width="363px"
              :rules="[(value:string) => !!value.trim() || 'Agregar apellido paterno']"
              data-cy="userLatNameInput"
            />
            <PInput
              v-model="newUser.second_lastname"
              label="Apellido materno"
              width="363px"
              :rules="[(value:string) => !!value.trim() || 'Agregar apellido materno']"
              data-cy="userSecondLastNameInput"
            />
          </div>
          <div class="input-pair">
            <PInput
              v-model="newUser.email"
              label="Correo"
              width="363px"
              :rules="[(value:string) => value.trim().length >= 10 || 'Agregar correo']"
              data-cy="userEmailInput"
            />
            <PInput
              v-model="newUser.phone"
              label="Celular"
              width="363px"
              :rules="[(value:string) => value.length >= 7 || 'Agregar celular']"
              data-cy="userPhoneInput"
            />
          </div>
          <div class="input-pair">
            <PInput
              v-model="newUser.password"
              label="Contraseña"
              width="363px"
              :rules="[(value:string) => value.trim().length >= 8 || 'Agregar contraseña']"
              data-cy="userPasswordInput"
            />
            <PInput
              v-model="password"
              label="Contraseña"
              width="363px"
              :rules="[(value:string) => value.trim().length >= 8 || 'Agregar contraseña']"
              data-cy="userPasswordInputRe"
            />
          </div>
          <div class="buttons">
            <PButton
              variant="white"
              size="plg"
              @click.prevent.stop="$emit('cancel')"
            >
              Cancelar
            </PButton>
            <PButton
              size="plg q-ml-sm"
              @click.prevent="validateFields"
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
import PForm from '@/components/Organism/PForm.vue'
import PFormComp from '@/Types/PFormComp'
import {ref} from 'vue'
import {Role} from '@/services/api/models'
import {getDepartmentsList} from '@/Composables/useGetDepartmentsList'
import {useCreateUser} from '@/Composables/useUsersClientMethods'
import {User} from '@/Types/User'
import {Notify} from 'quasar'
interface Props{roles: Role[]}
const emit = defineEmits(['cancel'])
const props = withDefaults(defineProps<Props>(), {roles: () => []})

const formRef = ref<PFormComp>(null)
const password = ref<string>('')
const newUser = ref<User>({
    name: '', lastname: '', second_lastname: '', password: '', phone: '', department: {id:0, name: ''}, email: '', rolId: 0
})
const {departmentsList} = getDepartmentsList()
const getNewImage = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
        newUser.value.image = `${reader.result}`
    }
}
async function validateFields() {
    if (password.value !== newUser.value.password){
        Notify.create({message: 'Las contraseñas son diferentes', color: 'red'})
        return
    }
    const isValid = formRef.value.validate()
    if (isValid){
        await useCreateUser(newUser.value)
        Notify.create({message: 'Se ha creado el usuario', color: 'green'})
        emit('cancel')
        return
    }
}
</script>

<style scoped lang="scss">
@import "RegisterUserModal";
</style>


