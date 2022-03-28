<template>
    <div class="main-container">
        <PText v-if="props.showLabel" color="black" variant="text-4">{{props.label}}</PText>
        <PText v-else color="black" variant="text-4">{{''}}</PText>
        <div :class="computedClasses">
            <PIcon v-if="props.prependIconName" :iconName="props.prependIconName"/>
            <input
                :value="props.modelValue"
                @focusin="inputIsFocused = true"
                @focusout="inputIsFocused = false"
                @input="update"
                :type="props.type"
                :maxlength="props.maxLength"
                :placeholder="props.placeHolder ? props.placeHolder : ''"
                :minlength="props.minLength"
                :readonly="props.readonly"
            >
            <PIcon v-if="props.appendIconName" :iconName="props.prependIconName"/>
        </div>
        <div v-if="errorMgs.length" class="errors-msgs">
            <PText v-for="(msg, index) in errorMgs" :key="index" color="black" variant="text-4">{{msg}}</PText>
        </div>
        <div v-else>
            <PText color="black" variant="text-4">{{''}} </PText>
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable no-unused-vars */
import {withDefaults, ref, inject, onMounted, getCurrentInstance, watch, computed, toRef} from 'vue'
import PIcon from '@/components/Atoms/PIcon.vue'
import PText from '@/components/Atoms/PText.vue'

interface Props {
    modelValue: string | number ,
    type?: string,
    rules?: {(value: number | string ): boolean | string}[] | null,
    disabled?: boolean,
    maxLength?: string,
    minLength?: string,
    prependIconName?: string,
    appendIconName?: string,
    showLabel?: boolean,
    placeHolder?: string,
    width?: string,
    label?: string,
    readonly?: boolean,
}

const emit = defineEmits<{(e:'update:modelValue', val: string | number):void}>()

const props = withDefaults(defineProps<Props>(), {type: 'text', rules: null, disabled: true, maxLength: '', prependIconName: '', appendIconName: '', showLabel: true, placeHolder: '', width: '320px', label: '', minLength: undefined, readonly: false})

const bindInput = inject('bind-input', (val: any) => {})
const currentComponent = getCurrentInstance()
const errorMgs = ref<(string | boolean)[]>([])
const errors = ref<(string | boolean)[]>([])
const value = ref<string | number>('')
const validInput = ref<boolean>(true)
const pinputWidth = ref<string>(props.width)
const inputIsFocused = ref<boolean>(false)

const computedClasses = computed<string>(() => `${validInput.value ? '' : 'invalid-value-error'} pinput-container ${inputIsFocused.value ? 'focused': ''}`)

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
    if (bindInput){
        bindInput(currentComponent)
    }
})
watch(value, () => {
    if (props.rules?.length) {
        validateRules()
    }
})
defineExpose({validInput, validateRules})
</script>

<style scoped lang="scss">
div :deep(.general-style){ font-weight: 500; }
input{
    border: none;
    outline: none;
    width: 100%;
}
.main-container{
    width: v-bind(pinputWidth);
    margin: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.pinput-container{
    display: flex;
    width: 100%;
    height: 38px;
    border: 1px solid #D1D5DB;
    border-radius: 2px;
    justify-content: space-between;
    margin-bottom: 8px;
    margin-top: 4px;
}
.pinput-container:hover,
.pinput-container:focus,
.pinput-container:active,
.focused{
    border-color: $ocean;
}
.errors-msgs{display: flex; flex-direction: column
}
.pinput-container.invalid-value-error{
    border: 1px solid $red;
    animation: shake 0.5s;
}
@keyframes shake {
    10%, 90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%, 80% {
        transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
        transform: translate3d(4px, 0, 0);
    }
}
</style>
