export type File = {
    name: string,
    description: string,
    min_identifier: string,
    max_identifier?: string,
    date: string,
    file?: string | File,
    parent_id?: number
}
