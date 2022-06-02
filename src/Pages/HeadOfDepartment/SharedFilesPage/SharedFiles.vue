<template>
  <div class="shared-files-container">
    <div class="section-head">
      <PText variant="text-1">
        Archivos que he compartido con
      </PText>
      <div class="filter-btn">
        <PText variant="text-4">
          Selecciona el departamento
        </PText>
        <PDropdown
          :options="options"
          text="Hola a todos"
        />
      </div>
    </div>
    <ViewBreadcumb @change-folder="changeFolder" />
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
          :thirdText="Dayjs(document.date).format('YYYY-MM-DD')"
          :image="document.type.name === 'Carpeta' ? DirectorySvg : PdfSvg"
          class="cursor-pointer"
          @click="showFolderInfo(document)"
        />
      </div>
      <FolderInfo
        v-if="showFolderInfoSection && selectedFolder"
        class="folder-info"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemRow from '@/components/Organism/DirFileRowComponent.vue'
import PDropdown, {DropdownOption} from '@/components/Molecules/PDropdown.vue'
import FolderInfo from '@/components/Organism/FolderInfoComponent/index.vue'
import DirectorySvg from '@/assets/directory-img.svg'
import PdfSvg from '@/assets/pdficon.png'
import ViewBreadcumb from '@/Pages/HeadOfDepartment/Home/ViewBreadcrumb.vue'
import {provide, ref} from 'vue'
import Dayjs from 'dayjs'
import ColumnsDescription from '@/Pages/HeadOfDepartment/SharedFilesPage/ColumnsDescription.vue'
import store from '@/store'
import {Document} from '@/Types/Document'
import {useGetDocumentsByMe} from '@/Composables/useShareDocsClientMethods'
import {Option} from '@/components/Molecules/POptionList.vue'

const options = ref<DropdownOption[]>([{label: 'Prueba', action: () => []}])
const showFolderInfoSection = ref<boolean>(false)
const selectedFolder = ref<Document | undefined>(undefined)
const timer = ref(null)
const clicksCount = ref<number>(0)
const { documents, getDocumentsByMe } = useGetDocumentsByMe(undefined, undefined)
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
            clicksCount.value = 0
            showFolderInfoSection.value = true
        }, 250)
    }else {
        clearTimeout(timer.value)
        if (doc.type.name === 'Carpeta'){
            store.commit('SET_CURRENT_FOLDER',doc)
            store.commit('BUILD_BREADCRUMB', doc)
            getDocumentsByMe(doc.id, undefined)
            clicksCount.value = 0
        }
    }
}
async function hideFolderInfo(reloadConten?: boolean) {
    showFolderInfoSection.value = false
    reloadConten && await store.dispatch('get_folder_content')
    selectedFolder.value = undefined
}

async function changeFolder(doc: Document) {
    if (!doc.id){
        await getDocumentsByMe(undefined,undefined)
        return
    }
    await getDocumentsByMe(doc.id)
}
provide('hide-folder-info-section', hideFolderInfo)
</script>

<style scoped lang="scss">
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
