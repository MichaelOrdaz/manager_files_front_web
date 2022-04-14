<template>
  <div class="users-list">
    <PText variant="text-4">
      Usuarios con acceso a carpeta
    </PText>
    <div class="chip-list">
      <PChip
        chipText="Hola"
        v-for="number in 2"
        :key="number"
      />
    </div>
    <div class="flex justify-between">
      <PLinkText>Ves más...</PLinkText>
      <PLinkText>Gestionar permisos</PLinkText>
    </div>
  </div>
</template>

<script>
export default {
    name: 'UsersList',
    components: {}

}
</script>

<style scoped lang="scss">
.users-list{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 12px;
    border-bottom: solid 1px $gray-4;
    .chip-list{
        margin-top: 6px;
        margin-bottom: 10px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }
    .flex{
        width: 100%;
    }
}
div :deep(.pchip-container){ width: 117px; margin-right: 8px; margin-top: 4px }
</style>
