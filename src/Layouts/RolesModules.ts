export type Module = {
    name: string,
    icon: string,
}
const AdminModules: Module[] = []
const HeadOfDepartmentModules: Module[] = [
    {name: 'Home', icon: 'home'},
    {name: 'Collaborators', icon: 'people'},
    {name: 'Shared files', icon: 'folder_shared'}
]
const AnalystModules: Module[] = []
export const RolesModules = {
    Admin: AdminModules,
    'Head of Department': HeadOfDepartmentModules,
    Analyst: AnalystModules,
}

