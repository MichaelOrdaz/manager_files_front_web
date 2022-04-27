import {ref} from 'vue'
import {RolesApi} from '@/services/api/api'
import {Role} from '@/services/api/models'

export function useGetRolesList() {
    const rolesList = ref<Role[]>([])
    async function getRolesList() {
        const resp = await new RolesApi().getRoles()
        rolesList.value = resp.data.data
    }
    getRolesList()
    return {rolesList, getRolesList}
}

export function useGetRol(rolId:number | undefined) {
    const rol = ref<Role>({})

    async function getRol() {
        const resp = await new RolesApi().getRole(rolId)
        rol.value = resp.data.data
    }
    getRol()
    return {rol, getRol}
}
