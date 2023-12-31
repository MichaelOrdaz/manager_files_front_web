<template>
  <div
    ref="componentRef"
    class="p-select-container"
  >
    <PText
      class="label"
      color="gray-6"
      variant="text-3"
    >
      {{ componentLabel }}
    </PText>
    <div
      class="select"
      :class="setErrorClass"
      @click="setToggleAction"
    >
      <div
        class="option text-left q-pl-md"
        :title="isObject ? val[`${componentOptionLabel}`] : val"
      >
        {{ isObject ? val[props.optionLabel] : val }}
      </div>
      <PIcon
        class="icon"
        size="pmd"
        :iconName="iconArrowDirection"
        :color="isValidValue ? 'black' : 'red'"
      />
    </div>
    <div
      v-if="errorMgs.length"
      class="errors-msgs"
    >
      <PText
        v-for="(msg, index) in errorMgs"
        :key="index"
        color="black"
        variant="text-4"
      >
        {{ msg }}
      </PText>
    </div>
    <div
      v-if="!isObject && componentOptions.length"
      class="items"
      :class="{selectHide: !open}"
    >
      <div
        v-for="(value, index) in componentOptions"
        :key="index"
        class="item text-left"
        data-cy="select-option"
        @click="updateModel(value)"
      >
        {{ value }}
      </div>
    </div>
    <div
      v-if="isObject && componentOptions.length"
      class="items"
      :class="{selectHide: !open}"
    >
      <div
        v-for="(value, index) in componentOptions"
        :key="index"
        class="item text-left"
        data-cy="select-option"
        @click="updateModel(value)"
      >
        {{ value[`${componentOptionLabel}`] }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import {
    ref, computed, watch, toRef, withDefaults, onMounted, inject, getCurrentInstance
} from 'vue'
import useDetectOutsideClick from '../../utils/useDetectOutsideClick'
import type {ComponentInternalInstance} from 'vue'

interface Props {
    modelValue?: string | number | object,
    options?: any[],
    label?: string,
    disabled?: boolean,
    optionLabel?: string,
    optionValue?: string,
    width?: string,
    forceSelectedIndex?: number,
    // eslint-disable-next-line no-unused-vars
    rules?: {(value: number | string ): boolean | string}[] | null,
}
const  emit = defineEmits(['update:modelValue'])
const  props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    options: undefined,
    label: 'Label aquí',
    disabled: false,
    optionLabel: undefined,
    optionValue: undefined,
    width: '248px',
    forceSelectedIndex: undefined,
    rules: null,
})

const open = ref(false)
const componentRef = ref<ComponentInternalInstance>()
const componentLabel = ref(props.label)
const componentOptionValue = ref(props.optionValue)
const componentOptionLabel = ref(props.optionLabel)
const initialOption = props.options.length > 0
    ? (props.forceSelectedIndex === null
        ? props.options[0]
        : props.options[props.forceSelectedIndex]
    )
    : 'Cargando...'
const val = ref<any>(initialOption)
const componentOptions = ref(props.options.length ? props.options : [])
const componentWidth = toRef(props, 'width')
const isValidValue = ref<boolean>(true)
const errorMgs = ref<(string | boolean | null)[]>([])
const errors = ref<(string | boolean | null)[]>([])
const currentComponent = getCurrentInstance()
// eslint-disable-next-line no-unused-vars
const bindInput = inject('bind-input', (val: any) => {})

const setErrorClass = computed<string>(() => isValidValue.value ? '' : 'invalid-value-error')
const iconArrowDirection = computed(() => (open.value ? 'keyboard_arrow_up' : 'keyboard_arrow_down'))

function updateModel(value: string | number | object): void {
    val.value = value
    open.value = false
    if (props.rules?.length) {
        validateRules()
    }
    if (isObject.value) {
        emit('update:modelValue', val.value[componentOptionValue.value])
        return
    } else {
        emit('update:modelValue', val.value)
        return
    }
}


const setToggleAction = computed<(() => void) | (() => boolean)>(() => {
    if (props.disabled) {
        return () => {}
    }
    return (() => open.value = !open.value)
})

const isObject = computed<boolean>(() => {
    return props.optionValue != null && props.optionLabel != null
})

function validateRules(): boolean | undefined {
    if (!props.rules?.length)return
    errorMgs.value = []
    errors.value = []
    isValidValue.value = false
    props.rules?.forEach((rule) => {
        const result: boolean | string | null = rule(val.value)
        errors.value.push(result)
        errorMgs.value.push(result)
        errorMgs.value = errorMgs.value.map( msg => (typeof msg !== 'boolean' ? msg : ''))
        if (errors.value?.length === props.rules?.length) {
            isValidValue.value = errors.value.every(el => el === true)
            return isValidValue.value
        }
    })
    return isValidValue.value
}

function updateVal() {
    if (props.forceSelectedIndex) {
        val.value = componentOptions.value[props.forceSelectedIndex]
        return
    }else if (props.modelValue) {
        if (isObject.value) {
            val.value = componentOptions.value.find(opt => opt[props.optionValue] === props.modelValue[props.optionValue])
            return
        }
        val.value = props.modelValue
        return
    }
    val.value = componentOptions.value[0]
}
onMounted(() => {
    if (bindInput){
        bindInput(currentComponent)
    }
})

watch([() => props.options, () => props.forceSelectedIndex], () => {
    componentOptions.value = props.options
    updateVal()
}, { deep: true })
useDetectOutsideClick(componentRef, () => { open.value = false })
defineExpose({validateRules})
</script>

<style scoped lang="scss">
.p-select-container{
    height: 62px;
    width: v-bind(componentWidth);
    color: black;
    position: relative;
    cursor: pointer;
}
.label{
    width: 100%;
    text-align: left;
    font-weight: 500;
}
.select{
    max-width: 100%;
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: solid 1px #DBD9D9;
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    margin-top: 4px;
}
.select:hover{
    border: solid 2px rgba(0, 0, 0, 0.50);
}
.option{
    width: 90%;
}
.icon{
    width: 10%;
}
.items {
    color: #fff;
    border-radius: 0px 0px 6px 6px;
    overflow: hidden;
    border: solid 1px #DBD9D9;
    position: absolute;
    background-color: white;
    left: 0;
    right: 0;
    z-index: 99;
    max-height: 500px;
    overflow-y: scroll;

}
.items div {
    padding-left: 1em;
    user-select: none;
    color: black;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.items .p-select-item:hover {
    background-color: rgba(128, 128, 128, 0.541);
}
.selectHide {
    display: none;
}
.disabled{
    cursor: not-allowed;
    background-color: rgba(128, 128, 128, 0.472);
    pointer-events: painted;
}
.select.invalid-value-error{
    border: 1px solid $red;
    animation: shake 0.5s;
}
.errors-msgs{display: flex; flex-direction: column; align-items: flex-start;}
div :deep(.general-style){ font-weight: 500; }
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
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 10px;
}
</style>
