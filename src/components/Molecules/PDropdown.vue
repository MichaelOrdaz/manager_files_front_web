<template>
  <div
    ref="componentRef"
    class="dropdown-container text-left"
  >
    <div
      class="dropdown"
      @click="dropdownIsOpen = !dropdownIsOpen"
    >
      <PText
        class="truncate"
        color="black"
        variant="text-3"
      >
        {{ props.text }}
      </PText>
      <PIcon
        color="black"
        :iconName="iconArrowDirection"
      />
    </div>
    <div
      v-if="dropdownIsOpen"
      class="dropdown-actions"
      @click="dropdownIsOpen = false"
    >
      <div v-if="props?.options?.length">
        <div
          v-for="(option, index) in props.options"
          :key="index"
          class="dropdown-option"
          @click="option.action"
        >
          <slot
            name="options"
            :option="option"
          >
            <PText variant="text-4">
              {{ option.label }}
            </PText>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import useDetectOutsideClick from '../../utils/useDetectOutsideClick'

export type DropdownOption = {
    label: string,
    action: {():void},
    extraData?: object
}
interface Props { options?: DropdownOption[], text?: string }
const props = withDefaults(defineProps<Props>(), {options: undefined, text: 'Texto de demostración'})

const componentRef = ref(null)
const dropdownIsOpen = ref<boolean>(false)
const iconArrowDirection = computed(() => (dropdownIsOpen.value ? 'arrow_drop_up' : 'arrow_drop_down'))
useDetectOutsideClick(componentRef, () => {dropdownIsOpen.value = false})
</script>

<style scoped lang="scss">
.dropdown-container{
    width: 258px;
    position: relative;
}
.dropdown{
    background-color: $gray-10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    height: 40px;
    border-radius: 3px;
    box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.25);
    cursor: pointer;
}
.dropdown-actions{
    background: #FFFFFF;
    box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    position: absolute;
    right: 0;
    left: 0;
    z-index: 99;
}
.dropdown-option{
    min-height: 35px;
    text-align: left;
    padding-top: 6px;
    padding-left: 10px;
    cursor: pointer;
}
.dropdown-option:hover{
    background: #F1F1F2;
}
.truncate{
    width: 85%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 48px;
}
</style>
