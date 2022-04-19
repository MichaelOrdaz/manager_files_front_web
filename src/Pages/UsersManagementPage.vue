<template>
  <div class="view-container">
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
      <PAvatar
        size="pxsm"
        :src="DefaultImg"
        class="avatar cursor-pointer"
      />
    </div>
    <PText
      variant="subtitle-2"
      class="view-title"
    >
      Gestión de usuarios de mi departamento
    </PText>
    <div class="items-list-container">
      <UserItem
        v-for="number in 15"
        :key="number"
        itemHight="80px"
        letterIconSize="pmd"
        itemTitleVariant="subtitle-1"
        itemSubtitleVariant="text-2"
      >
        <template #default>
          <PDropdown :options="options">
            <template #options="data">
              <PText variant="text-4">
                {{ data.option.label }}
              </PText>
            </template>
          </PDropdown>
        </template>
      </UserItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import DefaultImg from '@/assets/profileicon.svg'
import UserItem from '@/components/Organism/ShareDocsModal/UserItem.vue'
import type {Option} from '@/components/Molecules/PDropdown.vue'
const searchValue = ref<string>('')
const options = ref<Option[]>([{action: () => [], label: 'Prueba de texto'}])
</script>

<style scoped lang="scss">
.p-mt-4{margin-top: 4px}
.dropdown{height: 40px}
.view-title{align-self: flex-start; font-weight: bold}
.view-container{
    width: 100%;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
}
div :deep(.slot) {
    display: flex;
    justify-content: center;
    align-items: center;
}
.header-container{
    width: 100%;
    height: 68px;
    display: flex;
    justify-content: center;
    margin: 12px 0;
    .avatar{
        position: absolute;
        right: 0;
        margin: 0 12px;
    }
}
</style>
