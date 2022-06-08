import {DocumentsApi} from '@/services/api/api'
import {ref} from 'vue'
import type {Document} from '@/Types/Document'
import type {File} from '@/Types/File'
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
        new DocumentsApi().createDocumentFolder(newFolderName, parentId)
            .then(resp => resolve(resp))
            .catch(error => reject(error))
    })
}

export function useGetDocumentData(documentId: undefined | number) {
    const documentData = ref<Document>(undefined)
    if (!documentId) return {}
    async function getDocData(DocumentId: number | undefined) {
        const resp = await new DocumentsApi().getDocument(DocumentId)
        documentData.value = resp.data.data
    }
    getDocData(documentId)
    return { documentData, getDocData }
}

export async function useCreateFile(file: File, parentId: number|undefined): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
        new DocumentsApi().createFile(file.name, file.description, file.min_identifier,
            file.max_identifier, file.date, file.file, parentId === 0 ? undefined : parentId )
            .then(resp => resolve(resp))
            .catch(error => reject(error))
    })
}

export async function useDeleteFolder(folderId: number) {
    return new Promise((resolve, reject) => {
        new DocumentsApi().deleteDocument(folderId)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function useEditItemName(doc:Document, newName: string) {
    return new Promise((resolve, reject) => {
        new DocumentsApi().renameDocument(doc.id, {name: newName})
            .then(resp => resolve(resp))
            .catch(error => reject(error))
    })
}

export function useUpdateFolderTags(folderId: number, tags: string[]): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
        new DocumentsApi().saveDocumentTags(folderId, {tags: tags})
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function useDeleteFolderTag(folderId: number, tag: string): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
        new DocumentsApi().deleteDocumentTags(folderId, tag)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function useUpdateFile(documentId: number, pdfData: File) {
    return new Promise((resolve, reject) => {
        new DocumentsApi().updateFile(documentId,pdfData.name,pdfData.description, pdfData.min_identifier, pdfData.max_identifier, pdfData.date)
            .then(resp => resolve(resp))
            .catch(error => reject(error))
    })
}
