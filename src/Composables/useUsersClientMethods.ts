import {User} from '@/Types/User'
import {UsersApi} from '@/services/api/api'
import {ref} from 'vue'
import {Notify} from 'quasar'

export function useGetUsersList(name: string | undefined, role: number | undefined ){
    const usersList = ref<User[]>([])
    async function getUsers(Name: string, Rol: number) {
        try {
            const response = await new UsersApi().getUsers(Name, Rol)
            usersList.value = response.data.data
        } catch (e) {
            usersList.value = []
        }
    }
    getUsers(name, role)
    return {users: usersList, getUsers}
}

export function useCreateUser(user:User) {
    async function createUser() {
        try {
            const response = await new UsersApi().createUsers(
                user.email, user.name,
                user.lastname, user.second_lastname,
                user.phone, user.password,
                user.image === 'string' ? user.image : '', user.rolId,
                user.department.id)
            // eslint-disable-next-line no-console
            console.log(response)
        } catch (e) {
            Notify.create({message: 'Ha ocurrido un error', color: 'red'})
        }
    }
    createUser()
}
