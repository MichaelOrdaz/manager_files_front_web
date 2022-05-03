import {DocumentsApi} from '@/services/api/api'
import {ref} from 'vue'
import type {Document} from '@/Types/Document'

export function useGetDocumentsList(parentId: number | undefined) {
    const documentsList = ref<Document[]>([])
    async function getDocumentsList(ParentId: number | undefined) {
        const resp = await new DocumentsApi().getDocuments(ParentId)
        documentsList.value = resp.data.data
        console.log(documentsList.value)
    }
    getDocumentsList(parentId)
    return {documentsList}
}
