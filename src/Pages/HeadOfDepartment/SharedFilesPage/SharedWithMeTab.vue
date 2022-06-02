<template>
  <div class="shared-files-container">
    <div class="section-head">
      <ViewBreadcumb @change-folder="changeFolder" />
      <div class="filter-btn">
        <!--        TODO: 2f79yuc-->
        <PDropdown
          v-if="false"
          :options="options"
          text="Filtro"
        />
      </div>
    </div>
    <ColumnsDescription />
    <div class="shared-files-body">
      <div class="full-width">
        <ItemRow
          v-for="document in documents"
          :key="document.id"
          :first-text="document.name"
          second-text="Editar"
          :third-text="document.creator.name"
          :options-list="rowOptionsAdmin"
          thirdText=" "
          :fourth-text="Dayjs(document.date).format('YYYY-MM-DD')"
          :image="document.type.name === 'Carpeta' ? DirectorySvg : PdfSvg"
          class="cursor-pointer item-row"
          :is-selected="selectedFolder?.id === document.id"
          @click="showFolderInfo(document)"
        />
      </div>
      <FolderInfo
        v-if="showFolderInfoSection && selectedFolder"
        class="folder-info"
        is-get-shared-document
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemRow from '@/components/Organism/DirFileRowComponent.vue'
import PDropdown, {DropdownOption} from '@/components/Molecules/PDropdown.vue'
import FolderInfo from '@/components/Organism/FolderInfoComponent/index.vue'
import DirectorySvg from '@/assets/folder3.png'
import PdfSvg from '@/assets/pdficon.png'
import ViewBreadcumb from '@/Pages/HeadOfDepartment/Home/ViewBreadcrumb.vue'
import {provide, ref} from 'vue'
import Dayjs from 'dayjs'
import ColumnsDescription from '@/Pages/HeadOfDepartment/SharedFilesPage/ColumnsDescription.vue'
import store from '@/store'
import {Document} from '@/Types/Document'
import {useGetDocumentsSharedWithMe} from '@/Composables/useShareDocsClientMethods'
import {Option} from '@/components/Molecules/POptionList.vue'

const options = ref<DropdownOption[]>([{label: 'Prueba', action: () => []}])
const showFolderInfoSection = ref<boolean>(false)
const selectedFolder = ref<Document | undefined>(undefined)
const timer = ref(null)
const clicksCount = ref<number>(0)
const { documents, getDocumentsSharedWithMe } = useGetDocumentsSharedWithMe(undefined, undefined)
const rowOptionsAdmin = ref<Option[]>([
    {optionLabel: 'Restaurar permisos', icon: 'settings_backup_restore', action: () => []},
    {optionLabel: 'Compartir', icon: 'person_add', action: () => []}
])

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
provide('hide-folder-info-section', hideFolderInfo)
defineExpose({hideFolderInfo})
</script>

<style scoped lang="scss">
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
