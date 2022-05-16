<template>
  <div class="folders-section-container">
    <PText variant="subtitle-2">
      Mis archivos
    </PText>
    <PText variant="text-3">
      Gestor de archivos
    </PText>
    <QTree
      :nodes="treeNodes"
      node-key="label"
      no-connectors
      accordion
      no-selection-unset
      default-expand-all
      @lazy-load="getNewNodes"
    />
  </div>
</template>

<script setup lang="ts">
import {QTree} from 'quasar'
import store from '@/store'
import {computed} from 'vue'
import {DocumentsApi} from '@/services/api/api'
import type {QTreeNode} from 'quasar'

const treeNodes = computed<QTreeNode[]>(() => store.getters.getTree)

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
async function getNewNodes({node, key, done, fail}) {
    const resp = await new DocumentsApi().getDocuments(node.folderId)
    const newNodes = resp.data.data.map(el => {
        return {
            label: el.name,
            children: [],
            lazy: true,
            folderId: el.id,
            icon: 'folder',
            type: el.type
        }
    }).filter(doc => doc.type.name === 'Carpeta')
    done(newNodes)
    fail([])
}
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
