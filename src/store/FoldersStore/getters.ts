import type {GetterTree} from 'vuex'
import {FoldersStore} from '@/store/FoldersStore/foldersStore'
import {StateInterface} from '@/store'
import type {Document} from '@/Types/Document'

const getters: GetterTree<FoldersStore, StateInterface> = {
    getBreadcrumb(state): Document[] {
        return state.breadcrumbStructure
    },
    getCurrentFolder(state): Document{
        return state.currentFolder
    },
    getBreadcrumbStructure(state): Document[] {
        return state.breadcrumbStructure
    }

}

export default getters
