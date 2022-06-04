<template>
  <div
    ref="componentRef"
    class="option-list-container"
  >
    <PIcon
      v-if="props.type === 'icon'"
      class="my-icon"
      iconName="more_vert"
      color="black"
      @click.stop.prevent="show = !show"
    />
    <PAvatar
      v-if="props.type === 'avatar'"
      :src="props.avatarSrc"
      class="cursor-pointer"
      @click.stop.prevent="show = !show"
    />
    <div
      v-if="props?.options?.length && show"
      class="list"
      @click="show = false"
    >
      <div
        v-if="$slots.header"
        class="header-option"
      >
        <slot name="header" />
      </div>
      <div
        v-for="(option, index) in props.options"
        :key="index"
        class="option"
        @click.stop.prevent="option.action"
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
import useDetectOutsideClick from '@/utils/useDetectOutsideClick'
import DefaultImg from '@/assets/profileicon.svg'
import { ref} from 'vue'
export type Option = {
 action: { ():void },
 optionLabel: string,
 icon: string,
}
interface Props {
    options?: Option[],
    type?: string,
    avatarSrc?: string
}
const props = withDefaults(defineProps<Props>(), {options: undefined, type: 'icon', avatarSrc: DefaultImg})
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
    padding: 12px 12px;
    cursor: pointer;
}
.option:hover{
    background: #F1F1F2;
}
.header-option{
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: flex-start;
    padding: 6px 6px;
}
.option-list-container.avatar{
    z-index: 1;
}
</style>
