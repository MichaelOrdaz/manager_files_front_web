import type { Module } from 'vuex'
import {StateInterface} from '@/store'
import state, {FoldersStore} from './foldersStore'
import mutations from '@/store/FoldersStore/mutations'
import getters from '@/store/FoldersStore/getters'


export const foldersTree:Module<FoldersStore, StateInterface> = {
    state,
    mutations,
    getters,
}
