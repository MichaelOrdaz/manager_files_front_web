<template>
  <div
    class="p-select-container"
    ref="componentRef"
  >
    <PText
      class="label"
      color="black"
      variant="text-3"
    >
      {{ componentLabel }}
    </PText>
    <div
      class="select"
      @click="setToggleAction"
    >
      <div
        class="option"
        :title="isObject ? modelValue[`${componentOptionLabel}`] : modelValue"
      >
        {{ isObject ? modelValue[`${componentOptionLabel}`] : modelValue }}
      </div>
      <PIcon
        class="icon"
        size="pmd"
        :iconName="iconArrowDirection"
      />
    </div>
    <div
      v-if="!isObject"
      class="items"
      :class="{selectHide: !open}"
    >
      <div
        v-for="(value, index) in componentOptions"
        :key="index"
        class="item"
        @click="updateModel(value)"
      >
        {{ value }}
      </div>
    </div>
    <div
      v-else
      class="items"
      :class="{selectHide: !open}"
    >
      <div
        v-for="(value, index) in componentOptions"
        :key="index"
        class="item"
        @click="updateModel(value)"
      >
        {{ value[`${componentOptionLabel}`] }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
    ref, reactive, computed, watch, toRef,
} from 'vue'
import useDetectOutsideClick from '../../utils/useDetectOutsideClick'
import type {ComponentInternalInstance} from 'vue'


const  emit = defineEmits(['update:modelValue'])
const  props = defineProps( {
    options: {
        type: Array,
        required: true,
        default: () => [],
    },
    label: {
        type: String,
        required: false,
        default: 'Label aquí',
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
    optionLabel: {
        type: String,
        required: false,
        default: null,
    },
    optionValue: {
        type: String,
        required: false,
        default: null,
    },
    width: {
        type: String,
        default: '248px',
        required: false,
    },
    forceSelectedIndex: {
        type: Number,
        default: null,
    },
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
const modelValue = ref<any>(initialOption)
const componentOptions = ref(props.options)
const componentWidth = toRef(props, 'width')

const iconArrowDirection = computed(() => (open.value ? 'arrow_drop_up' : 'arrow_drop_down'))

function updateModel(value: string | number): void {
    modelValue.value = value
    open.value = false
    if (isObject.value) {
        emit('update:modelValue', modelValue.value[`${componentOptionValue.value}`])
    } else {
        emit('update:modelValue', modelValue.value)
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

watch([() => props.options, () => props.forceSelectedIndex], () => {
    componentOptions.value = props.options
    if (props.forceSelectedIndex) {
        modelValue.value = componentOptions.value[props.forceSelectedIndex]
        return
    }
    modelValue.value = componentOptions.value[0]
}, { deep: true })
useDetectOutsideClick(componentRef, () => { open.value = false })

</script>

<style scoped>
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
}
.select{
    max-width: 100%;
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: solid 2px #DBD9D9;
    display: flex;
    align-items: center;
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
    border-right: 2px solid gray;
    border-left: 2px solid gray;
    border-bottom: 2px solid gray;
    border-top: solid 2px gray;
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
    justify-content: center;
    align-items: center;
}
.items .item:hover {
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
