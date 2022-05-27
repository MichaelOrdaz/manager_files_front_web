<template>
  <div class="pinput-main-container">
    <PText
      v-if="props.showLabel"
      color="gray-6"
      variant="text-4"
    >
      {{ props.label }}
    </PText>
    <PText
      v-else
      color="black"
      variant="text-4"
    >
      {{ '' }}
    </PText>
    <div :class="computedClasses">
      <PIcon
        v-if="props.prependIconName"
        :iconName="props.prependIconName"
        class="input-icon"
        :class="props.enableCursorPointerOnIcon ? 'cursor-pointer' : ''"
        @click.stop.prevent="$emit('prepend-icon-action')"
      />
      <div
        v-if="$slots.prepend"
        class="prepend-slot"
      >
        <slot name="prepend" />
      </div>
      <input
        :value="props.modelValue"
        :type="props.type"
        :maxlength="props.maxLength"
        :placeholder="props.placeHolder ? props.placeHolder : ''"
        :minlength="props.minLength"
        :readonly="props.readonly"
        @focusin="inputIsFocused = true"
        @focusout="inputIsFocused = false"
        @input="update"
      >
      <PIcon
        v-if="props.appendIconName"
        class="input-icon"
        :iconName="props.appendIconName"
        :class="props.enableCursorPointerOnIcon ? 'cursor-pointer' : ''"
        @click.stop.prevent="$emit('append-icon-action')"
      />
      <div
        v-if="$slots.append"
        class="append-slot"
      >
        <slot name="append" />
      </div>
    </div>
    <div
      v-if="errorMgs.length"
      class="errors-msgs"
    >
      <PText
        v-for="(msg, index) in errorMgs"
        :key="index"
        color="red"
        variant="text-4"
      >
        <PIcon
          v-if="!validInput && msg"
          icon-name="info"
          color="red"
        />
        {{ msg }}
      </PText>
    </div>
    <div v-if="props.successMsg && validInput && !!value">
      <PText
        color="ocean"
        variant="text-4"
      >
        <PIcon
          v-if="validInput"
          icon-name="check_circle_outline"
          color="ocean"
        />
        {{ props.successMsg }}
      </PText>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import {withDefaults, ref, inject, onMounted, getCurrentInstance, watch, computed} from 'vue'
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
    enableCursorPointerOnIcon?: boolean,
    successMsg?: string,
}

const emit = defineEmits<{
    (e:'update:modelValue', val: string | number):void,
    (e: 'prepend-icon-action'): void,
    (e: 'append-icon-action'): void,
}>()

const props = withDefaults(defineProps<Props>(), {type: 'text', rules: null, disabled: true, maxLength: '', prependIconName: '', appendIconName: '', showLabel: true, placeHolder: '', width: '320px', label: '', minLength: undefined, readonly: false, enableCursosPointerOnIcon: false, successMsg: undefined})

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
    if (!props.rules?.length)return
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
watch([value,() => props.modelValue], () => {
    value.value = props.modelValue
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
    border-radius: 4px;
}
.pinput-main-container{
    width: v-bind(pinputWidth);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.pinput-container{
    display: flex;
    width: 100%;
    height: 38px;
    border: 1px solid #D1D5DB;
    border-radius: 4px;
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
.input-icon{padding: 0 6px}
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
