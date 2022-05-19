export interface UserData {
    id: number,
    name?: string,
    lastName?: string,
    second_lastname?: string,
    phone?: string,
    image?: string,
    department_id?: number,
    email?: string,
    department?: {id: number, name: string}
}
export interface Auth {
    access_token?: string,
    isValidToken?: boolean,
    expires_at?: string,
    permissions?: object,
    status?: string,
    account_status?: string,
    user_data?: UserData,
    roles?: string[],
    views: object,
    initialPage: {
        Administrador: 'Admin Dashboard',
        Analista: 'Dashboard',
        'Jefe de Departamento': 'Dashboard'
    }
}

export default function state(): Auth {
    return {
        user_data: {
            id: 1,
            name: 'Test'
        },
        access_token: localStorage.getItem('access_token') ?? '',
        views: [],
        initialPage: {
            Administrador: 'Admin Dashboard',
            Analista: 'Dashboard',
            'Jefe de Departamento': 'Dashboard'
        },
        roles: [],
        isValidToken: false,
    }
}
