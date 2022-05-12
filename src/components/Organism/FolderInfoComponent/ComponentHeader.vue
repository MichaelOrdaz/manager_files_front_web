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
        Eliminar carpeta
      </PText>
    </div>
  </div>
  <PModal
    v-if="showEditFolderNameModal"
    modalTitle="Cambiar el nombre de la carpeta"
    @cancel="showEditFolderNameModal = false"
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
  />
</template>
<script setup lang="ts">
import PModal from '@/components/Molecules/PModal.vue'
import {ref} from 'vue'
import store from '@/store'
import type {Document} from '@/Types/Document'

interface Props { docData: Document}
const props = defineProps<Props>()
const showEditFolderNameModal = ref<boolean>(false)
const showDeleteFolderModal = ref<boolean>(false)
const newFolderName = ref<string>('')
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
