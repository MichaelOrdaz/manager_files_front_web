<template>
  <div
    :class="setChipTypeClass"
    class="pchip-container"
  >
    <PLetterIcon
      v-if="props.chipType === 'primary'"
      iconSize="pxsm"
      :text="props.chipText"
      backgroundColor="golden"
    />
    <PText
      variant="text-4"
      :color="props.textColor"
      class="truncate"
      :title="props.chipText"
    >
      {{ props.chipText }}
    </PText>
    <PIcon
      v-if="props.showIconAction"
      class="cursor-pointer component-icon"
      size="psm"
      :color="props.iconColor"
      iconName="close"
      data-cy="chip-icon-action"
      @click="$emit('icon-action')"
    />
    <PIcon
      v-else
      iconName="null"
      class="null-icon"
    />
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'

defineEmits(['icon-action'])
interface Props{
    chipText?: string,
    chipType?: string,
    iconColor?: string,
    textColor?: string,
    showIconAction?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    chipText: 'Default text', chipType: 'primary', iconColor: 'black', textColor: 'black', showIconAction: true
})
const setChipTypeClass = computed<string>(() => `${props.chipType}`)
</script>

<style scoped lang="scss">
.pchip-container{
    width: 150px;
    height: 23px;
    padding: 5px;
    border-radius: 8px;
}
.primary{
    display: flex;
    border: 2px solid orange;
    align-items: center;
    justify-content: space-between;
}
.secondary{
    background-color: $ocean;
    border: 2px solid $ocean;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.truncate{
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.component-icon{margin-left: 9px}
.null-icon{
    overflow: hidden;
    width: 15px;
}
</style>
