<template>
  <QSplitter
    v-model="splitterModel"
    class="full-height"
    :limits="[15, 40]"
  >
    <template #before>
      <SplitterFoldersSection />
    </template>
    <template #after>
      <SplitterViewContent />
    </template>
  </QSplitter>
</template>

<script setup lang="ts">
import SplitterFoldersSection from './SplitterFoldersSection.vue'
import SplitterViewContent from './SplitterViewContent.vue'
import {QSplitter} from 'quasar'
import {ref} from 'vue'

const splitterModel = ref<number>(20)
</script>

<style scoped lang="scss">
div :deep(.q-splitter__before){
    height: auto;
    background-color: $grey-10;
    overflow-y: auto;
}
</style>
