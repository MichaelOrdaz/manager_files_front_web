import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/layout',
        name: 'Layout',
        component: () => import('../Layouts/DefaultLayout.vue'),
        meta: {
            authRequired: false
        },
        children: [
            {
                path: '/main',
                name: 'Layout',
                component: () => import('../components/HelloWorld.vue'),
                meta: {
                    authRequired: false
                },
            }
        ]
    },
]
const PUblicViews: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../Pages/LoginPage.vue'),
        meta: {
            authRequired: false,
        }
    }
]
export default routes.concat(PUblicViews)
