type DocumentType = {
    id: 1 | 2,
    name: 'Archivo' | 'Carpeta'
}

export type Document = {
    createdAt: string,
    date: string,
    id: number,
    location: string,
    name: string,
    parent?: number,
    type: DocumentType
}
