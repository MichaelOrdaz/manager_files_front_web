<template>
  <div class="dir-data-container">
    <PText
      variant="text-3"
      class="p-mb-16"
    >
      Propietario
    </PText>
    <div>
      <div>
        <PText
          variant="text-5"
          class="p-mb-16"
        >
          Etiquetas
        </PText>
        <PIcon
          class="p-ml-4 cursor-pointer"
          size="psm"
          iconName="edit"
        />
      </div>
      <PChip
        iconColor="white"
        textColor="white"
        chipType="secondary"
      />
    </div>
    <PText
      variant="text-5"
      class="p-mb-16"
    >
      Creado
    </PText>
    <PText
      variant="text-5"
      class="p-mb-16"
    >
      Ubicación
    </PText>
    <PText
      variant="text-5"
      class="p-mb-16"
    >
      Informacion de carpeta
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

<script>
export default {
    name: 'DirData'
}
</script>

<style scoped lang="scss">
.dir-data-container{
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: solid 1px $gray-4;
}
.p-mb-16{margin-bottom: 16px}
.p-mt-47{margin-top: 47px}
.p-ml-4{margin-left: 4px}
div :deep(.text-3){font-weight: bold}
div :deep(.text-5){color: $grey-7}
div :deep(.pchip-container){width: 117px}
</style>
