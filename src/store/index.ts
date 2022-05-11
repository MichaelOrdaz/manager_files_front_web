import { createLogger, createStore } from 'vuex'
import { auth } from './auth'
import {foldersTree} from '@/store/FoldersStore'
import createPersistedState  from 'vuex-persistedstate'
import {Auth} from '@/store/auth/auth'
import {FoldersStore} from '@/store/FoldersStore/foldersStore'
export interface StateInterface {
  modules: {auth: Auth, foldersStore: FoldersStore}
}
const store = createStore<StateInterface>({
    plugins: [createLogger(), createPersistedState()],
    modules: {
        auth,
        foldersTree,
    }
})
export default store
