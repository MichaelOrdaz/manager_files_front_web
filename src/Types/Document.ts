import {User} from '@/Types/User'
import {Department} from '@/Types/Department'

type DocumentType = {
    id: 1 | 2,
    name: 'Archivo' | 'Carpeta'
}

export type DocumentRecord = {
    id?: number,
    date?: string,
    name?: User,
    action?: {
        id?: number,
        name?: string
    }
}

export type Document = {
    creator?: User,
    tags?: string[],
    identifier: string,
    createdAt: string,
    date: string,
    id: number,
    location?: string,
    name: string,
    parent?: number,
    type: DocumentType,
    department?: Department,
    historical?: DocumentRecord[]
}
