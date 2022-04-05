import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Layout',
        component: () => import('../Layouts/DefaultLayout.vue'),
        meta: {
            authRequired: false
        },
        children: [
            {
                path: '/',
                name: 'Layout',
                component: () => import('../components/HelloWorld.vue'),
                meta: {
                    authRequired: false
                },
            }
        ]
    },
]
export default routes
