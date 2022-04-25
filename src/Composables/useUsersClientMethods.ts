import {User} from '@/Types/User'
import {UsersApi} from '@/services/api/api'
import {ref} from 'vue'

export async function useGetUsersList(name: string | undefined, role: number | undefined ): Promise<{usersList: User[]}> {
    try {
        const usersList = ref<User[]>()
        const response = await new UsersApi().getUsers(name, role)
        usersList.value = response.data.data
        return {usersList: usersList.value}
    } catch (e) {
        return {usersList: []}
    }

}
