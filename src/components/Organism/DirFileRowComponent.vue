<template>
  <div
    class="dir-file-component-container"
    :class="props.isSelected && 'is-selected'"
  >
    <div class="avatar-title">
      <PAvatar
        size="pmd"
        :src="props.image"
      />
      <PText
        class="q-ml-lg truncate"
        variant="text-5"
        :title="props.firstText"
      >
        {{ props.firstText ?? '' }}
      </PText>
    </div>
    <PText
      class="text truncate"
      variant="text-5"
      :tile="props.secondText"
    >
      {{ props.secondText ?? '' }}
    </PText>
    <PText
      class="text truncate"
      variant="text-5"
      :title="props.thirdText"
    >
      {{ props.thirdText ?? '' }}
    </PText>
    <PText
      class="text truncate"
      variant="text-5"
      :title="props.fourthText"
    >
      {{ props.fourthText ?? 'Texto de prueba' }}
    </PText>
    <POptionList
      v-if="props.optionsList"
      :options="props.optionsList"
    />
  </div>
</template>

<script setup lang="ts">
import DirectorySvg from '@/assets/directory-img.svg'
import {Option} from '@/components/Molecules/POptionList.vue'
interface Props{
    optionsList?: Option[],
    firstText?: string,
    secondText?: string,
    thirdText?: string,
    fourthText?: string,
    image?: string,
    isSelected?: boolean,
}
const props = withDefaults(defineProps<Props>(),{
    firstText: 'Text 1', secondText: 'Text 2', thirdText: 'Text 3', optionsList: undefined, image: DirectorySvg
    ,fourthText: undefined, isSelected: false,
})
</script>

<style scoped>
.dir-file-component-container{
    width: 100%;
    height: 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.dir-file-component-container:hover{
    background-color: #F1F1F2;
}
.is-selected {background-color: #f1f1f2}
.avatar-title{
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.text{
    width: 25%;
    padding-right: 24px;
}
.truncate{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
