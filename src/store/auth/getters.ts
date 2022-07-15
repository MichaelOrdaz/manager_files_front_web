import type {GetterTree} from 'vuex'
import {Auth} from './auth'
import {StateInterface} from '../index'
import {Department} from '@/Types/Department'

const getters: GetterTree<Auth, StateInterface> = {
    getToken(state){
        return state.access_token
    },
    initialPage(state): string {
        return `${state.initialPage[state.roles[0]]}`
    },
    canRenderView(state) {
        return (perm) => Object.prototype.hasOwnProperty.call(state.views, perm)
    },
    isRol(state) {
        return (rol: string) => state.roles.includes(rol)
    },
    isValidToken(state) :boolean {
        return state.isValidToken
    },
    getRol(state: Auth): string {
        return state.roles[0] ?? ''
    },
    getUserData(state: Auth): Auth {
        return state
    },
    getUserDepartment(state: Auth): Department {
        return state.user_data.department
    },
    getAnalystHasAllPermission(state: Auth): boolean {
        if (state.roles[0] === 'Analista' && state.authorization.includes('Todos los permisos')) {
            return true
        } else if (state.roles[0] === 'Analista' && state.authorization.includes('Solo ver')) {
            return false
        }else if (state.roles[0] === 'Jefe de Departamento' && !state.authorization.length) {
            return true
        }
    },
    getFolderAuthorization(state: Auth) {
        return state.authorization
    }
}

export default getters
