<template>
  <div class="text-left">
    <PText variant="text-4">
      Permisos para usuarios
    </PText>
    <div class="radio">
      <input
        value="Editor"
        type="radio"
        v-model="radioValue"
      >
      <PText variant="text-3">
        Editor
      </PText>
    </div>
    <div class="radio">
      <input
        value="Lector"
        type="radio"
        v-model="radioValue"
      >
      <PText variant="text-3">
        Lector
      </PText>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, watch} from 'vue'

const emit = defineEmits(['update:modelValue'])
const radioValue = ref<string>('')

watch(radioValue, () => {emit('update:modelValue', radioValue)})

</script>
<style scoped lang="scss">
.radio {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 21px;
    width: 70px;
    margin-top: 12px;
}

input[type="radio"] {
    height: 20px;
    width: 20px;
}

input[type="radio"]:checked {
    color: $ocean;
    background-color: $ocean;
}
div :deep(.general-style){font-weight: 500}
</style>
