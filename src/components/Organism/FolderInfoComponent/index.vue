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
import { useGetDocumentData } from '@/Composables/useDocumentsClientMethods'
import {watch} from 'vue'

interface Props{
    id?: number
}

const props =  withDefaults(defineProps<Props>(),{id: undefined})
const { documentData, getDocData } = useGetDocumentData(props.id)

watch(() =>  props.id, () => {
    getDocData(props.id)
    console.log(documentData.value)
})
</script>


<style scoped lang="scss">
.component-container{
    background-color: white;
    width: 300px;
    border: solid 2px $grey-6;
}
</style>
