export interface DatosGenerales {
    id: number,
    nombre?: string,
    apellidoPaterno?: string,
    apellidoMaterno?: string,
}
export interface Auth {
    access_token?: string,
    expires_at?: string,
    permissions?: object,
    status?: string,
    account_status?: string,
    profile?: DatosGenerales,
    roles?: string[],
    vistas: string[],
}

export default function state(): Auth {
    return {
        profile: {
            id: 1,
            nombre: 'Prueba'
        },
        access_token: 'Prueba',
        vistas: ['Prueba']
    }
}
