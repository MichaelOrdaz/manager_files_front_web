import type {Document} from '@/Types/Document'

export interface FoldersStore {
    selectedItem?: Document,
    breadcrumbStructure?: Document[]
    treeStructure?: Document[],
    folderContent?: Document[],
}

export default function state(): FoldersStore {
    return {
        selectedItem: undefined,
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
        }],
        folderContent: [],
    }
}
