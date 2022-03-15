// eslint-disable-next-line import/named
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '',
        name: 'Home',
        component: () => import('../App.vue'),
        meta: {
            authRequired: false,
        },
    }
]
export default routes
