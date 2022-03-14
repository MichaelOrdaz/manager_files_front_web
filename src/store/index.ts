import {createLogger, createStore} from 'vuex'
import {State} from './auth/state'
import {auth} from './auth'

export const store = createStore<State>({
    plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
    modules: {
        auth,
    }
})
