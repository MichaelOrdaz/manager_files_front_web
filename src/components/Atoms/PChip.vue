<template>
  <div class="pchip-container">
    <PLetterIcon
      iconSize="pxsm"
      :text="props.chipText"
    />
    <PText
      variant="text-4"
      color="black"
      class="truncate"
      :title="props.chipText"
    >
      {{ props.chipText }}
    </PText>
    <PIcon
      class="cursor-pointer"
      size="psm"
      iconName="close"
      @click="$emit('icon-action')"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits(['icon-action'])
interface Props{
    chipText?: string,
}
const props = withDefaults(defineProps<Props>(), {
    chipText: 'Default text'
})
</script>

<style scoped>
.pchip-container{
    width: 150px;
    height: 23px;
    padding: 5px;
    border: 2px solid orange;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.truncate{
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
