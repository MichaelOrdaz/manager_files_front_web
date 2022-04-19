<template>
  <div
    ref="componentRef"
    class="option-list-container"
  >
    <PIcon
      class="my-icon"
      iconName="more_vert"
      color="black"
      @click="show = !show"
    />
    <div
      v-if="props?.options?.length && show"
      class="list"
      @click="show = false"
    >
      <div
        v-for="(option, index) in props.options"
        :key="index"
        class="option"
        @click="option.action"
      >
        <PIcon
          size="pmd"
          :iconName="option.icon"
        />
        <PText variant="text-3">
          {{ option.optionLabel }}
        </PText>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDetectOutsideClick from '../../utils/useDetectOutsideClick'
import { ref} from 'vue'
export type Option = {
 action: { ():void },
 optionLabel: string,
 icon: string,
}
interface Props {
    options?: Option[]
}
const props = withDefaults(defineProps<Props>(), {options: undefined})
const show = ref<boolean>(false)
const componentRef = ref(null)
useDetectOutsideClick(componentRef, () => { show.value = false})
</script>

<style scoped>
.option-list-container{
    width: 24px;
    height: 24px;
    position: relative;
}
.my-icon{
    cursor: pointer;
}
.list{
    width: 186px;
    position: relative;
    right: 173px;
    top: 3px;
    background-color: white;
    border-radius: 3px;
    box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.25);
}
.option{
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: flex-start;
    padding: 6px 6px;
    cursor: pointer;
}
.option:hover{
    background: #F1F1F2;
}
</style>
