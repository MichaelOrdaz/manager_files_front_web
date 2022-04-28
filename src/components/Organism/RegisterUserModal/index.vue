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
              v-model="rolSelectedId"
              label="Filtro de usuarios"
              :options="rolesList"
              width="270px"
              optionValue="id"
              optionLabel="name"
              :rules="[value => !!value || 'Selecciona un rol']"
              data-cy="rolIdSelector"
              :forceSelectedIndex="rolSelectedIndex"
            />
            <PSelect
              v-model="departmentSelectedId"
              label="Selecciona departamento"
              :options="departmentsList"
              width="270px"
              optionValue="id"
              optionLabel="name"
              :rules="[value => !!value || 'Selecciona un departamento']"
              data-cy="departmentIdSelector"
              :forceSelectedIndex="departmentSelectedIndex"
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
          <div
            v-if="!isEditUser"
            class="input-pair"
          >
            <PInput
              v-if="!isEditUser"
              v-model="newUser.password"
              label="Contraseña"
              width="363px"
              data-cy="userPasswordInput"
              :rules="[(value:string) => value.length >= 8 || 'Contraseña']"
            />
            <PInput
              v-if="!isEditUser"
              v-model="password"
              label="Contraseña"
              width="363px"
              data-cy="userPasswordInputRe"
              :rules="[(value:string) => value.length >= 8 || 'Contraseña']"
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
import {ref, watch} from 'vue'
import {getDepartmentsList} from '@/Composables/useGetDepartmentsList'
import {useCreateUser, useEditUser} from '@/Composables/useUsersClientMethods'
import {User} from '@/Types/User'
import {Notify} from 'quasar'
import {useGetRolesList} from '@/Composables/useGetRolesList'
interface Props{userSelected?: User}

const emit = defineEmits(['cancel'])
const props = withDefaults(defineProps<Props>(), {userSelected: undefined})

const isEditUser = ref<boolean>(!!props.userSelected)

const formRef = ref<PFormComp>(null)
const password = ref<string>('')
const rolSelectedId = ref<number>(0)
const departmentSelectedId = ref<number>(0)
const departmentSelectedIndex = ref<number>(0)
const rolSelectedIndex = ref<number>(0)
const newUser = ref<User>({
    name: '', lastname: '', second_lastname: '', password: '', phone: '', department: {id:0, name: ''}, email: '', rolId: 0
})
const {departmentsList} = getDepartmentsList()
const {rolesList} = useGetRolesList()
const getNewImage = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
        newUser.value.image = `${reader.result}`
    }
}
async function validateFields() {
    if (!isEditUser.value && password.value !== newUser.value.password){
        Notify.create({message: 'Las contraseñas son diferentes', color: 'red'})
        return
    }
    const isValid = formRef.value.validate()
    if (isValid){
        if (!isEditUser.value) {
            await createUser()
            return
        }else {
            await editUser()
            return
        }
    }
}

async function createUser() {
    newUser.value.department.id = departmentSelectedId.value
    newUser.value.rolId = rolSelectedId.value
    await useCreateUser(newUser.value)
    Notify.create({message: 'Se ha creado el usuario', color: 'green'})
    emit('cancel')
    resetValues()
}

async function editUser() {
    await useEditUser(newUser.value)
    Notify.create({message: 'Se ha editado el usuario', color: 'green'})
    resetValues()
    emit('cancel')
}

function takeUserSelectedValues() {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const tempUser = props.userSelected
    newUser.value.id = tempUser.id
    newUser.value.name = tempUser.name
    newUser.value.lastname = tempUser.lastname
    newUser.value.second_lastname = tempUser.second_lastname
    newUser.value.email = tempUser.email
    newUser.value.phone = tempUser.phone
}
function resetValues() {
    newUser.value = {
        name: '', lastname: '', second_lastname: '', password: '', phone: '', department: {id:0, name: ''}, email: '', rolId: 0
    }
    rolSelectedId.value = undefined
    departmentSelectedId.value = undefined
}
watch(departmentsList, () => {
    if (props.userSelected) {
        isEditUser.value = true
        takeUserSelectedValues()
        departmentSelectedIndex.value = departmentsList.value.findIndex(dep => dep.id === props.userSelected.department.id)
        newUser.value.department = departmentsList.value.find(dep => dep.id === props.userSelected.department.id)
        console.log(departmentsList.value.find(dep => dep.id === props.userSelected.department.id))
    }
})
watch(rolesList, () => {
    if (props.userSelected) {
        isEditUser.value = true
        takeUserSelectedValues()
        rolSelectedIndex.value = rolesList.value.findIndex(rol => rol.name === props.userSelected.role[0])
        newUser.value.rolId = rolesList.value.find(rol => rol.name === props.userSelected.role[0]).id
    }
})
</script>

<style scoped lang="scss">
@import "RegisterUserModal";
</style>


