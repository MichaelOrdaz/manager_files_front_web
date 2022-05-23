import type { RouteRecordRaw } from 'vue-router'

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

const HeadOfDepartment: RouteRecordRaw[] = [
    {
        path: '/',
        name: '',
        component: () => import('../Layouts/DefaultLayout.vue'),
        children: [
            {
                path: '/home',
                name: 'Dashboard',
                component: () => import('../Pages/HeadOfDepartment/Home/index.vue'),
                meta: {
                    authRequired: true
                },
            },
            {
                path: '/shared-filed',
                name: 'Shared files',
                component: () => import('../Pages/HeadOfDepartment/SharedFilesPage/index.vue'),
                meta: {
                    authRequired: true
                },
            },
            {
                path: '/users-management',
                name: 'Users management',
                component: () => import('../Pages/HeadOfDepartment/UsersManagementPage.vue'),
                meta: {
                    authRequired: true,
                }
            }
        ]
    },
]
const AdminViews: RouteRecordRaw[] = [
    {
        path: '/',
        name: '',
        component: () => import('../Layouts/DefaultLayout.vue'),
        children: [
            {
                path: '/admin',
                name: 'Admin Dashboard',
                component: () => import('../Pages/AdminPages/Home/index.vue'),
                meta: {
                    authRequired: false
                },
            },
        ]
    },
]
export default [].concat(PublicViews, AdminViews ,HeadOfDepartment)
