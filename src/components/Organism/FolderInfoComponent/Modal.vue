<template>
  <PModal @accept="updateTags">
    <template #body>
      <PInput
        v-model="inputValue"
        width="100%"
        label="Agregar etiqueta"
      />
      <div
        v-if="newTags"
        class="chips-modal-list flex"
      >
        <PChip
          chipType="secondary"
          iconColor="white"
          textColor="white"
          v-for="(tag, index) in newTags"
          :key="index"
          :chipText="tag"
          class="chip"
          @icon-action="removeTag(index)"
        />
      </div>
    </template>
  </PModal>
</template>

<script setup lang="ts">
import PModal from '@/components/Molecules/PModal.vue'
import {ref, watch} from 'vue'
const emit = defineEmits(['update-tags-list'])
interface Props {
    tags?: string[]
}
const props = withDefaults(defineProps<Props>(), {tags: undefined})

const inputValue = ref<string>(props.tags.join(',') || '')
const newTags = ref<string[]>(props.tags)

function removeTag(index: number): void {
    newTags.value.splice(index, 1)
    inputValue.value = newTags.value.join(',')
}
function updateTags() {
    emit('update-tags-list', newTags.value)
}
watch(inputValue, () => {
    if (inputValue.value.trim() !== '' && inputValue.value[inputValue.value.length - 1].includes(',')) {
        newTags.value = inputValue.value.split(',').map(el => el.trim()).filter(ele => ele)
    }
})
</script>

<style scoped>
.chip{margin-right: 4px}
</style>
