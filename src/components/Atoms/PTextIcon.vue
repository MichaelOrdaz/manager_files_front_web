<template>
  <div class="icon-text-container">
    <PIcon
      :color="props.iconColor"
      :iconName="props.iconName"
    />
    <PText
      class="texts"
      variant="text-4"
      :color="props.textColor"
    >
      {{ props.text }}
    </PText>
  </div>
</template>

<script setup lang="ts">
interface Props{
    text?: string,
    textColor?: string,
    iconName?: string
    iconColor?: string,
}
const props = withDefaults(defineProps<Props>(), {
    text: 'Text', iconName: 'link', iconColor: 'black', textColor: 'black'
})
</script>

<style scoped>
.icon-text-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    white-space: nowrap;
    width: auto;
    cursor: pointer;
}
div :deep(.general-style){
    padding: 0 10px;
    font-weight: bold;
}
</style>
