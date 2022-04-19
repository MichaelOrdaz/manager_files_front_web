<template>
  <PModal>
    <template #body>
      <PInput label="Agregar etiqueta" />
      <div
        v-if="props.tags.length"
        class="chips-modal-list"
      >
        <PChip
          v-for="(tag, index) in props.tags"
          :key="index"
          chipType="secondary"
          iconColor="white"
          textColor="white"
          :chipText="tag"
          class="chip"
        />
      </div>
    </template>
  </PModal>
</template>

<script setup lang="ts">
import PModal from '@/components/Molecules/PModal.vue'
interface Props{
    tags?: string[] | never[]
}
const props = withDefaults(defineProps<Props>(), {tags: []})
</script>

<style scoped lang="scss">
.chips-modal-list{
    display: flex;
    margin-bottom: 12px;
    .chip{margin: 0 6px}
}
</style>
