import type { Module } from 'vuex'
import {StateInterface} from '@/store'
import state, {FoldersStore} from './foldersStore'
import mutations from '@/store/FoldersStore/mutations'
import getters from '@/store/FoldersStore/getters'
import actions from '@/store/FoldersStore/actions'


export const foldersStore:Module<FoldersStore, StateInterface> = {
    state,
    actions,
    mutations,
    getters,
}
