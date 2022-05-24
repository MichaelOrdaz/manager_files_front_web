import {ShareDocumentApi, ShareDocumentUserApi} from '@/services/api/api'
import {ref} from 'vue'
import {UserDocsPermission} from '@/Types/UserDocsPermission'

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
