import type { Module } from 'vuex'
import {StateInterface} from '../index'

import state, {Auth} from './auth'
import actions from './Actions'
import getters from './getters'
import mutations from './mutations'

export const auth:Module<Auth, StateInterface> = {
    state,
    actions,
    getters,
    mutations,
}
