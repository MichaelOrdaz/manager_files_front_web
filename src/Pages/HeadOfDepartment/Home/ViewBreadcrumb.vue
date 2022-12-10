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
        v-for="(item, index) in breadcrumb"
        :key="index"
        class="cursor-pointer"
        :label="item?.name"
        @click="changeFolder(item?.id)"
      />
    </q-breadcrumbs>
  </div>
</template>
<script setup lang="ts">
import {Document} from '@/Types/Document'
import {computed} from 'vue'
import store from '@/store/index'
import {BreadcrumbItem} from '@/store/FoldersStore/foldersStore'

interface Props{
    actualFolder?: Document,
    triggerFolderChange?: boolean
}
const emit = defineEmits(['change-folder'])
withDefaults(defineProps<Props>(), {actualFolder: undefined, clickCounter: false})
const breadcrumb = computed<BreadcrumbItem[]>(() => store.getters.getBread)
async function changeFolder(docId?: number) {
    store.commit('SET_CURRENT_FOLDER',{id: docId})
    await store.dispatch('get_folder_content')
}

</script>
<style scoped lang="scss">
.p-pl-42 {
    padding-left: 42px
}
</style>
