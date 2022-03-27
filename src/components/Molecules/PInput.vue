<template>
    <div class="main-container">
        <PText color="black" variant="text-4">Label chido</PText>
        <div class="pinput-container">
            <PIcon v-if="props.prependIconName"/>
            <input
                :value="props.modelValue"
                @input="update"
                :type="props.type"
                :maxlength="props.maxLength"
            >
            <PIcon v-if="props.appendIconName"/>
        </div>
        <div v-if="errorMgs.length">
            <PText v-for="(msg, index) in errorMgs" :key="index" color="black" variant="text-4">{{msg}}</PText>
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable no-unused-vars */
import {withDefaults, ref, inject, onMounted, getCurrentInstance, watch} from 'vue'
import PIcon from '@/components/Atoms/PIcon.vue'
import PText from '@/components/Atoms/PText.vue'

interface Props {
    modelValue: string | number ,
    type?: string,
    rules?: {(value: number | string ): boolean | string}[] | null,
    disabled?: boolean,
    maxLength?: string,
    prependIconName?: string,
    appendIconName?: string,
}

const emit = defineEmits<{(e:'update:modelValue', val: string | number):void}>()

const props = withDefaults(defineProps<Props>(), {type: 'text', rules: null, disabled: true, maxLength: '', prependIconName: '', appendIconName: ''})

const bindInput = inject('bind-input')
const currentComponent = getCurrentInstance()
const errorMgs = ref<(string | boolean)[]>([])
const errors = ref<(string | boolean)[]>([])
const value = ref<string | number>('')
const validInput = ref<boolean>(true)

function update(event: Event) {
    value.value = (event.target as HTMLInputElement).value
    emit('update:modelValue', value.value)
    if (props.rules?.length) {
        validateRules()
    }
}

function validateRules(): boolean | undefined {
    errorMgs.value = []
    errors.value = []
    validInput.value = false
    props.rules?.forEach(rule => {
        const result: boolean | string | null = rule(value.value)
        errors.value.push(result)
        errorMgs.value.push(result)
        errorMgs.value = errorMgs.value.map( msg => (typeof msg !== 'boolean' ? msg : ''))
        if (errors.value?.length === props.rules?.length) {
            validInput.value = errors.value.every(el => el === true)
            return validInput.value
        }
    })
    return validInput.value
}
onMounted(() => {
    bindInput(currentComponent)
})
watch(value, () => {
    if (props.rules?.length) {
        validateRules()
    }
})
defineExpose({validInput, validateRules})
</script>

<style scoped lang="scss">
input{
    border: none;
    outline: none;
    width: 100%;
}
.main-container{
    width: 320px;
    margin: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.pinput-container{
    display: flex;
    width: 100%;
    height: 50px;
    border: 1px solid #D1D5DB;
    border-radius: 2px;
    justify-content: space-between;
}
.pinput-container:hover,
.pinput-container:focus,
.pinput-container:active{
    border-color: $ocean;
}
</style>
