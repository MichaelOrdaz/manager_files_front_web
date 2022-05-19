<template>
  <span
    :class="computedStyles"
    class="material-icons"
  >
    {{ props.iconName }}
  </span>
</template>

<script setup lang="ts">
import {computed, ref, withDefaults} from 'vue'
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
const componentSize = ref<string>(['pxsm' ,'psm', 'pmd'].includes(props.size) ? props.size : '')
const computedStyles = computed<string>(() => `${props.color} ${['pxsm' ,'psm', 'pmd'].includes(props.size) ? props.size : ''}`)
</script>

<style scoped lang="scss">
.material-icons{
    font-size: v-bind(componentSize);
    padding: 0; margin: 0; width: auto; background-color: transparent; border: none}
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
.gold{color: $gold}
.brown-6{color: $brown-6}
.grey{color: $grey}
.gray7{color: $gray-7}
.gray10{color: $grey-10}
</style>
