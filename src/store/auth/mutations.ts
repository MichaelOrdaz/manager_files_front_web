import type {MutationTree} from 'vuex'
import {Auth} from './auth'

const mutations: MutationTree<Auth> = {
    AUTH_SUCCESS(state, payload): void {
        state.access_token = payload.token
    },
    USER_SUCCESS(state, payload): void {
        state.status = 'success'
        state.user_data = payload.user
        state.views = payload.views
        state.roles = payload.roles
    },
    USER_ERROR(state): void {
        state.status = 'error'
    },
    AUTH_REQUEST(state): void {
        state.status = 'loading'
    },
    AUTH_LOGOUT(state):void {
        state.status = ''
        state.access_token = ''
        state.views = []
        state.user_data = {name: '', id: 0}
        state.expires_at = ''
        state.status = ''
        state.permissions = []
    }
}

export default mutations
