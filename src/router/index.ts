import routes from './routes'
import {createRouter, createWebHistory} from 'vue-router'
import store from '../store'

const Router = createRouter({
    history: createWebHistory(),
    routes: routes,
})
Router.beforeEach((to, from, next) => {
    const haveToken: string = localStorage.getItem('access_token') || ''
    const authRequired = !!to.meta.authRequired
    const PathLoginView= '/'

    if (to.path === PathLoginView && haveToken){
        Router.push('/')
    } else if (authRequired) {
        if (!haveToken) {
            Router.push('/login')
        }else if(!hasAccess(to.name)) {
            Router.push('/denegado')
        }
    }
    return next()
})

function hasAccess(routeName: string | symbol | undefined | null) {
    return store.getters.sePuedeMostrar(routeName)
}
export default Router
