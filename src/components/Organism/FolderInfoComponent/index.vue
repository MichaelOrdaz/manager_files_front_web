<template>
  <div class="component-container">
    <ComponentHeader :docData="documentData" />
    <UsersList :docData="documentData" />
    <FolderDetails
      v-if="store.getters.isFolder"
      :docData="documentData"
    />
    <FileDetails
      v-else
      :docData="documentData"
    />
    <UsersActivityList :history="documentData?.historical" />
  </div>
</template>

<script setup lang="ts">
import ComponentHeader from '@/components/Organism/FolderInfoComponent/ComponentHeader.vue'
import UsersList from './UsersList.vue'
import FolderDetails from './FolderDetails.vue'
import FileDetails from './FileDetails.vue'
import UsersActivityList from './UsersActivityList.vue'
import store from '@/store'
import {watch} from 'vue'
import {useGetDocumentData} from '@/Composables/useDocumentsClientMethods'
const {getDocData,documentData} = useGetDocumentData(store.getters.getCurrentFolder.id)
watch(() => store.getters.getCurrentFolder, () => {
    getDocData(store.getters.getCurrentFolder.id)
})
</script>


<style scoped lang="scss">
.component-container{
    background-color: white;
    width: 300px;
    border: solid 2px $grey-6;
}
</style>
