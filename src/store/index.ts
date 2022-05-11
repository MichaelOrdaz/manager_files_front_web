import { createLogger, createStore } from 'vuex'
import { auth } from './auth'
import {foldersTree} from '@/store/FoldersStore'
import createPersistedState  from 'vuex-persistedstate'
export interface StateInterface {
  modules: {auth, foldersTree}
}
const store = createStore<StateInterface>({
    plugins: [createLogger(), createPersistedState()],
    modules: {
        auth,
        foldersTree,
    }
})
export default store
