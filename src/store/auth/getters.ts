import {GetterTree} from 'vuex'
import {State} from './state'

export type Getters = {
    paginaInicio(state: State): string | undefined,
    sePuedeMostrar(state: State, nombreDeRuta: string): boolean
}

export const getters: GetterTree<State, State> & Getters = {
    paginaInicio(state: State): string | undefined {
        return state.profile?.nombre
    },
    sePuedeMostrar(state, nombreDeRuta): boolean {
        return state.vistas.includes(nombreDeRuta)
    }
}
