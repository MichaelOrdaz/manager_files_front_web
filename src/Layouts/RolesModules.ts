export type Module = {
    name: string,
    icon: string,
}
const AdminModules: Module[] = [
    {name: 'Admin Dashboard', icon: 'perm_identity'}
]
const HeadOfDepartmentModules: Module[] = [
    {name: 'Dashboard', icon: 'home'},
    {name: 'Shared files', icon: 'folder_shared'},
    {name: 'Users management', icon: 'people'}
    //TODO: 2f79yuc
]
const AnalystModules: Module[] = [
    {name: 'Analyst home', icon: 'home'},
    {name: 'Shared files', icon: 'folder_shared'},
]
export const RolesModules = {
    Admin: AdminModules,
    'Jefe de Departamento': HeadOfDepartmentModules,
    Analista: AnalystModules,
}

