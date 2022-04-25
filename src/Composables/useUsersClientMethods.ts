import {User} from '@/Types/User'
import {UsersApi} from '@/services/api/api'
import {ref} from 'vue'

export function useGetUsersList(name: string | undefined, role: number | undefined ){
    const usersList = ref<User[]>([])
    async function getUsers() {
        try {
            const response = await new UsersApi().getUsers(name, role)
            usersList.value = response.data.data
        } catch (e) {
            usersList.value = []
        }
    }
    getUsers()
    return {users: usersList, getUsers}
}
