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
        v-for="document in breadcrumbData"
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
import {computed} from 'vue'
import store from '@/store/index'

interface Props{
    actualFolder?: Document,
    triggerFolderChange?: boolean
}
const emit = defineEmits(['change-folder'])
withDefaults(defineProps<Props>(), {actualFolder: undefined, clickCounter: false})
const breadcrumbData = computed<Document[]>(() => store.getters.getBreadcrumbStructure)
function changeFolder(doc: Document) {
    emit('change-folder', doc)
    store.commit('REBUILD_BREADCRUMB', doc)
}

</script>
<style scoped lang="scss">
.p-pl-42 {
    padding-left: 42px
}
</style>
