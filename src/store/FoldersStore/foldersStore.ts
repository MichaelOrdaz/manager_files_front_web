import type {Document} from '@/Types/Document'
export type TreeNode = {
    folderId?: number,
    label?: string,
    icon?: string,
    children?: TreeNode[]
    lazy: boolean, // Quasar tree required
}
export interface FoldersStore {
    selectedItem?: Document,
    currentFolder?: Document,
    sourceFolder?: Document[],
    breadcrumbStructure?: Document[]
    treeStructure: TreeNode[],
    folderContent?: Document[],
    folderContentTotal?: number
}

export default function state(): FoldersStore {
    return {
        selectedItem: undefined,
        currentFolder: undefined,
        breadcrumbStructure: [{
            id: 0,
            type: {id: 1, name: 'Carpeta'},
            name: 'Mi unidad',
            date: '',
            location: '',
            createdAt: '',
            identifier: ''
        }],
        folderContent: [],
        treeStructure: [{
            folderId: undefined,
            icon: 'folder',
            label: 'Mi Unidad',
            children: [],
            lazy: true,
        }]
    }
}
