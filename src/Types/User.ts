export type User = {
    id: number,
    email?: string,
    name: string,
    lastName?: string,
    secondLastName?: string,
    phone?: string,
    image?: string | File,
    password?: string,
    department_id?: number,
    updated_at?: string,
    created_at?: string,
    deleted_at?: string,
}
