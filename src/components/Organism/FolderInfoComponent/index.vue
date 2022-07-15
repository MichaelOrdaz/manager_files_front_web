<template>
  <div
    ref="componentRef"
    class="component-container"
  >
    <ComponentHeader :docData="documentData" />
    <UsersList
      v-if="store.getters.getAnalystHasAllPermission && !!store.getters.getFolderPermission"
      :docData="documentData"
    />
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
import {defineProps, ref} from 'vue'
import {DocumentsApi, ShareDocumentApi} from '@/services/api/api'
import {Document} from '@/Types/Document'

const props = withDefaults(defineProps<{ isGetSharedDocument?: boolean }>(), {isGetSharedDocument: false})

const componentRef = ref<{action: () => void} | null>(null)
const documentData = ref<Document | null>()

async function getData() {
    if (props.isGetSharedDocument) {
        const resp = await new ShareDocumentApi().getDocumentForMe(store.getters.getSelectedItem.id)
        documentData.value = resp.data.data
        store.commit('SET_SELECTED_ITEM', documentData.value)
        return
    }
    const resp = await new DocumentsApi().getDocument(store.getters.getSelectedItem.id)
    documentData.value = resp.data.data
    store.commit('SET_SELECTED_ITEM', documentData.value)
}
getData()
</script>


<style scoped lang="scss">
.component-container{
    background-color: white;
    width: 300px;
    border: solid 2px $gray-1;
}
</style>
