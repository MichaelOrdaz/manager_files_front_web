<template>
  <div class="shared-files-container">
    <div class="section-head">
      <ViewBreadcumb @change-folder="changeFolder" />
      <div class="filter-btn">
        <PDropdown
          :options="dropdownOptions"
          :text="selectedDepartmentName"
        />
      </div>
    </div>
    <ColumnsDescription />
    <div class="shared-files-body">
      <div class="full-width">
        <ItemRow
          v-for="document in documents.sort(a => a.type.name ==='Carpeta' ? -1 : 1)"
          :key="document.id"
          :first-text="document.name"
          second-text="Editar"
          :third-text="document.creator.name"
          :options-list="setDocOptions(document)"
          thirdText=" "
          :fourth-text="Dayjs(document.date).format('YYYY-MM-DD')"
          :image="document.type.name === 'Carpeta' ? DirectorySvg : PdfSvg"
          class="cursor-pointer item-row"
          :is-selected="selectedFolder?.id === document.id"
          @mouseover="documentFocused = document"
          @click="showFolderInfo(document)"
        />
      </div>
      <FolderInfo
        v-if="showFolderInfoSection && selectedFolder"
        class="folder-info"
        is-get-shared-document
      />
    </div>
    <ModalMask
      v-if="showFile"
      @click="showFile = false"
    >
      <object
        :data="`${documentFocused.url}#toolbar=0`"
        type="aplicattion/pdf"
      />
      <h1>{{ documentFocused.url }}</h1>
    </ModalMask>
  </div>
</template>

<script setup lang="ts">
import ItemRow from '@/components/Organism/DirFileRowComponent.vue'
import PDropdown, {DropdownOption} from '@/components/Molecules/PDropdown.vue'
import FolderInfo from '@/components/Organism/FolderInfoComponent/index.vue'
import DirectorySvg from '@/assets/folder3.png'
import PdfSvg from '@/assets/pdficon.png'
import ViewBreadcumb from '@/Pages/HeadOfDepartment/Home/ViewBreadcrumb.vue'
import {computed, provide, ref} from 'vue'
import Dayjs from 'dayjs'
import ColumnsDescription from '@/Pages/HeadOfDepartment/SharedFilesPage/ColumnsDescription.vue'
import store from '@/store'
import {Document} from '@/Types/Document'
import {useGetDocumentsSharedWithMe} from '@/Composables/useShareDocsClientMethods'
import {Option} from '@/components/Molecules/POptionList.vue'
import ModalMask from '@/components/Atoms/ModalMask.vue'
import {getDepartmentsList} from '@/Composables/useGetDepartmentsList'

const showFolderInfoSection = ref<boolean>(false)
const selectedFolder = ref<Document | undefined>(undefined)
const timer = ref(null)
const clicksCount = ref<number>(0)
const { documents, getDocumentsSharedWithMe } = useGetDocumentsSharedWithMe(undefined, undefined)
const editOptions = ref<Option[]>([{optionLabel: 'Descargar', icon: 'file_download', action: () => [window.open(documentFocused.value.url)]}])
const lectureOptions = ref<Option[]>([{optionLabel: 'Abrir', icon: '', action: () => [showFile.value = true]}])
const documentFocused = ref<Document | undefined>(undefined)
const showFile = ref<boolean>(false)
const {departmentsList} = getDepartmentsList()
const selectedDepartmentName = ref<string>('Todos')

function showFolderInfo(doc: Document) {
    clicksCount.value++
    if (clicksCount.value === 1) {
        timer.value = setTimeout(() => {
            selectedFolder.value = doc
            store.commit('SET_SELECTED_ITEM', doc)
            store.commit('SET_AUTHORIZATION', doc.permission)
            clicksCount.value = 0
            showFolderInfoSection.value = true
        }, 250)
    }else {
        clearTimeout(timer.value)
        if (doc.type.name === 'Carpeta'){
            store.commit('SET_CURRENT_FOLDER',doc)
            store.commit('BUILD_BREADCRUMB', doc)
            getDocumentsSharedWithMe(doc.id, undefined)
            clicksCount.value = 0
        }
        clicksCount.value = 0
    }
}
async function hideFolderInfo(reloadConten?: boolean) {
    showFolderInfoSection.value = false
    reloadConten && await store.dispatch('get_folder_content')
    selectedFolder.value = undefined
    store.commit('RESET_SELECTED_ITEM')
}

async function changeFolder(doc: Document) {
    if (!doc.id){
        await getDocumentsSharedWithMe(undefined,undefined)
        return
    }
    await getDocumentsSharedWithMe(doc.id)
}
function setDocOptions(doc: Document) {
    if (doc.type.name === 'Carpeta') {
        return null
    }else if (doc.permission === 'Escritura') {
        return editOptions.value
    }else if (doc.permission === 'Lectura') {
        return lectureOptions.value
    }
}
const dropdownOptions = computed<DropdownOption[]>(() => {
    if (departmentsList.value.length) {
        return [{label: 'Todos', action: async() => {
            selectedDepartmentName.value = 'Todos'
            await getDocumentsSharedWithMe(store.getters.getCurrentFolder?.id ? store.getters.getCurrentFolder?.id : undefined, undefined)
        }, extraData: {id: undefined}} ,...departmentsList.value.map(department => ({
            label: department.name,
            action: async() => {
                selectedDepartmentName.value = department.name
                await getDocumentsSharedWithMe(store.getters.getCurrentFolder?.id ? store.getters.getCurrentFolder?.id : undefined, department.id)
            },
            extraData: {id: department.id}
        }))]
    }
    return []
})
provide('hide-folder-info-section', hideFolderInfo)
defineExpose({hideFolderInfo})
</script>

<style scoped lang="scss">
div :deep(.text){
    text-align: center;
    margin-left: 15px;
}
.item-row{
    margin: 6px 0;
    padding: 0 8px;
}
.shared-files-container{
    display: flex;
    flex-direction: column;
    width: 100%;
    .shared-files-body{
        display: flex;
        margin-top: 12px;
        .folder-info{ width: 350px; position: fixed; right: 25px; top: 75px }
    }
    .section-head{
        width: 100%;
        justify-content: space-between;
        align-items: center;
        display: flex;
        .filter-btn{
            text-align: left;
            width: 345px;
        }
    }
}
</style>
