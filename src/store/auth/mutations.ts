import type {MutationTree} from 'vuex'
import {Auth} from './auth'

const mutations: MutationTree<Auth> = {
    mutation(state) {
        state.access_token = `${state.access_token} 1`
    }
}

export default mutations
