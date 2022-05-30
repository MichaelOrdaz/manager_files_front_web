<template>
  <div class="folders-actions">
    <div class="description-texts">
      <PText
        variant="text-4"
        class="p-pt-5"
      >
        Nombre de carpeta
      </PText>
      <PText
        variant="text-4"
        class="p-pt-5"
      >
        Creado por
      </PText>
      <PText
        variant="text-4"
        class="p-pt-5"
      >
        Subido el
      </PText>
    </div>
    <div class="action-buttons">
      <PTextIcon
        v-if="store.getters.getAnalystHasAllPermission"
        iconName="create_new_folder"
        iconColor="link"
        text="Nueva carpeta"
        @click="showCreateFolderModal = true"
      />
      <PTextIcon
        v-if="store.getters.getAnalystHasAllPermission"
        iconName="file_upload"
        iconColor="gold"
        text="Subir archivo"
        @click="loadUserImg"
      />
    </div>
    <LoadPdfFileModal
      v-if="showLoadFileModal"
      :newFile="newFile"
      :actualFolderId="props.selectedFolderId"
      @cancel="showLoadFileModal = false"
    />
    <PModal
      v-if="showCreateFolderModal"
      modalTitle="Crear nueva carpeta"
      @cancel="showCreateFolderModal = false"
      @accept="createNewFolder"
    >
      <template #body>
        <PInput
          v-model="newFolderName"
          width="100%"
          :rules="[(value: string) => !!value.trim() || 'Agrega un nombre valido']"
          data-cy="new-folder-name"
        />
      </template>
    </PModal>
  </div>
</template>
<script setup lang="ts">
import PTextIcon from '@/components/Atoms/PTextIcon.vue'
import LoadPdfFileModal from '@/components/Organism/LoadPdfFileModal/LoadPdfFileModal.vue'
import PModal from '@/components/Molecules/PModal.vue'
import {ref} from 'vue'
import {useCreateFolder} from '@/Composables/useDocumentsClientMethods'
import {Notify} from 'quasar'
import store from '@/store'

const emit = defineEmits<{
    // eslint-disable-next-line no-unused-vars
    (e: 'update-list'): void,
}>()
interface Props { selectedFolderId?: number }
const props = withDefaults(defineProps<Props>(), {selectedFolderId: undefined})
const showLoadFileModal = ref<boolean>(false)
const showCreateFolderModal = ref<boolean>(false)
const newFolderName = ref<string>('')
const newFile = ref<string | File>('')
async function createNewFolder() {
    if (!newFolderName.value) {
        Notify.create({message: 'Agrega un nombre de carpeta valido', color: 'red', type: 'negative'})
        return
    }
    try {
        await useCreateFolder(newFolderName.value, store.getters?.getCurrentFolder ? store.getters?.getCurrentFolder?.id : undefined)
        Notify.create({message: 'Se ha creaco la carpeta', color: 'green', type: 'positive'})
        showCreateFolderModal.value = false
        emit('update-list')
    }catch (e) {
        Notify.create({message: 'Se ha generado un error', color: 'red', type: 'negative'})
    }
}

function loadUserImg() {
    const fileInput: HTMLInputElement = document.createElement('input')
    const parent = document.querySelector('.p-pt-5')
    fileInput.type = 'file'
    fileInput.style.display = 'none'
    fileInput.accept = 'application/pdf'
    fileInput.dataset.cy = 'file-loader'
    fileInput.click()
    parent.appendChild(fileInput)
    fileInput.onchange = () => {
        newFile.value = fileInput.files?.item(0)
        showLoadFileModal.value = true
    }
}
function takeDropFile(file: File) {
    newFile.value = file
    showLoadFileModal.value = true
}
defineExpose({takeDropFile})
</script>
<style scoped lang="scss">
div :deep(.modal-container){text-align: start}
.p-pt-5{padding-top: 5px}
.folders-actions{
    padding-left: 42px;
    display: flex;
    margin-top: 19px;
    justify-content: space-between;
    border-bottom: solid 1px $grey-4;
    .description-texts{
        width: 50%;
        display: flex;
        justify-content: space-between;
        text-align: center;
    }
    .action-buttons{
        width: 25%;
        display: flex;
        justify-content: space-between;
        margin-right: 70px;
    }
}
</style>
