<template>
  <div class="column-description-texts">
    <PText
      variant="text-1"
      class="text"
    >
      Nombre de archivo
    </PText>
    <PText
      variant="text-1"
      class="text"
    >
      Permiso
    </PText>
    <PText
      variant="text-1"
      class="text"
    >
      Creado por
    </PText>
    <PText
      variant="text-1"
      class="text"
    >
      Compartido el
    </PText>
  </div>
</template>
<script>
export default {
    name: 'ColumnsDescription',
}
</script>

<style scoped lang="scss">
.column-description-texts{
    width: 80%;
    display: flex;
    justify-content: space-between;
    padding: 0 80px;
    .text{
        font-weight: 300;
    }
}
</style>
