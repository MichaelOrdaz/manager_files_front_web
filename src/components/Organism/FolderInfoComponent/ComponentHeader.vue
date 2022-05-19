<template>
  <div class="header">
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
        class="cursor-pointer"
        color="black"
        iconName="edit"
        size="pmd"
        @click="showEditFolderNameModal = true"
      />
    </div>
    <div
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
    modalTitle="Cambiar el nombre de la carpeta"
    @cancel="showEditFolderNameModal = false"
    @accept="editItemName"
  >
    <template #body>
      <PInput
        v-model="newFolderName"
        width="100%"
        placeHolder="Nuevo nombre"
      />
    </template>
  </PModal>
  <PModal
    v-if="showDeleteFolderModal"
    modalTitle="¿Está seguro que quiere eliminar la carpeta?"
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

const hideFolderInfoSection = inject<() => void>('hide-folder-info-section')
const showEditFolderNameModal = ref<boolean>(false)
const showDeleteFolderModal = ref<boolean>(false)
const newFolderName = ref<string>('')

async function deleteFolder() {
    try {
        await useDeleteFolder(props.docData.id)
        hideFolderInfoSection()
        showDeleteFolderModal.value = false
        Notify.create({message: 'Se ha eliminado la carpeta', color: 'blue'})
    } catch (e) {
        Notify.create({message: 'Ha ocurrido un error, intentalo de nuevo', color: 'red'})
    }
}

async function editItemName() {
    try {
        await useEditItemName(store.getters.getSelectedItem, newFolderName.value)
        hideFolderInfoSection()
        showEditFolderNameModal.value = false
        Notify.create({message: 'El nombre ha sido editado', color: 'blue'})
    } catch (e) {
        Notify.create({message: 'Ha ocurrido un error', color: 'red'})
    }
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
    .delete-option{ margin-top: 12px }
    border-bottom: solid 1px $gray-4;
}
div :deep(.title) {
    width: 100%;
    text-align: start;
    margin-bottom: 12px;
}
</style>
