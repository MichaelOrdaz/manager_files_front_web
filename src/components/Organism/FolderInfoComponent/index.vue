<template>
  <div
    ref="componentRef"
    class="component-container"
  >
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
import {inject, ref, watch} from 'vue'
import {useGetDocumentData} from '@/Composables/useDocumentsClientMethods'
import useDetectOutsideClick from '@/utils/useDetectOutsideClick'
const hideSection = inject<() => void >('hide-folder-info-section')
const componentRef = ref<{action: () => void} | null>(null)
const {getDocData,documentData} = useGetDocumentData(store.getters.getSelectedItem.id)

useDetectOutsideClick(componentRef,() => {
    hideSection()
    store.commit('SET_SELECTED_ITEM', undefined)
})
watch(() => store.getters.getSelectedItem, () => {
    if (store.getters.getSelectedItem) {
        getDocData(store.getters.getSelectedItem.id)
    }
})
</script>


<style scoped lang="scss">
.component-container{
    background-color: white;
    width: 300px;
    border: solid 2px $grey-6;
}
</style>
