import type {Document} from '@/Types/Document'

export interface FoldersStore {
    currentFolder?: Document,
    breadcrumbStructure?: Document[]
    treeStructure?: Document[]
}

export default function state(): FoldersStore {
    return {
        currentFolder: undefined,
        breadcrumbStructure: [{
            id: 0,
            type: {id: 1, name: 'Carpeta'},
            name: 'Inicio',
            date: '',
            location: '',
            createdAt: ''
        }],
        treeStructure: [{
            id: 0,
            type: {id: 1, name: 'Carpeta'},
            name: '',
            date: '',
            location: '',
            createdAt: ''
        }]
    }
}
