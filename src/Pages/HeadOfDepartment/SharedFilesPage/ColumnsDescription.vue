<template>
  <div class="column-description-texts">
    <PText
      variant="text-4"
      class="text"
    >
      Nombre de archivo
    </PText>
    <PText
      variant="text-4"
      class="text"
    >
      Permiso
    </PText>
    <PText
      variant="text-1"
      class="text"
    >
      {{ '' }}
    </PText>
    <PText
      variant="text-4"
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
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 24px;
    .text{
        font-weight: 300;
    }
}
</style>
