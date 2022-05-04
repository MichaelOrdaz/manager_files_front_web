import routes from './routes'
import {createRouter, createWebHistory} from 'vue-router'
import store from '../store'
import {useLogOut} from '@/Composables/useUserSessionMethods'

const Router = createRouter({
    history: createWebHistory(),
    routes: routes,
})
Router.beforeEach((to, from, next) => {
    store.dispatch('user_validate_token').then(() => {
        if (!!to.meta.authRequired && !store.getters.isValidToken) {
            useLogOut()
            return
        }
    })

    const haveToken: boolean | string = !!localStorage.getItem('access_token') || ''
    const authRequired = !!to.meta.authRequired
    const PathMainView = store.getters['initialPage'] ?? ''
    const PathLoginView= '/'
    if (to.path === PathLoginView && haveToken){
        Router.push({name: PathMainView})
        return
    } else if (authRequired) {
        if (!haveToken) {
            Router.push('/')
            return
        }else if(!hasAccess(to.name)) {
            Router.push('/forbidden')
            return
        }
    }
    return next()
})

function hasAccess(routeName: string | symbol | undefined | null) {
    return store.getters['canRenderView'](routeName)
}
export default Router
