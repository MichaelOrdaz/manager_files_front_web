import { createLogger, createStore } from 'vuex'
import { auth } from './auth'
import createPersistedState  from 'vuex-persistedstate'
export interface StateInterface {
  module: unknown
}
const store = createStore<StateInterface>({
    plugins: [createLogger(), createPersistedState()],
    modules: {
        auth,
    }
})
export default store
