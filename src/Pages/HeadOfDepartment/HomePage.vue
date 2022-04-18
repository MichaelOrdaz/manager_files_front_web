<template>
  <QSplitter
    v-model="splitterModel"
    class="full-height"
    :limits="[15, 50]"
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
import SplitterFoldersSection from './Home/SplitterFoldersSection.vue'
import SplitterViewContent from './Home/SplitterViewContent.vue'
import {QSplitter} from 'quasar'
import {ref} from 'vue'

const splitterModel = ref<number>(20)
</script>

<style scoped lang="scss">
div :deep(.q-splitter__before){
    height: auto;
    background-color: $grey-5;
    overflow-y: auto;
}
</style>
