<template>
  <div class="shared-files-container">
    <div class="section-head">
      <ViewBreadcumb @change-folder="changeFolder" />
      <div class="filter-btn">
        <!--        TODO: 2f79yuc-->
        <PText variant="text-4">
          Selecciona el departamento
        </PText>
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
          v-for="document in documents"
          :key="document.id"
          :first-text="document.name"
          second-text="Editar"
          :third-text="document.creator.name"
          :options-list="rowOptionsByPermission"
          thirdText=" "
          :fourth-text="Dayjs(document.createdAt).format('YYYY-MM-DD')"
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
      />
      <ShareDocsModalIndex
        v-if="showShareModal"
        :selected-doc="documentFocused"
        @cancel="showShareModal = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemRow from '@/components/Organism/DirFileRowComponent.vue'
import PDropdown, {DropdownOption} from '@/components/Molecules/PDropdown.vue'
import FolderInfo from '@/components/Organism/FolderInfoComponent/index.vue'
import DirectorySvg from '@/assets/folder2.png'
import PdfSvg from '@/assets/pdficon.png'
import ViewBreadcumb from '@/Pages/HeadOfDepartment/Home/ViewBreadcrumb.vue'
import {computed, provide, ref} from 'vue'
import Dayjs from 'dayjs'
import ColumnsDescription from '@/Pages/HeadOfDepartment/SharedFilesPage/ColumnsDescription.vue'
import store from '@/store'
import {Document} from '@/Types/Document'
import {useGetDocumentsByMe} from '@/Composables/useShareDocsClientMethods'
import {Option} from '@/components/Molecules/POptionList.vue'
import ShareDocsModalIndex from '@/components/Organism/ShareDocsModal/index.vue'
import {Notify} from 'quasar'
import {useSaveUsersDocumentPermissionShare} from '@/Composables/useShareDocumentClientMethods'
import {getDepartmentsList} from '@/Composables/useGetDepartmentsList'

const showFolderInfoSection = ref<boolean>(false)
const selectedFolder = ref<Document | undefined>(undefined)
const selectedDepartmentName = ref<string>('Todos')
const showShareModal = ref<boolean>(false)
const documentFocused = ref<Document>()
const timer = ref(null)
const clicksCount = ref<number>(0)
const { documents, getDocumentsByMe } = useGetDocumentsByMe(undefined, undefined)
const rowOptionsAdmin = ref<Option[]>([
    {optionLabel: 'Restaurar permisos', icon: 'settings_backup_restore', action: () => [resetUsersPermissionsToItem()]},
    {optionLabel: 'Compartir', icon: 'person_add', action: () => [showShareModal.value = true]}
])
const {departmentsList} = getDepartmentsList()
function showFolderInfo(doc: Document) {
    showFolderInfoSection.value = false
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
        clicksCount.value = 0
    }
}
async function hideFolderInfo(reloadConten?: boolean) {
    showFolderInfoSection.value = false
    reloadConten && await store.dispatch('get_folder_content')
    selectedFolder.value = undefined
    store.commit('RESET_SELECTED_ITEM')
    await getDocumentsByMe(store.getters.getCurrentFolder?.id ? store.getters.getCurrentFolder?.id : undefined, undefined)
}
async function resetUsersPermissionsToItem() {
    try {
        Notify.create({message: 'Los permisos se han restaurado', color: 'blue', type: 'positive', position: 'top-right'})
        await useSaveUsersDocumentPermissionShare(documentFocused.value.id, [])
    } catch (e) {
        Notify.create({message: 'Ha ocurrido un error, intentalo de nuevo', color: 'red', type: 'negative', position: 'top-right'})
    }
}

async function changeFolder(doc: Document) {
    if (!doc.id){
        await getDocumentsByMe(undefined,undefined)
        return
    }
    await getDocumentsByMe(doc.id)
}

const rowOptionsByPermission = computed<Option[]>( () => {
    if (store.getters.getAnalystHasAllPermission) {
        return rowOptionsAdmin.value
    }
    return [{optionLabel: 'Abrir', action: () => { window.open(documentFocused.value.url)}, icon: ''}]
})

const dropdownOptions = computed<DropdownOption[]>(() => {
    if (departmentsList.value.length) {
        return [{label: 'Todos', action: async() => {
            selectedDepartmentName.value = 'Todos'
            await getDocumentsByMe(store.getters.getCurrentFolder?.id ? store.getters.getCurrentFolder?.id : undefined, undefined)
        }, extraData: {id: undefined}} ,...departmentsList.value.map(department => ({
            label: department.name,
            action: async() => {
                selectedDepartmentName.value = department.name
                await getDocumentsByMe(store.getters.getCurrentFolder?.id ? store.getters.getCurrentFolder?.id : undefined, department.id)
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
