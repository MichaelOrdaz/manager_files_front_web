import {User} from '@/Types/User'
import {AdminApi, UsersApi} from '@/services/api/api'
import {ref} from 'vue'
import {AxiosResponse} from 'axios'

export function useGetUsersList(name: string | undefined, role: number | undefined , departmentId: number | undefined){
    const usersList = ref<User[]>([])
    async function getUsers(Name: string, Rol: number, DepartmentId: number) {
        try {
            const response = await new UsersApi().getUsers(Name, Rol, DepartmentId)
            usersList.value = response.data.data
        } catch (e) {
            usersList.value = []
        }
    }
    getUsers(name, role, departmentId)
    return {users: usersList, getUsers}
}

export function useCreateUser(user:User) {
    return new Promise((resolve, reject) => {
        new UsersApi().createUsers(
            user.email, user.name,
            user.lastname, user.second_lastname,
            user.phone, user.password,
            user.image, user.rolId,
            user.department.id)
            .then(resp => resolve(resp))
            .catch(error => reject(error))
    })
}

export function useEditUser(user: User) {
    return new Promise((resolve, reject) => {
        new UsersApi().updateUser(
            user.id, user.email, user.name, user.lastname,
            user.second_lastname, user.phone, undefined,
            undefined, user.rolId, user.department.id)
            .then(resp => resolve(resp))
            .catch(error => reject(error))
    })
}

export async function useDeleteUser(user:User): Promise<AxiosResponse> {
    try {
        const response = await new UsersApi().deleteUser(user.id)
        return response
    } catch (e) {
        return e
    }
}

export async function useUpdateUserPassword(userId: number,newPassword: string, passwordConfirmation: string): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
        new AdminApi().resetPasswordUser(userId, {new_password: newPassword, new_password_confirmation: passwordConfirmation})
            .then(resp => resolve(resp))
            .catch(error => reject(error))
    })
}
