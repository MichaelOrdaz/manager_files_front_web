import {AuthApi} from '@/services/api/api'
import {ref} from 'vue'

export default function useValidateAuthToken() {
    const isValid = ref<boolean>()
    async function validate() {
        const resp = await new AuthApi().verifyAuth()
        isValid.value = resp.data?.isAuth
    }
    validate()
    return {isValid}
}
