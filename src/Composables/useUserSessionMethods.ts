import store from '@/store/index'
import router from '@/router/index'

async function useLogOut(): Promise<void> {
    await store.dispatch('user_logout')
    await router.push('/')
}

async function useLogIn(email: string, password: string): Promise<void> {
    await store.dispatch('auth_request', {email, password} )
    await router.push({name: store.getters.initialPage})
}

export {useLogIn, useLogOut}
