<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="close-bar">
          <PIcon
            class="cursor-pointer"
            iconName="close"
            size="11px"
            color="grey"
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
              label="Rol de usuarios"
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
            maxLength="255"
            width="554px"
            :rules="[(value:string) => !!value.trim() || 'Agregar nombre']"
            data-cy="userNameInput"
          />
          <div class="input-pair">
            <PInput
              v-model="newUser.lastname"
              label="Apellido paterno"
              maxLength="255"
              width="363px"
              :rules="[(value:string) => !!value.trim() || 'Agregar apellido paterno']"
              data-cy="userLatNameInput"
            />
            <PInput
              v-model="newUser.second_lastname"
              label="Apellido materno"
              maxLength="255"
              width="363px"
              :rules="[(value:string) => !!value.trim() || 'Agregar apellido materno']"
              data-cy="userSecondLastNameInput"
            />
          </div>
          <div class="input-pair">
            <PInput
              v-model="newUser.email"
              label="Correo"
              maxLength="255"
              width="363px"
              :rules="[(value:string) => value.trim().length >= 10 || 'Agregar correo']"
              data-cy="userEmailInput"
            />
            <PInput
              v-model="newUser.phone"
              label="Celular"
              maxLength="255"
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
              maxLength="255"
              width="363px"
              data-cy="userPasswordInput"
              :rules="[(value:string) => value.length >= 8 || 'La contraseña debe tener más de 8 caracteres']"
            />
            <PInput
              v-if="!isEditUser"
              v-model="password"
              label="Contraseña"
              maxLength="255"
              width="363px"
              data-cy="userPasswordInputRe"
              :rules="[(value:string) => value.length >= 8 || 'La contraseña debe tener más de 8 caracteres']"
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
        Notify.create({message: 'Las contraseñas son diferentes', color: 'red', badgeStyle: {zIndex: '99999', position: 'fixed'}})
        return
    }
    if (newUser.value.password.trim() === newUser.value.name.trim() || newUser.value.password.trim() === newUser.value.email.trim() || newUser.value.email.trim() === newUser.value.name.trim()) {
        Notify.create({message: 'La contraseña, el nombre y el email no pueden ser iguales', color: 'red'})
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
    try {
        await useCreateUser(newUser.value)
        Notify.create({message: 'Se ha creado el usuario', color: 'blue'})
        emit('cancel')
        resetValues()
    } catch (e) {
        Notify.create({message: 'Ha ocurrido un error', color: 'red'})
    }
}

async function editUser() {
    try {
        await useEditUser(newUser.value)
        Notify.create({message: 'Se ha editado el usuario', color: 'blue'})
        resetValues()
        emit('cancel')
    } catch (e) {
        Notify.create({message: 'Ha ocurrido un error', color: 'blue'})
    }
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
        return
    }
    newUser.value.department = departmentsList.value.find(dep => dep.id === 1)
})
watch(rolesList, () => {
    if (props.userSelected) {
        isEditUser.value = true
        takeUserSelectedValues()
        rolSelectedIndex.value = rolesList.value.findIndex(rol => rol.name === props.userSelected.role[0])
        newUser.value.rolId = rolesList.value.find(rol => rol.name === props.userSelected.role[0]).id
        return
    }
    newUser.value.rolId = 1
})

watch([departmentSelectedId, rolSelectedId], () => {
    if (departmentSelectedId.value){
        newUser.value.department = departmentsList.value.find(dep =>dep.id === departmentSelectedId.value)
    }
    if (rolSelectedId.value) {
        newUser.value.rolId = rolSelectedId.value
    }
})
</script>

<style scoped lang="scss">
@import "RegisterUserModal";
</style>


