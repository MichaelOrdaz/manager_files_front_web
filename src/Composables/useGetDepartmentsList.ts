import {ref} from 'vue'
import {DepartmentsApi} from '@/services/api/api'

type Department = {
    id: number,
    name: string,
}
export function getDepartmentsList() {
    const departmentsList = ref<Department[]>([])
    async function getDepartments() {
        try {
            const response = await new DepartmentsApi().getDepartments()
            departmentsList.value = response.data.data
        } catch (e) {
            departmentsList.value = []
        }
    }
    getDepartments()
    return {departmentsList: departmentsList, getDepartments}
}
