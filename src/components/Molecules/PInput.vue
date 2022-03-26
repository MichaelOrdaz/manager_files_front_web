<template>
  <div>
    <PIcon />
    <input
      :value="props.modelValue"
      @input="update"
      :type="props.type"
    >
    <PIcon />
    <div v-if="errorMgs.length">
      <p
        v-for="(error, index) in errorMgs"
        :key="index"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {withDefaults, ref} from 'vue'
import PIcon from '@/components/Atoms/PIcon.vue'
interface Props {
    modelValue: string | number ,
    type?: string,
    // eslint-disable-next-line no-unused-vars
    rules?: {(value: number | string | RegExp): boolean | string}[] | null,
}
const emit = defineEmits<{(e:'update:modelValue', val: string | number):void}>()
const props = withDefaults(defineProps<Props>(), {type: 'text', rules: null})
const errorMgs = ref<(string | boolean)[]>([])
const errors = ref<(string | boolean)[]>([])
const value = ref<string | number>('')
const validInput = ref<boolean>(false)
function update(event: Event) {
    value.value = (event.target as HTMLInputElement).value
    emit('update:modelValue', value.value)
    validateRules()
}
function validateRules(): boolean | undefined {
    if (!props.rules?.length) return
    errorMgs.value = []
    props.rules?.forEach(rule => {
        console.log('Antes de la regla', rule)
        console.log('Hola')
        const result: boolean | string | null = rule(value.value)
        errors.value.push(result)
        errorMgs.value.push(result)
        errorMgs.value.map( msg => (typeof msg !== 'boolean' ? msg : ''))
        if (errors.value.length === props.rules?.length) {
            validInput.value = errors.value.every(el => el === true)
            return validInput.value
        }
        validInput.value = false
        return validInput.value
    })
}
</script>

<style scoped>

</style>
