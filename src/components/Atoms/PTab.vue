<template>
  <div
    v-show="selectedTitle === props.title"
    class="tab-content"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import {inject} from 'vue'
interface Props{
    title: string
}
const props = defineProps<Props>()
const selectedTitle = inject('selectedTitle')

</script>

<style scoped>
.tab-content{
    width: 100%;
    height: 100%;
}
</style>
