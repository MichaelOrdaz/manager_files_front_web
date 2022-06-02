import {ref} from 'vue'
import {Document} from '@/Types/Document'
import {ShareDocumentApi} from '@/services/api/api'
import {Notify} from 'quasar'


export function useGetDocumentsByMe(parentId?: number | undefined, departmentId?: number) {
    const documents = ref<Document[]>([])

    async function getDocumentsByMe(ParentId?: number, departmentId?: number) {
        try {
            const resp = await new ShareDocumentApi().listDocumentsByMe(ParentId, departmentId)
            documents.value = resp.data.data
        } catch (e) {
            Notify.create({message: 'Ha ocurrido un error al obtener los datos', color: 'red', type: 'negative'})
        }
    }
    getDocumentsByMe(parentId, departmentId)
    return {documents, getDocumentsByMe}
}
