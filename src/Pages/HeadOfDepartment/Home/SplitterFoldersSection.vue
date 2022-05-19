<template>
  <div class="folders-section-container">
    <PText variant="subtitle-2">
      Mis archivos
    </PText>
    <PText variant="text-3">
      Gestor de archivos
    </PText>
    <QTree
      v-model:selected="select"
      :nodes="tree"
      node-key="folderId"
      no-connectors
      accordion
      no-selection-unset
      @lazy-load="getNewNodes"
    />
  </div>
</template>

<script setup lang="ts">
import {QTree} from 'quasar'
import {ref, watch} from 'vue'
import {DocumentsApi} from '@/services/api/api'
import type {QTreeNode} from 'quasar'
import store from '@/store'


const select = ref(0)
const tree: QTreeNode[] = [{
    label: 'Mi unidad',
    icon: 'folder',
    selectable: true,
    lazy: true,
    folderId: 0,
}]
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
async function getNewNodes({node, key, done, fail}) {
    const resp = await new DocumentsApi().getDocuments(node.folderId)
    const newNodes = resp.data.data.filter(doc => doc.type.name === 'Carpeta')
        .map(el => {
            return {
                label: el.name,
                lazy: true,
                folderId: el.id,
                icon: 'folder',
                type: el.type
            }
        })
    done(newNodes)
    fail([])
}

async function getDocumentContent(id: number) {
    const resp = await new DocumentsApi().getDocument(id)
    store.commit('SET_CURRENT_FOLDER', resp.data.data)
    store.commit('BUILD_BREADCRUMB', resp.data.data)
    await store.dispatch('get_folder_content')
}
watch(select, () => {
    if (select.value) {
        getDocumentContent(select.value)
    } else {
        store.commit('RESET_BREADCRUMB_STRUCTURE')
        store.commit('RESET_CURRENT_FOLDER')
        store.dispatch('get_folder_content')
    }
})
</script>

<style scoped lang="scss">
.folders-section-container{
    background-color: $grey-10;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding-top: 66px;
    padding-left: 35px;
    padding-right: 12px;
}
</style>
