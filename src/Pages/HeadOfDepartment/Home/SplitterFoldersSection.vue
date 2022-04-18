<template>
  <div class="folders-section-container">
    <PText variant="subtitle-2">
      Mis archivos
    </PText>
    <PText variant="text-3">
      Gestor de archivos
    </PText>
    <QTree
      :nodes="simple"
      node-key="label"
      no-connectors
    />
  </div>
</template>

<script setup lang="ts">
import {QTree} from 'quasar'
const simple = [
    {
        label: 'Satisfied customers (with avatar)',
        children: [
            {
                label: 'Good food (with icon)',
                children: [
                    { label: 'Quality ingredients' },
                    { label: 'Good recipe' }
                ]
            },
            {
                label: 'Good service (disabled node with icon)',
                children: [
                    { label: 'Prompt attention' },
                    { label: 'Professional waiter' }
                ]
            },
            {
                label: 'Pleasant surroundings (with icon)',
                children: [
                    {
                        label: 'Happy atmosphere (with image)',
                    },
                    { label: 'Good table presentation' },
                    { label: 'Pleasing decor' }
                ]
            }
        ]
    }
]
</script>

<style scoped lang="scss">
.folders-section-container{
    background-color: $grey-5;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding-top: 66px;
    padding-left: 35px;
    padding-right: 12px;
}
</style>
