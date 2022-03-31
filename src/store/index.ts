import { createLogger, createStore } from 'vuex'
import { auth } from './auth'

export interface StateInterface {
  module: unknown
}
const store = createStore<StateInterface>({
    plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
    modules: {
        auth,
    }
})
export default store
