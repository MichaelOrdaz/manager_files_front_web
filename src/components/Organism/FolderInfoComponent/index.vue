<template>
  <div class="component-container">
    <ComponentHeader />
    <UsersList />
  </div>
</template>

<script setup lang="ts">
import ComponentHeader from '@/components/Organism/FolderInfoComponent/ComponentHeader.vue'
import UsersList from './UsersList.vue'
</script>


<style scoped lang="scss">
.component-container{
    background-color: white;
    width: 300px;
}
</style>
