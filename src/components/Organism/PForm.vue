<template>
  <form>
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide, ref} from 'vue'
import type { ComponentInternalInstance} from 'vue'

const inputsOnForm = ref<ComponentInternalInstance[]>([])
const results = ref<boolean[]>([])

function validate():boolean {
    results.value = []
    if (inputsOnForm.value.length) {
        inputsOnForm.value.forEach((component: ComponentInternalInstance) => {
            const result: boolean = component.exposed?.validateRules()
            results.value.push(result)
        })
        return results.value.every(result => result)
    }
    return true
}

function bindInput(component: ComponentInternalInstance):void {
    inputsOnForm.value.push(component)
}

provide('bind-input', bindInput)
defineExpose({validate})
</script>

<style scoped>

</style>
