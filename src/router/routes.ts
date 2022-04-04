// eslint-disable-next-line import/named
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Layout',
        component: () => import('../App.vue'),
        meta: {
            authRequired: false
        },
        children: [
            {
                path: '/child',
                name: 'Home',
                component: () => import('../Layouts/DefaultLayout.vue'),
                meta: {
                    authRequired: false,
                },
            }
        ]
    },
]
export default routes
