<template>
  <div class="header">
    <PIcon
      class="close-icon cursor-pointer"
      iconName="close"
      size="pmd"
      data-cy="close-seccion"
      @click="closeSection"
    />
    <div class="folder-options">
      <PIcon
        :color="store.getters.isFolder ? 'black': 'red'"
        :iconName="store.getters.isFolder ?'folder': 'picture_as_pdf'"
      />
      <PText
        class="q-mx-md"
        variant="text-4"
      >
        {{ props.docData?.name ?? 'Sin nombre' }}
      </PText>
      <PIcon
        v-if="store.getters.getAnalystHasAllPermission"
        class="cursor-pointer"
        color="black"
        iconName="edit"
        size="pmd"
        data-cy="edit-name"
        @click="showEditFolderNameModal = true"
      />
    </div>
    <div
      v-if="store.getters.getAnalystHasAllPermission"
      class="delete-option cursor-pointer"
      @click="showDeleteFolderModal = true"
    >
      <PIcon
        iconName="delete"
        color="gray-7"
        size="psm"
      />
      <PText
        color="gray-7"
        variant="text-5"
      >
        {{ store.getters.isFolder ? 'Eliminar carpeta': 'Eliminar archivo' }}
      </PText>
    </div>
  </div>
  <PModal
    v-if="showEditFolderNameModal"
    :modalTitle="`Cambiar el nombre ${store.getters.isFolder ? 'de la carpeta' : 'del archivo'}`"
    @cancel="showEditFolderNameModal = false"
    @accept="editItemName"
  >
    <template #body>
      <PInput
        v-model="newFolderName"
        width="100%"
        placeHolder="Nuevo nombre"
        data-cy="new-name-input"
      />
    </template>
  </PModal>
  <PModal
    v-if="showDeleteFolderModal"
    class="text-center"
    :modalTitle="`¿Está seguro de eliminar ${store.getters.isFolder ? 'la carpeta?' : 'el archivo?'}`"
    @cancel="showDeleteFolderModal = false"
    @accept="deleteFolder"
  />
</template>
<script setup lang="ts">
import PModal from '@/components/Molecules/PModal.vue'
import {inject, ref} from 'vue'
import store from '@/store'
import type {Document} from '@/Types/Document'
import {useDeleteFolder, useEditItemName} from '@/Composables/useDocumentsClientMethods'
import {Notify} from 'quasar'

interface Props { docData: Document}
const props = defineProps<Props>()

// eslint-disable-next-line no-unused-vars
const hideFolderInfoSection = inject<(reloadContent?: boolean) => void>('hide-folder-info-section')
const showEditFolderNameModal = ref<boolean>(false)
const showDeleteFolderModal = ref<boolean>(false)
const newFolderName = ref<string>('')

async function deleteFolder() {
    try {
        await useDeleteFolder(props.docData.id)
        hideFolderInfoSection()
        showDeleteFolderModal.value = false
        Notify.create({message: 'Se ha eliminado la carpeta', color: 'blue', type: 'positive'})
        await store.dispatch('get_folder_content')
    } catch (e) {
        Notify.create({message: 'Ha ocurrido un error, intentalo de nuevo', color: 'red', type: 'negative'})
    }
}

async function editItemName() {
    try {
        await useEditItemName(store.getters.getSelectedItem, newFolderName.value)
        hideFolderInfoSection(true)
        showEditFolderNameModal.value = false
        Notify.create({message: 'El nombre ha sido editado', color: 'blue', type: 'positive'})
    } catch (e) {
        Notify.create({message: 'Ha ocurrido un error', color: 'red', type: 'negative'})
    }
}
function closeSection() {
    store.commit('RESET_CURRENT_FOLDER')
    hideFolderInfoSection()
}
</script>

<style scoped lang="scss">
.header{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: 12px;
    position: relative;
    .close-icon{
        position: absolute;
        top: 0;
        right: 0;
    }
    .delete-option{ margin-top: 12px }
    border-bottom: solid 1px $gray-4;
}
div :deep(.title) {
    width: 100%;
    text-align: start;
    margin-bottom: 12px;
}
</style>
