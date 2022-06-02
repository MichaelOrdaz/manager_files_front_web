<template>
  <div class="p-tabs">
    <ul class="p-tabs-header">
      <li
        v-for="(title, index) in tabTitles"
        :key="index"
        :class="{'p-selected-tab': selectedTitle === title}"
        @click="selectedTitle = title"
      >
        <PText
          color="black"
          :variant="props.tabTitleVariant"
          @click.prevent="$emit('title-action')"
        >
          {{ title }}
        </PText>
      </li>
    </ul>
    <slot />
  </div>
</template>

<script setup lang="ts">
import {ref, provide, getCurrentInstance, onMounted} from 'vue'

defineEmits(['title-action'])
interface Props{
    tabTitleVariant?: string
}
const props = withDefaults(defineProps<Props>(), {tabTitleVariant: 'text-1'})
const currenComponent= getCurrentInstance()
const tabTitles = ref<string[]>([])
const selectedTitle = ref<string | undefined>('')
provide('selectedTitle', selectedTitle)
onMounted(() => {
    tabTitles.value = currenComponent?.slots.default().map(e => e.props?.title)
    selectedTitle.value = tabTitles.value[0]
})

</script>

<style scoped lang="scss">
.p-tabs{
    width: 100%;
    height: 100%;
}
.p-tabs-header{
    list-style: none;
    display: flex;
    margin-bottom: 12px;
}
.p-tabs-header li{
    min-width: 80px;
    text-align: center;
    margin-right: 12px;
    cursor: pointer;
    height: 40px;
}
.p-selected-tab{
    border-bottom: solid 5px $primary;
}
</style>
