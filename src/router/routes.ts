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
            },
        ]
    },
]
const PublicViews: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../Pages/LoginPage.vue'),
        meta: {
            authRequired: false,
        }
    },
    {
        path: '/components',
        name: 'Components',
        component: () => import('../Layouts/DefaultLayout.vue'),
        children: [
            {
                path: '',
                name: '',
                component: () => import('../Pages/ComponentsPage.vue')
            }
        ]
    },
    {
        path: '/forbidden',
        name: 'Forbidden',
        component: () => import('../Pages/ForbiddenPage.vue'),
        meta: {
            authRequired: false
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('../Pages/404NotFoundPage.vue'),
        meta: {
            authRequired: false
        },
    }
]

const HeadOfDepartament: RouteRecordRaw[] = [
    {
        path: '/layout',
        name: 'Layout',
        component: () => import('../Layouts/DefaultLayout.vue'),
        meta: {
            authRequired: false
        },
        children: [
            {
                path: '/home',
                name: 'Dashboard',
                component: () => import('../Pages/HeadOfDepartment/HomePage.vue'),
                meta: {
                    authRequired: true
                },
            },
            {
                path: '/users-management',
                name: 'Users management',
                component: () => import('../Pages/UsersManagementPage.vue'),
                meta: {
                    authRequired: true,
                }
            }
        ]
    },
]
export default routes.concat(HeadOfDepartament, PublicViews)
