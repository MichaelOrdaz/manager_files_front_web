<template>
  <div class="header-container">
    <div class="filter-input">
      <PInput
        v-model="searchValue"
        class="q-mr-sm"
        appendIconName="tune"
        prependIconName="search"
        placeHolder="Buscar"
        width="758px"
        enableCursorPointerOnIcon
        @append-icon-action="showAdvancedSearch = true"
      />
      <PButton class="p-mt-4">
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
    <ViewBreadcumb />
    <ViewFoldersDescAndActions />
  </div>
  <div
    v-if="!documentsList.length"
    class="no-data p-mt-122"
  >
    <img
      :src="NoDataSvg"
      alt="No data"
    >
  </div>
  <div
    v-else
    class="section"
  >
    <div class="items-col">
      <DirFileRowComponent
        v-for="(document, index) in filterList"
        :key="index"
        class="cursor-pointer"
        :firstText="document.name"
        :secondText="document.createdAt"
        :thirdText="Dayjs(document.date).format('YYYY-MM-DD')"
        :image="document.type.name === 'Carpeta' ? DirectorySvg : FileImg"
        @click="showFolderInfo(document)"
      />
    </div>
    <FolderInfo
      v-if="showFolderInfoSection && selectedFolder"
      class="folder-info"
    />
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import ViewBreadcumb from '@/Pages/HeadOfDepartment/Home/ViewBreadcrumb.vue'
import ViewFoldersDescAndActions from '@/Pages/HeadOfDepartment/Home/ViewFoldersDescAndActions.vue'
import AdvancedSearch from './AdvancedSearch.vue'
import NoDataSvg from '@/assets/uploadfiles.svg'
import DirFileRowComponent from '@/components/Organism/DirFileRowComponent.vue'
import {useGetDocumentsList} from '@/Composables/useDocumentsClientMethods'
import DirectorySvg from '@/assets/directory-img.svg'
import FileImg from '@/assets/pdfimg.png'
import type {Document} from '@/Types/Document'
import FolderInfo from '@/components/Organism/FolderInfoComponent/index.vue'
import Dayjs from 'dayjs'

const searchValue = ref<string>('')
const showAdvancedSearch = ref<boolean>(false)
const showFolderInfoSection = ref<boolean>(false)
const selectedFolder = ref<Document | undefined>(undefined)
const {documentsList} = useGetDocumentsList(undefined)

const filterList = computed<Document[]>(() => documentsList.value.filter(doc => doc.name.toLowerCase().match(searchValue.value.toLowerCase())))

function showFolderInfo(doc: Document) {
    if (doc.type.name === 'Carpeta') {
        selectedFolder.value = doc
        showFolderInfoSection.value = true
    }
}
</script>

<style scoped lang="scss">
@import "Styles/SplitterViewContentStyles";
</style>
