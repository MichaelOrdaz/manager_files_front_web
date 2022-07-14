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
        appendIconName="tune"
        enableCursorPointerOnIcon
        @append-icon-action="showAdvancedSearch = true"
      />
      <PButton
        v-if="false"
        class="p-mt-4"
      >
        Buscar
      </PButton>
      <AdvancedSearch
        v-if="showAdvancedSearch"
        class="search"
        itemref="advancedSearchRef"
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
    @dragenter.prevent.stop
    @dragleave.prevent.stop
    @dragover.prevent.stop
    @drop.prevent.stop="takeDragFile($event)"
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
    @dragenter.prevent.stop
    @dragleave.prevent.stop
    @dragover.prevent.stop
    @drop.prevent.stop="takeDragFile($event)"
  >
    <div class="items-col">
      <DirFileRowComponent
        v-for="(document, index) in list"
        :key="index"
        class="cursor-pointer item-row"
        :firstText="document.name"
        :secondText="document.creator.email"
        :thirdText="Dayjs(document.createdAt).format('YYYY-MM-DD')"
        :image="document.type.name === 'Carpeta' ? DirectorySvg : PdfSvg"
        data-cy="document-item-row"
        :is-selected="selectedFolder?.id === document.id"
        :optionsList="rowOptionsByPermission"
        @mouseover="holdDocumentDocused(document)"
        @click="showFolderInfo(document)"
      />
      <PButton
        v-if="store.getters.getFolderContent.length !== store.getters.getFolderTotal"
        class="load-mora-content-btn"
        variant="flat"
        size="pxlg"
        @click="loadMoreContent"
      >
        Ver más...
      </PButton>
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
    <PModal
      v-if="showEditFolderNameModal"
      :modalTitle="`Cambiar el nombre ${store.getters.isFolder ? 'de la carpeta' : 'del archivo'}`"
      @cancel="showEditFolderNameModal = false"
      @accept="useEditItemNameFromOptionList(documentFocused,newItemName,() => {showEditFolderNameModal = false;store.dispatch('get_folder_content');})"
    >
      <template #body>
        <PInput
          v-model="newItemName"
          width="100%"
          placeHolder="Nuevo nombre"
          data-cy="new-name-input"
          :rules="[(val: string) => !!val.trim() || 'Agrega un nombre valido']"
        />
      </template>
    </PModal>
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
import PdfSvg from '@/assets/pdficon.png'
import type {Document} from '@/Types/Document'
import FolderInfo from '@/components/Organism/FolderInfoComponent/index.vue'
import Dayjs from 'dayjs'
import store from '@/store/index'
import {Notify} from 'quasar'
import {Option} from '@/components/Molecules/POptionList.vue'
import ShareDocsModalIndex from '@/components/Organism/ShareDocsModal/index.vue'
import {useSaveUsersDocumentPermissionShare} from '@/Composables/useShareDocumentClientMethods'
import {useDeleteItemFromOptionList, useEditItemNameFromOptionList} from '@/Composables/useItemOptionListActions'
import {DocumentsApi} from '@/services/api/api'

const searchValue = ref<string>('')
const showAdvancedSearch = ref<boolean>(false)
const showFolderInfoSection = ref<boolean>(false)
const selectedFolder = ref<Document | undefined>(undefined)
const timer = ref(null)
const clicksCount = ref<number>(0)
const showEditFolderNameModal = ref<boolean>(false)
const newItemName = ref<string>('')
const rowOptionsAdmin = ref<Option[]>([
    {optionLabel: 'Restaurar permisos', icon: 'settings_backup_restore', action: () => { resetUsersPermissionsToItem() }},
    {optionLabel: 'Compartir', icon: 'person_add', action: () => {showShareModal.value = true}},
    {optionLabel: 'Cambiar nombre', icon: 'edit', action: () => { showEditFolderNameModal.value = true }},
    {optionLabel: 'Descargar', icon: 'download', action: () => {window.open(documentFocused.value.url)}},
    {optionLabel: 'Quitar', icon: 'delete', action: (val) => {useDeleteItemFromOptionList(documentFocused.value.id, () => {
        store.dispatch('get_folder_content')
        !!val && val()
    })}},
])
const documentFocused = ref<Document | undefined>(undefined)
const showShareModal = ref<boolean>(false)
// eslint-disable-next-line no-unused-vars
const FoldersDescAndActionsRef = ref<{component: typeof ViewFoldersDescAndActions, takeDropFile: (file: File) => void } | null>(null)
const currentPageIndex = ref<number>(1)

const list = computed<Document[]>(() => store.getters.getFolderContent.filter(doc => doc.name?.toLowerCase().match(searchValue.value.toLowerCase())))
function showFolderInfo(doc: Document) {
    clicksCount.value++
    showFolderInfoSection.value = false
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
        clicksCount.value = 0
    }
}

function changeFolder() {
    store.dispatch('get_folder_content')
}
function takeDragFile(event: DragEvent) {
    if (!store.getters.getAnalystHasAllPermission){
        Notify.create({message: 'No tienes permiso para subir archivos', color: 'red', type: 'negative', position: 'top-right'})
        return
    }
    if (event.dataTransfer?.files[0]?.type === 'application/pdf'){
        FoldersDescAndActionsRef.value.takeDropFile(event.dataTransfer?.files[0])
        return
    }
    Notify.create({message: 'El archivo no es PDF', color: 'red', type: 'negative', position: 'top-right'})
}
async function hideFolderInfo(reloadConten?: boolean) {
    showFolderInfoSection.value = false
    reloadConten && await store.dispatch('get_folder_content')
    selectedFolder.value = undefined
    currentPageIndex.value = 1
}
function holdDocumentDocused(doc: Document) {
    documentFocused.value = doc
}

async function resetUsersPermissionsToItem() {
    try {
        Notify.create({message: 'Los permisos se han restaurado', color: 'blue', type: 'positive', position: 'top-right'})
        await useSaveUsersDocumentPermissionShare(documentFocused.value.id, [])
    } catch (e) {
        Notify.create({message: 'Ha ocurrido un error, intentalo de nuevo', color: 'red', type: 'negative', position: 'top-right'})
    }
}

async function loadMoreContent() {
    if (store.getters.getFolderContent.length === store.getters.getFolderTotal) return
    currentPageIndex.value += 1
    const resp = await new DocumentsApi().getDocuments(store.getters.getCurrentFolder ? store.getters.getCurrentFolder.id : undefined, undefined,undefined,undefined,undefined, undefined, undefined, undefined, currentPageIndex.value)
    store.commit('ADD_TO_FOLDER_CONTENT', resp.data.data)
}
const rowOptionsByPermission = computed<Option[]>( () => {
    if (store.getters.getAnalystHasAllPermission) {
        return rowOptionsAdmin.value
    }
    return [{optionLabel: 'Abrir', action: () => { window.open(documentFocused.value.url)}, icon: ''}]
})
provide('hide-folder-info-section', hideFolderInfo)
store.dispatch('get_folder_content')
</script>

<style scoped lang="scss">
@import "Styles/SplitterViewContentStyles";
</style>
