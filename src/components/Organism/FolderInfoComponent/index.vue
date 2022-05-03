<template>
  <div class="component-container">
    <ComponentHeader />
    <UsersList />
    <DirData />
    <UsersActivityList />
  </div>
</template>

<script setup lang="ts">
import ComponentHeader from '@/components/Organism/FolderInfoComponent/ComponentHeader.vue'
import UsersList from './UsersList.vue'
import DirData from './DirData.vue'
import UsersActivityList from './UsersActivityList.vue'
</script>


<style scoped lang="scss">
.component-container{
    background-color: white;
    width: 300px;
    border: solid 2px $grey-6;
}
</style>
