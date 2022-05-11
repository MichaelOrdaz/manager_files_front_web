import type {MutationTree} from 'vuex'
import type {FoldersStore} from '@/store/FoldersStore/foldersStore'
import type {Document} from '@/Types/Document'

const mutations: MutationTree<FoldersStore> = {
    SET_CURRENT_FOLDER(state, payload: Document): void{
        state.currentFolder = payload
    },
    RESET_CURRENT_FOLDER(state): void {
        state.currentFolder = undefined
    },
    RESET_BREADCRUMB_STRUCTURE(state): void {
        state.breadcrumbStructure = [{
            id: 0,
            type: {id: 1, name: 'Carpeta'},
            name: 'Inicio',
            date: '',
            location: '',
            createdAt: ''
        }]
    },
    BUILD_BREADCRUMB(state, payload: Document): void {
        state.breadcrumbStructure.push(payload)
    },
    REBUILD_BREADCRUMB(state, folder:Document): void {
        const folderIndex = state.breadcrumbStructure.findIndex(el => el.id === folder.id)
        if (folderIndex > 0) {
            state.breadcrumbStructure.splice(folderIndex + 1, state.breadcrumbStructure.length)
        }
        if (folderIndex === 0) {
            state.breadcrumbStructure.splice(1, state.breadcrumbStructure.length)
        }
    },
    SET_FOLDER_CONTENT(state, payload: Document[]): void {
        state.folderContent = payload
    }
}

export default mutations
