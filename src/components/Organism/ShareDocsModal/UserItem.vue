<template>
  <div class="user-data">
    <div class="user-data-item">
      <PLetterIcon
        :iconSize="props.letterIconSize"
        :text="props.iconText"
        :backgroundColor="backgroundLetterIconColor"
      />
      <div class="texts">
        <PText
          class="title"
          :variant="props.itemTitleVariant"
          :title="props.itemTitleText"
        >
          {{ props.itemTitleText }}
        </PText>
        <PText
          :title="props.itemSubtitleText"
          :variant="props.itemSubtitleVariant"
        >
          {{ props.itemSubtitleText }}
        </PText>
      </div>
    </div>
    <div class="slot">
      <slot>
        <PText
          class="rol-text"
          variant="text-5"
        >
          {{ props.helpText }}
        </PText>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import useGenerateRandomColorClass from '@/utils/useGenerateRandomColorClass'

interface Props{
    itemTitleText?: string,
    itemSubtitleText?: string,
    iconText?: string,
    helpText?: string,
    itemHight?: string,
    letterIconSize?: string,
    itemTitleVariant?: string,
    itemSubtitleVariant?: string,
    iconColor?: string
}
const props = withDefaults(defineProps<Props>(), {
    iconText: 'Text', itemSubtitleText: 'Subtitle', itemTitleText: 'Title', helpText: 'Suport text', itemHight: '54px', letterIconSize: 'psm',
    itemSubtitleVariant: 'text-5', itemTitleVariant: 'text-5', iconColor: 'primary'
})
const itemHight = ref<string>(props.itemHight)
const backgroundLetterIconColor = useGenerateRandomColorClass()
</script>

<style scoped lang="scss">
.user-data{
    display: flex;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
}
.rol-text{
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.user-data-item{
    width: 50%;
    height: v-bind(itemHight);
    display: flex;
    align-items: center;
    .texts{
        width: 80%;
        display: flex;
        flex-direction: column;
        text-align: start;
        .title{font-weight: 500}
        margin-left: 18px;
        .title{
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
.user-data:hover{
    background-color: #F1F1F2;
}
</style>
