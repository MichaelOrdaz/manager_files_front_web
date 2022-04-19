export interface UserData {
    id: number,
    name?: string,
    lastName?: string,
    second_lastname?: string,
    phone?: string,
    image?: string,
    department_id?: number
}
export interface Auth {
    access_token?: string,
    expires_at?: string,
    permissions?: object,
    status?: string,
    account_status?: string,
    user_data?: UserData,
    roles?: string[],
    views: string[],
    initialPage: {
        Admin: 'Home',
        Administrador: 'Home',
        Analyst: 'Home',
        'Head of Department': 'Home'
    }
}

export default function state(): Auth {
    return {
        user_data: {
            id: 1,
            name: 'Test'
        },
        access_token: 'Test',
        views: ['Test'],
        initialPage: {
            Admin: 'Home',
            Administrador: 'Home',
            Analyst: 'Home',
            'Head of Department': 'Home'
        }
    }
}
