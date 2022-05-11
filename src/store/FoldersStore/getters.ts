import type {GetterTree} from 'vuex'
import {FoldersStore} from '@/store/FoldersStore/foldersStore'
import {StateInterface} from '@/store'
import type {Document} from '@/Types/Document'

const getters: GetterTree<FoldersStore, StateInterface> = {
    getBreadcrumb: (state): Document[] => state.breadcrumbStructure,
    getCurrentFolder: (state): Document => state.currentFolder,
    getBreadcrumbStructure: (state): Document[] => state.breadcrumbStructure,
    getFolderContent: (state): Document[] => state.folderContent
}

export default getters
