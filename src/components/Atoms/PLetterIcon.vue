<template>
  <div
    class="p-letter-icon"
    :class="computedClasses"
  >
    <span>{{ fisrtLetter }}</span>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'

interface Props{
    text?: string,
    backgroundColor?: string,
    iconSize?: string,
}
const props = withDefaults(defineProps<Props>(), {text: '?', backgroundColor: 'primary', iconSize: 'pmd'})

const fisrtLetter = computed<string>(() => props.text[0])
const computedClasses = computed<string>(() => `${props.iconSize} ${props.backgroundColor}`)
</script>

<style scoped lang="scss">
.p-letter-icon{
    height: 66px;
    width: 66px;
    font-size: 36px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}
.primary{background-color: $primary}
.golden{background-color: $gold}
.secondary{background-color:$secondary }
.ocean{background-color:$ocean }
.vegetation{background-color:$vegetation }
.wealth{background-color:$wealth }
.red{background-color:$red }
.brown-6{background-color:$brown-6 }
.pink-2{background-color:$pink-2 }
.grey{background-color:$grey }
.gray-5{background-color:$gray-5 }
.gray-6{background-color:$gray-6 }
.gray-7{background-color:$gray-7 }
.grey-10{background-color:$grey-10 }
.pxsm{
    height: 15px;
    width: 15px;
    font-size: 10px;
}
.psm{
    height: 25px;
    width: 25px;
    font-size: 12px;
}
.pmd{
    height: 66px;
    width: 66px;
    font-size: 36px;
    font-weight: 600;
}
</style>
