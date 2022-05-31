import {UserDocsPermission} from '@/Types/UserDocsPermission'

export type User = {
    id?: number,
    email?: string,
    name: string,
    lastname?: string,
    second_lastname?: string,
    fullName?: string,
    phone?: string,
    image?: string | File,
    password?: string,
    department?: {id?: number, name?: string} | undefined | null,
    rolId?: number | undefined,
    role?: string[],
    permission?: UserDocsPermission | string,
    updated_at?: string,
    created_at?: string,
    deleted_at?: string,
    authorization?: string[],
}
