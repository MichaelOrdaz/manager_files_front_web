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
import store from '@/store'

const splitterModel = ref<number>(20)
store.commit('RESET_AUTHORIZATION')
</script>

<style scoped lang="scss">
div :deep(.q-splitter__before){
    height: auto;
    background-color: $gray-10;
    overflow-y: auto;
}
div :deep(.q-splitter__panel.q-splitter__after){
    min-height: 1500px;
}
</style>
