<template>
  <div class="header-container">
    <div class="filter-input">
      <PInput
        v-model="searchValue"
        class="q-mr-sm"
        prependIconName="search"
        placeHolder="Buscar"
        width="758px"
        data-cy="filter-docs-input"
      />
      <!--        TODO: 2f79yuc-->
      <PButton
        v-if="false"
        class="p-mt-4"
      >
        Buscar
      </PButton>
      <AdvancedSearch
        v-if="showAdvancedSearch"
        class="search"
        @cancel="showAdvancedSearch = false"
      />
    </div>
  </div>
  <div>
    <ViewBreadcumb
      :actualFolder="selectedFolder"
      @change-folder="changeFolder"
    />
    <ViewFoldersDescAndActions
      ref="FoldersDescAndActionsRef"
      :selectedFolderId="selectedFolder ? selectedFolder.id : undefined"
      @update-list="changeFolder"
    />
  </div>
  <div
    v-if="!list.length"
    class="no-data"
    @dragenter.prevent
    @dragleave.prevent
    @dragover.prevent
    @drop.prevent="takeDragFile($event)"
  >
    <img
      class="p-mt-122"
      :src="NoDataSvg"
      alt="No data"
    >
  </div>
  <div
    v-else
    class="section"
    @dragenter.prevent
    @dragleave.prevent
    @dragover.prevent
    @drop.prevent="takeDragFile($event)"
  >
    <div class="items-col">
      <DirFileRowComponent
        v-for="(document, index) in list"
        :key="index"
        class="cursor-pointer"
        :firstText="document.name"
        :secondText="document.createdAt"
        :thirdText="Dayjs(document.date).format('YYYY-MM-DD')"
        :image="document.type.name === 'Carpeta' ? DirectorySvg : FileImg"
        data-cy="document-item-row"
        :is-selected="selectedFolder?.id === document.id"
        :optionsList="rowOptions"
        @mouseover="holdDocumentDocused(document)"
        @mouseleave="documentFocused = undefined"
        @click="showFolderInfo(document)"
      />
    </div>
    <FolderInfo
      v-if="showFolderInfoSection && selectedFolder"
      class="folder-info"
    />
    <!--    <ShareDocsModalIndex />-->
  </div>
</template>

<script setup lang="ts">
import {computed, provide, ref} from 'vue'
import ViewBreadcumb from '@/Pages/HeadOfDepartment/Home/ViewBreadcrumb.vue'
import ViewFoldersDescAndActions from '@/Pages/HeadOfDepartment/Home/ViewFoldersDescAndActions.vue'
import AdvancedSearch from './AdvancedSearch.vue'
import NoDataSvg from '@/assets/uploadfiles.svg'
import DirFileRowComponent from '@/components/Organism/DirFileRowComponent.vue'
import DirectorySvg from '@/assets/directory-img.svg'
import FileImg from '@/assets/pdfimg.png'
import type {Document} from '@/Types/Document'
import FolderInfo from '@/components/Organism/FolderInfoComponent/index.vue'
import Dayjs from 'dayjs'
import store from '@/store/index'
import {Notify} from 'quasar'
import {Option} from '@/components/Molecules/POptionList.vue'
import ShareDocsModalIndex from '@/components/Organism/ShareDocsModal/ShareDocsModalIndex.vue'

const searchValue = ref<string>('')
const showAdvancedSearch = ref<boolean>(false)
const showFolderInfoSection = ref<boolean>(false)
const selectedFolder = ref<Document | undefined>(undefined)
const timer = ref(null)
const clicksCount = ref<number>(0)
const rowOptions = ref<Option[]>([{optionLabel: 'Compartir', icon: 'link', action: () => []}])
const documentFocused = ref<Document | undefined>(undefined)
// eslint-disable-next-line no-unused-vars
const FoldersDescAndActionsRef = ref<{component: typeof ViewFoldersDescAndActions, takeDropFile: (file: File) => void } | null>(null)

const list = computed<Document[]>(() => store.getters.getFolderContent.filter(doc => doc.name.match(searchValue.value))
    .sort((a) => a.type.name ==='Archivo' ? 1 : -1))
function showFolderInfo(doc: Document) {
    clicksCount.value++
    if (clicksCount.value === 1) {
        timer.value = setTimeout(() => {
            selectedFolder.value = doc
            store.commit('SET_SELECTED_ITEM', doc)
            clicksCount.value = 0
            showFolderInfoSection.value = true
        }, 250)
    }else {
        clearTimeout(timer.value)
        if (doc.type.name === 'Carpeta'){
            store.commit('SET_CURRENT_FOLDER',doc)
            store.commit('BUILD_BREADCRUMB', doc)
            store.dispatch('get_folder_content')
            clicksCount.value = 0
        }
    }
}

function changeFolder() {
    store.dispatch('get_folder_content')
}
function takeDragFile(event: DragEvent) {
    if (event.dataTransfer?.files[0]?.type === 'application/pdf'){
        FoldersDescAndActionsRef.value.takeDropFile(event.dataTransfer?.files[0])
        return
    }
    Notify.create({message: 'El archivo no es PDF', color: 'red', type: 'negative'})
}
async function hideFolderInfo(reloadConten?: boolean) {
    showFolderInfoSection.value = false
    reloadConten && await store.dispatch('get_folder_content')
    selectedFolder.value = undefined
}
function holdDocumentDocused(doc: Document) {
    console.log(doc)
    documentFocused.value =doc
}
provide('hide-folder-info-section', hideFolderInfo)
store.dispatch('get_folder_content')
</script>

<style scoped lang="scss">
@import "Styles/SplitterViewContentStyles";
</style>
