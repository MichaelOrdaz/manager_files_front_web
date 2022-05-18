<template>
  <div class="dir-data-container">
    <PText
      variant="text-3"
      class="p-mb-16"
    >
      Información de carpeta
    </PText>
    <div class="flex column justify-start items-start">
      <div class="flex justify-start items-start">
        <PText
          variant="text-5"
        >
          Etiquetas
        </PText>
        <PIcon
          class="p-ml-4 cursor-pointer"
          size="psm"
          iconName="edit"
          @click="showTagsModal = true"
        />
      </div>
      <div class="q-mb-sm q-mt-sm flex">
        <PChip
          v-for="(tag, index) in tags"
          :key="index"
          iconColor="white"
          textColor="white"
          chipType="secondary"
          :chipText="tag"
          class="chip"
          @icon-action="removeChip(index)"
        />
      </div>
    </div>
    <PText
      variant="text-5"
      class="p-mb-16"
    >
      Creado por: {{ props.docData?.creator?.name ?? 'Sin nombre' }}
    </PText>
    <PText
      variant="text-5"
      class="p-mb-16"
    >
      Ubicación: {{ props.docData?.location ?? 'Sin ubicación' }}
    </PText>
    <PText
      variant="text-5"
      class="p-mb-16"
    >
      Fecha de creación: {{ formatDate(props?.docData?.createdAt) ?? 'Sin fecha' }}
    </PText>
    <div class="cursor-pointer p-mt-47 p-mb-16">
      <PIcon
        size="psm"
        color="link"
        iconName="download"
      />
      <PLinkText>Descargar</PLinkText>
    </div>
    <Modal
      v-if="showTagsModal"
      :tags="tags"
      @update-tags-list="updateTagsList"
      @cancel="showTagsModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import Modal from './Modal.vue'
import type {Document} from '@/Types/Document'
import formatDate from '@/utils/FormatDate'

interface Props { docData: Document }
const props = defineProps<Props>()

const tags = ref<string[]>([])
const showTagsModal = ref<boolean>(false)

function removeChip(index:number): void {
    tags.value.splice(index, 1)
}
function updateTagsList(params: string[]): void {
    tags.value = params
    showTagsModal.value = false
}
watch(() => props.docData, () => {
    tags.value = props.docData.tags
}, {deep: true})
</script>

<style scoped lang="scss">
.truncate{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.dir-data-container{
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: solid 1px $gray-4;
}
.chip{margin-top: 4px; margin-right: 4px}
.p-mb-16{margin-bottom: 16px}
.p-mt-47{margin-top: 47px}
.p-ml-4{margin-left: 4px}
div :deep(.text-3){font-weight: bold}
div :deep(.text-5){color: $grey-7}
div :deep(.pchip-container){width: 117px}
</style>
