import store from '@/store/index'
import router from '@/router/index'

async function useLogOut(): Promise<void> {
    store.dispatch('user_logout')
    router.push('/')
}

async function useLogIn(email: string, password: string): Promise<void> {
    await store.dispatch('auth_request', {email, password} )
    router.push({name: store.getters.initialPage})
}

export {useLogIn, useLogOut}
