export interface UserData {
    id: number,
    name?: string,
    lastName?: string,
    secondLastName?: string,
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
}

export default function state(): Auth {
    return {
        user_data: {
            id: 1,
            name: 'Test'
        },
        access_token: 'Test',
        views: ['Test']
    }
}
