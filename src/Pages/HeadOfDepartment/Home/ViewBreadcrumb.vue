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
import {ref, watch} from 'vue'

interface Props{
    actualFolder?: Document
}
const emit = defineEmits(['change-folder'])
const props = withDefaults(defineProps<Props>(), {actualFolder: undefined})
const breadCrumbElements = ref<Document[]>([{id:0,name: 'Home', createdAt: '', type: {name: 'Archivo', id: 0}, date: '', location: '',}])

function changeFolder(doc: Document) {
    emit('change-folder', doc)
    const folderIndex = breadCrumbElements.value.findIndex(el => el.id === doc.id)
    console.log(folderIndex)
    if (folderIndex > 0) {
        breadCrumbElements.value.splice(folderIndex, breadCrumbElements.value.length)
        return
    }
}

watch(() => props.actualFolder, () => {
    breadCrumbElements.value.push(props.actualFolder)
}, {deep: true})
</script>
<style scoped lang="scss">
.p-pl-42 {
    padding-left: 42px
}
</style>
