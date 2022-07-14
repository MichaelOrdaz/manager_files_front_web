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
    <PButton class="p-mt-6">
      Buscar
    </PButton>
  </div>
  <PTabs
    v-if="store.getters.isRol('Jefe de Departamento')"
    @title-action="resetSelectedFolder"
  >
    <PTab title="Compartidos por mi">
      <SharedFiles
        ref="sharedFilesCompRef"
        @click="isSharedWithMe = false"
      />
    </PTab>
    <PTab title="Compartidos conmigo">
      <SharedWithMeTab
        ref="sharedWithMeCompRef"
        :is-get-share="isSharedWithMe"
        @click="isSharedWithMe = true"
      />
    </PTab>
  </PTabs>
  <PTabs
    v-if="store.getters.isRol('Analista')"
    @title-action="resetSelectedFolder"
  >
    <PTab title="Compartidos conmigo">
      <SharedWithMeTab
        ref="sharedWithMeCompRef"
        is-get-share
      />
    </PTab>
  </PTabs>
</template>

<script setup lang="ts">
import SharedFiles from './SharedFiles.vue'
import {ref} from 'vue'
import SharedWithMeTab from '@/Pages/HeadOfDepartment/SharedFilesPage/SharedWithMeTab.vue'
import store from '@/store'

const searchValue = ref<string>('')
const sharedFilesCompRef = ref<{hideFolderInfo:() => void} | null>(null)
const sharedWithMeCompRef = ref<{hideFolderInfo:() => void} | null>(null)
const isSharedWithMe = ref<boolean>(false)
function resetSelectedFolder() {
    store.commit('RESET_SELECTED_ITEM')
    store.commit('RESET_AUTHORIZATION')
    sharedWithMeCompRef.value.hideFolderInfo()
    sharedFilesCompRef.value.hideFolderInfo()
}
store.commit('RESET_CURRENT_FOLDER')
store.commit('RESET_BREADCRUMB_STRUCTURE')
store.commit('RESET_SELECTED_ITEM')
</script>

<style scoped lang="scss">
.filter-input{
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 24px;
}
.p-mt-6{
    margin-top: 6px;
}
</style>
