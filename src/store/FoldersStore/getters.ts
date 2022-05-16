import type {GetterTree} from 'vuex'
import {FoldersStore} from '@/store/FoldersStore/foldersStore'
import {StateInterface} from '@/store'
import type {Document} from '@/Types/Document'

const getters: GetterTree<FoldersStore, StateInterface> = {
    getBreadcrumb: (state): Document[] => state.breadcrumbStructure,
    getCurrentFolder: (state): Document => state.currentFolder,
    getSelectedItem: (state): Document => state.selectedItem,
    getBreadcrumbStructure: (state): Document[] => state.breadcrumbStructure,
    getFolderContent: (state): Document[] => state.folderContent,
    getTree: (state) => state.sourceFolder?.map(el => {
        return {
            folderId: el.id,
            label: el.name,
            icon: 'folder',
            type: el.type,
            lazy: true,
            children: []
        }
    }).filter(ele => ele.type?.name === 'Carpeta' ) ?? [],
    isFolder: (state): boolean => state.selectedItem.type.name === 'Carpeta' ?? false
}

export default getters
