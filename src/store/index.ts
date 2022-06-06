import { createStore } from 'vuex'
import { auth } from './auth'
import {foldersStore} from '@/store/FoldersStore'
import createPersistedState  from 'vuex-persistedstate'
import {Auth} from '@/store/auth/auth'
import {FoldersStore} from '@/store/FoldersStore/foldersStore'
export interface StateInterface {
  modules: {auth: Auth, foldersStore: FoldersStore}
}
const store = createStore<StateInterface>({
    plugins: [createPersistedState()],
    modules: {
        auth,
        foldersStore,
    }
})
export default store
