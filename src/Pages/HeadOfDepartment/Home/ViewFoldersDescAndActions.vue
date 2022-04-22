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
        iconName="create_new_folder"
        iconColor="link"
        text="Nueva carpeta"
      />
      <PTextIcon
        iconName="file_upload"
        iconColor="gold"
        text="Subir archivo"
        @click="showLoadFileModal = true"
      />
    </div>
    <LoadPdfFileModal
      v-if="showLoadFileModal"
      @cancel="showLoadFileModal = false"
    />
  </div>
</template>
<script setup lang="ts">
import PTextIcon from '@/components/Atoms/PTextIcon.vue'
import LoadPdfFileModal from '@/components/Organism/LoadPdfFileModal/LoadPdfFileModal.vue'
import {ref} from 'vue'

const showLoadFileModal = ref<boolean>(true)
</script>
<style scoped lang="scss">
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
