<template>
  <div class="dir-data-container">
    <PText
      variant="text-3"
      class="p-mb-16"
    >
      Información de carpeta
    </PText>
    <PText
      variant="text-5"
      class="p-mb-16"
    >
      Creado por: {{ props.docData?.creator?.name }}
    </PText>
    <PText
      variant="text-5"
      class="p-mb-16"
    >
      Rango de folio: {{ props.docData?.identifier ?? 'Sin folio' }}
    </PText>
    <PText
      variant="text-5"
      class="p-mb-16"
    >
      Fecha de creación: {{ formatDate(props?.docData?.createdAt) ?? 'Sin fecha' }}
    </PText>
    <PText
      variant="text-5"
      class="p-mb-16"
    >
      Fecha de subida: {{ formatDate(props?.docData?.createdAt) ?? 'Sin fecha' }}
    </PText>
    <PText
      variant="text-5"
      class="p-mb-16"
    >
      Ubicación: {{ props.docData?.location ?? 'Sin ubicación' }}
    </PText>
    <div class="cursor-pointer p-mt-47 p-mb-16">
      <PIcon
        size="psm"
        color="link"
        iconName="download"
      />
      <PLinkText>Descargar</PLinkText>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Document} from '@/Types/Document'
import formatDate from '@/utils/FormatDate'

interface Props { docData: Document }
const props = defineProps<Props>()

</script>

<style scoped lang="scss">
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
