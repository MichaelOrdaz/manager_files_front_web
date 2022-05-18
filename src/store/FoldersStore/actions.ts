import type {ActionTree} from 'vuex'
import {FoldersStore} from '@/store/FoldersStore/foldersStore'
import {StateInterface} from '@/store'
import {DocumentsApi} from '@/services/api/api'

const actions: ActionTree<FoldersStore, StateInterface> = {
    get_folder_content({state, commit}) {
        return new Promise((resolve, reject) => {
            new DocumentsApi().getDocuments(state.currentFolder && state.currentFolder.id ? state.currentFolder?.id : undefined )
                .then(resp => {
                    commit('SET_FOLDER_CONTENT', resp.data.data)
                    if (!state.currentFolder && !state.currentFolder?.id) {
                        commit('SET_SOURCE_FOLDER', resp.data.data)
                    }
                    resolve(resp)
                })
                .catch(error => reject(error))
        })
    }
}

export default actions
