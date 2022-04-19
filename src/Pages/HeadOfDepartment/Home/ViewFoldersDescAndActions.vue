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
      <PButton
        leftIcon="create_new_folder"
        variant="white"
        iconColor="link"
      >
        Nueva carpeta
      </PButton>
      <PButton
        leftIcon="file_upload"
        variant="white"
        iconColor="gold"
      >
        Subir archivos
      </PButton>
    </div>
  </div>
</template>
<script>

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
        width: 28%;
        display: flex;
        justify-content: space-between;
        margin-right: 70px;
    }
}
div :deep(.white) {
    border: none;
}
</style>
