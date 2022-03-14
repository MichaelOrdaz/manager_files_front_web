export interface DatosGenerales {
    id: number,
    nombre?: string,
    apellidoPaterno?: string,
    apellidoMaterno?: string,
}
export type State = {
    access_token?: string,
    expires_at?: string,
    permissions?: object,
    status?: string,
    account_status?: string,
    profile?: DatosGenerales,
    roles?: string[],
}

export const state: State = {
    profile: {
        id: 1,
        nombre: 'Prueba'
    },
    access_token: 'Prueba'
}
