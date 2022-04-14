<template>
  <div
    :class="computedClasses"
    class="general-style"
  >
    <slot>
      Text
    </slot>
  </div>
</template>

<script setup lang="ts">
import {computed, withDefaults} from 'vue'

interface Props{
    variant?: string,
    color?: string,
}
const props = withDefaults(defineProps<Props>(), {
    color: 'black',
    variant: 'title-1'
})
const computedClasses = computed<string>(() => `${props.variant} ${props.color}`)
</script>

<style scoped lang="scss">
.general-style{
    display: inline-block;
    font-weight: 400;
    font-style: normal;
}
.title-1{
    font-size: 60px;
}
.title-2{
    font-size: 50px;
}
.title-3{
    font-size: 44px;
}
.title-4{
    font-size: 40px;
}
.title-5{
    font-size: 36px;
}
.title-6{
    font-size: 32px;
}
.subtitle-1{
    font-size: 30px;
}
.subtitle-2{
    font-size: 24px;
}
.text-1{
    font-size: 20px;
}
.text-2{
    font-size: 18px;
}
.text-3{
    font-size: 16px;
}
.text-4{
    font-size: 14px;
}
.text-5{
    font-size: 12px;
}
.primary{color: $primary }
.secondary{color: $secondary }
.ocean{color: $ocean }
.vegetation{color: $vegetation }
.wealth{color: $wealth }
.red{color: $red }
.gold{color: $gold }
.white{color: white}
.black{color: black}
.gray-7{color: $gray-7}

</style>
