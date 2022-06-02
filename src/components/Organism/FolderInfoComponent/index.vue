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
    <UsersActivityList
      v-if="store.getters.getAnalystHasAllPermission"
      :history="documentData?.historical"
    />
  </div>
</template>

<script setup lang="ts">
import ComponentHeader from '@/components/Organism/FolderInfoComponent/ComponentHeader.vue'
import UsersList from './UsersList.vue'
import FolderDetails from './FolderDetails.vue'
import FileDetails from './FileDetails.vue'
import UsersActivityList from './UsersActivityList.vue'
import store from '@/store'
import {defineProps, ref, watch} from 'vue'
import {useGetDocumentData} from '@/Composables/useDocumentsClientMethods'
import {useGetDocumentSharedWithMe} from '@/Composables/useShareDocsClientMethods'

const props = withDefaults(defineProps<{ isGetSharedDocument?: boolean }>(), {isGetSharedDocument: false})

const componentRef = ref<{action: () => void} | null>(null)
const {getDocData,documentData} = useGetDocumentData(store.getters.getSelectedItem.id)
const {documentSharedData, getDocumentSharedWithMe} = useGetDocumentSharedWithMe(store.getters.getSelectedItem.id)

watch(() => store.getters.getSelectedItem?.id, () => {
    if (store.getters.getSelectedItem && props.isGetSharedDocument) {
        getDocumentSharedWithMe(store.getters.getSelectedItem?.id)
    } else if (store.getters.getSelectedItem && !props.isGetSharedDocument) {
        getDocData(store.getters.getSelectedItem?.id)
    }
})
watch(documentData, () => {
    store.commit('SET_SELECTED_ITEM', documentData.value)
})
watch(documentSharedData, () => { documentData.value = documentSharedData.value })
</script>


<style scoped lang="scss">
.component-container{
    background-color: white;
    width: 300px;
    border: solid 2px $gray-1;
}
</style>
