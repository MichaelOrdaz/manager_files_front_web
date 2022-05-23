import store from '@/store/index'
import router from '@/router/index'
import {Notify} from 'quasar'

async function useLogOut() {
    try {
        await store.dispatch('user_logout')
        Notify.create({message: 'Se ha cerrado sesión', color: 'blue', type: 'positive'})
        await router.push('/')
    } catch (e) {
        store.commit('USER_ERROR')
        store.commit('AUTH_LOGOUT')
        router.push('/')
    }
}

async function useLogIn(email: string, password: string): Promise<void> {
    try {
        await store.dispatch('auth_request', {email, password})
        router.push({name: store.getters.initialPage})
    } catch (e) {
        const errorsHandlersMap = {
            401: 'Credenciales invalidas',
            404: 'Registro no encontrado',
            422: 'Credenciales invalidas',
        }
        Notify.create({message: `${errorsHandlersMap[e.status] || 'Error'}`, color: 'red', type: 'negative'})
    }
}

export {useLogIn, useLogOut}
