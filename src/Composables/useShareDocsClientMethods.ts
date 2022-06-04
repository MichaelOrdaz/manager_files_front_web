import {ref} from 'vue'
import {Document} from '@/Types/Document'
import {ShareDocumentApi} from '@/services/api/api'
import {Notify} from 'quasar'


export function useGetDocumentsByMe(parentId?: number, departmentId?: number) {
    const documents = ref<Document[]>([])

    async function getDocumentsByMe(ParentId?: number, departmentId?: number) {
        try {
            const resp = await new ShareDocumentApi().listDocumentsByMe(ParentId, departmentId)
            documents.value = resp.data.data
        } catch (e) {
            Notify.create({message: 'Ha ocurrido un error al obtener los datos', color: 'red', type: 'negative', position: 'top-right'})
        }
    }
    getDocumentsByMe(parentId, departmentId)
    return {documents, getDocumentsByMe}
}
export function useGetDocumentsSharedWithMe(parentId: number, departmentId?: number) {
    const documents = ref([])

    async function getDocumentsSharedWithMe(ParentId?:number, DepartmentId?: number) {
        try {
            const resp = await new ShareDocumentApi().listDocumentsForMe(ParentId, DepartmentId)
            documents.value = resp.data.data
        } catch (e) {
            Notify.create({message: 'Ha ocurrido un error al obtener los datos', color: 'red', type: 'negative', position: 'top-right'})
        }
    }
    getDocumentsSharedWithMe(parentId, departmentId)
    return {documents, getDocumentsSharedWithMe}
}

export function useGetDocumentSharedWithMe(documentId?: number) {
    const documentSharedData = ref<Document>(undefined)
    async function getDocumentSharedWithMe(DocumentId?:number) {
        try {
            const resp = await new ShareDocumentApi().getDocumentForMe(DocumentId)
            documentSharedData.value = resp.data.data
        } catch (e) {
            Notify.create({message: 'Ha ocurrido un error al obtener los datos', color: 'red', type: 'negative', position: 'top-right'})
        }
    }
    getDocumentSharedWithMe(documentId)
    return {documentSharedData, getDocumentSharedWithMe}
}
