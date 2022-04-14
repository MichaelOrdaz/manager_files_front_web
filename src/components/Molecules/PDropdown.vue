<template>
  <div
    class="dropdown-container"
    ref="componentRef"
  >
    <div
      class="dropdown"
      @click="dropdownIsOpen = !dropdownIsOpen"
    >
      <PText
        class="truncate"
        color="white"
        variant="text-4"
      >
        {{ props.text }}
      </PText>
      <PIcon
        color="white"
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
          class="dropdown-option"
          v-for="(option, index) in props.options"
          :key="index"
          @click="option.action"
        >
          <slot
            name="options"
            :option="option"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import useDetectOutsideClick from '../../utils/useDetectOutsideClick'

export type Option = {
    label: string,
    action: Function,
}
interface Props { options?: Option[], text?: string }
const props = withDefaults(defineProps<Props>(), {options: undefined, text: 'Texto de demostración'})

const componentRef = ref(null)
const dropdownIsOpen = ref<boolean>(false)
const iconArrowDirection = computed(() => (dropdownIsOpen.value ? 'arrow_drop_up' : 'arrow_drop_down'))
useDetectOutsideClick(componentRef, () => {dropdownIsOpen.value = false})
</script>

<style scoped lang="scss">
.dropdown-container{
    max-width: 256px;
    position: relative;
}
.dropdown{
    background-color: $brown-6;
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
}
.dropdown-option{
    height: 35px;
    text-align: left;
    padding-top: 6px;
    padding-left: 41px;
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
