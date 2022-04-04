<template>
  <span
    :class="computedStyles"
    class="material-icons"
  >
    {{ props.iconName }}
  </span>
</template>

<script setup lang="ts">
import {computed, withDefaults} from 'vue'
interface Props {
    iconName?: string,
    size?: string,
    color?: string,
}
const props = withDefaults(defineProps<Props>(), {
    iconName: 'link',
    size: 'pmd',
    color: 'negro',
})
const computedStyles = computed<string>(() => `${props.color} ${props.size}`)
</script>

<style scoped lang="scss">
.material-icons{ padding: 0; margin: 0; width: auto}
.pxsm{
    font-size: 6px;
}
.psm{
    font-size: 12px;
}
.pmd{
    font-size: 24px;
}
.white{color: white}
.black{color: black}
.red{color: $red}
.link{color: $ocean}
.brown-6{color: $brown6}
</style>
