<template>
  <div class="files-breadcrumb p-pl-42">
    <q-breadcrumbs
      class="text-black"
      active-color="purple"
    >
      <template #separator>
        <PIcon
          size="pmd"
          iconName="chevron_right"
          color="grey-1"
        />
      </template>
      <q-breadcrumbs-el
        v-for="document in breadCrumbElements"
        :key="document.id"
        class="cursor-pointer"
        :label="document.name"
        @click="changeFolder(document)"
      />
    </q-breadcrumbs>
  </div>
</template>
<script setup lang="ts">
import {Document} from '@/Types/Document'
import {ref} from 'vue'

interface Props{
    actualFolder?: Document,
    triggerFolderChange?: boolean
}
const emit = defineEmits(['change-folder'])
const props = withDefaults(defineProps<Props>(), {actualFolder: undefined, clickCounter: false})
const breadCrumbElements = ref<Document[]>([{id:0,name: 'Inicio', createdAt: '', type: {name: 'Archivo', id: 1}, date: '', location: '',}])

function changeFolder(doc: Document) {
    emit('change-folder', doc)
    const folderIndex = breadCrumbElements.value.findIndex(el => el.id === doc.id)
    if (folderIndex === 0 ){
        breadCrumbElements.value = [{id:0,name: 'Inicio', createdAt: '', type: {name: 'Archivo', id: 1}, date: '', location: '',}]
        return
    }
    if (folderIndex > 0) {
        breadCrumbElements.value.splice(folderIndex + 1, breadCrumbElements.value.length)
        return
    }
}

function addElementToBreadcrumb() {
    if (props.actualFolder) {
        breadCrumbElements.value.push(props.actualFolder)
    }
}
defineExpose({addElementToBreadcrumb})
</script>
<style scoped lang="scss">
.p-pl-42 {
    padding-left: 42px
}
</style>
