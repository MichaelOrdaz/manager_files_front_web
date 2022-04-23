export type Module = {
    name: string,
    icon: string,
}
const AdminModules: Module[] = []
const HeadOfDepartmentModules: Module[] = [
    {name: 'Dashboard', icon: 'home'},
    {name: 'Shared files', icon: 'folder_shared'},
    {name: 'Users management', icon: 'people'}
]
const AnalystModules: Module[] = []
export const RolesModules = {
    Admin: AdminModules,
    'Head of Department': HeadOfDepartmentModules,
    Analyst: AnalystModules,
}

