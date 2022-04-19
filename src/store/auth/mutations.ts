import type {MutationTree} from 'vuex'
import {Auth} from './auth'

const mutations: MutationTree<Auth> = {
    AUTH_SUCCESS(state, payload) {
        state.access_token = payload.token
        state.user_data = payload.user
    }
}

export default mutations
