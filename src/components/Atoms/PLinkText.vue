<template>
  <div class="link-text-container">
    <PIcon
      v-if="props.prependIconName"
      color="link"
      size="psm"
      :iconName="props.prependIconName"
    />
    <div class="link-text">
      <slot />
    </div>
    <PIcon
      v-if="props.appendIconName"
      color="link"
      size="psm"
      :iconName="props.appendIconName"
    />
  </div>
</template>

<script setup lang="ts">
interface Props{
    prependIconName?: string,
    appendIconName?: string,
}
const props = withDefaults(defineProps<Props>(), {
    prependIconName: undefined, appendIconName: undefined,
})
</script>

<style scoped lang="scss">
.link-text-container{
    display: inline-block;
    cursor: pointer;
}
.link-text{
    display: inline-block;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: $ocean;
    text-decoration: underline;
    margin: 0 5px;
}
</style>
