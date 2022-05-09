import {DocumentsApi} from '@/services/api/api'
import {ref} from 'vue'
import type {Document} from '@/Types/Document'
import {AxiosResponse} from 'axios'

export function useGetDocumentsList(parentId: number | undefined) {
    const documentsList = ref<Document[]>([])
    async function getDocumentsList(ParentId: number | undefined) {
        const resp = await new DocumentsApi().getDocuments(ParentId)
        documentsList.value = resp.data.data
    }
    getDocumentsList(parentId)
    return {documentsList, getDocumentsList}
}

export async function useCreateFolder(newFolderName: string, parentId?: number): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
        new DocumentsApi().createDocumentFolder({name: newFolderName, parentId: parentId})
            .then(resp => resolve(resp))
            .catch(error => reject(error))
    })
}

export function useGetDocumentData(documentId: undefined | number) {
    const documentData = ref<Document | []>()
    if (!documentId) return {}
    async function getDocData(DocumentId: number | undefined) {
        const resp = await new DocumentsApi().getDocument(DocumentId)
        documentData.value = resp.data.data
    }
    getDocData(documentId)
    return { documentData, getDocData }
}
