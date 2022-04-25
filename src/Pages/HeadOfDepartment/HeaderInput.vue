<template>
  <div class="header-container">
    <PInput
      v-model="searchValue"
      class="q-mr-sm"
      appendIconName="tune"
      prependIconName="search"
      placeHolder="Buscar"
      width="758px"
    />
    <PButton class="p-mt-4">
      Buscar
    </PButton>
    <POptionList
      class="avatar"
      :options="options"
      type="avatar"
    />
  </div>
</template>
<script setup lang="ts">
import {ref, watch} from 'vue'
import {Option} from '@/components/Molecules/POptionList.vue'
import {useLogOut} from '@/Composables/useUserSessionMethods'
const emit = defineEmits(['update:modelValue'])
const searchValue = ref<string>('')
const options = ref<Option[]>([
    {optionLabel: 'Cerrar sesión', action: useLogOut, icon: ''},
])

watch(searchValue, () => { emit('update:modelValue', searchValue.value) })
</script>
<style scoped lang="scss">
.p-mt-4 {
    margin-top: 4px
}

div :deep(.slot) {
    display: flex;
    justify-content: center;
    align-items: center;
}

.header-container {
    width: 100%;
    height: 68px;
    display: flex;
    justify-content: center;
    margin: 12px 0;
    position: relative;
    .avatar{
        position: absolute;
        top: 0;
        right: 0;
    }
}
</style>
