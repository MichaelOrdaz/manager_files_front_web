import {ShareDocumentApi, ShareDocumentUserApi} from '@/services/api/api'
import {ref} from 'vue'
import {UserDocsPermission} from '@/Types/UserDocsPermission'
import {User} from '@/Types/User'

export function useGetShareDocumentsPermissions() {
    const permissionsList = ref<UserDocsPermission[]>([])
    async function getShareDocumentsPermissions() {
        const resp = await new ShareDocumentApi().listShareDocumentPermissions()
        permissionsList.value = resp.data.data
    }
    getShareDocumentsPermissions()
    return {permissionsList, getShareDocumentsPermissions}
}

export function useSaveUsersDocumentPermissionShare(documentId: number, users: {id: number, permission: string}[]) {
    return new Promise((resolve, reject) => {
        new ShareDocumentUserApi().saveUsersOfDocument(documentId, {users})
            .then(resp => resolve(resp))
            .catch(error => reject(error))
    })
}

export function useGetUsersOfDocumentList(documentId: number, department_id?: number) {
    const usersList = ref<User[]>([])
    async function getUsersDocumentList(DocumentId: number, Department_id?: number) {
        const resp = await new ShareDocumentUserApi().listUsers(DocumentId, Department_id)
        usersList.value = resp.data.data
    }
    getUsersDocumentList(documentId, department_id)
    return {usersList, getUsersDocumentList}
}
