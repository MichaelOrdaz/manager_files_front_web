<template>
  <div class="filter-input">
    <PInput
      v-model="searchValue"
      class="q-mr-sm"
      appendIconName="tune"
      prependIconName="search"
      placeHolder="Buscar"
      width="758px"
      enableCursorPointerOnIcon
      data-cy="filter-docs-input"
    />
    <PButton class="p-mt-4">
      Buscar
    </PButton>
  </div>
  <PTabs>
    <PTab title="Compartidos por mi">
      <SharedFiles />
    </PTab>
    <PTab title="Compartidos conmigo">
      <SharedWithMeTab />
    </PTab>
  </PTabs>
</template>

<script setup lang="ts">
import SharedFiles from './SharedFiles.vue'
import {ref} from 'vue'
import SharedWithMeTab from '@/Pages/HeadOfDepartment/SharedFilesPage/SharedWithMeTab.vue'

const searchValue = ref<string>('')
</script>

<style scoped lang="scss">
.filter-input{
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 24px;
}
</style>
