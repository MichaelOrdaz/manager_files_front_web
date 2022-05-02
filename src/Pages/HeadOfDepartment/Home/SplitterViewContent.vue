<template>
  <div class="header-container">
    <div class="filter-input">
      <PInput
        v-model="searchValue"
        class="q-mr-sm"
        appendIconName="tune"
        prependIconName="search"
        placeHolder="Buscar"
        width="758px"
        enableCursorPointerOnIcon
        @append-icon-action="showAdvancedSearch = true"
      />
      <PButton class="p-mt-4">
        Buscar
      </PButton>
      <AdvancedSearch
        v-if="showAdvancedSearch"
        class="search"
        @cancel="showAdvancedSearch = false"
      />
    </div>
  </div>
  <div>
    <ViewBreadcumb />
    <ViewFoldersDescAndActions />
  </div>
  <div class="no-data p-mt-122">
    <img
      :src="NoDataSvg"
      alt="No data"
    >
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import ViewBreadcumb from '@/Pages/HeadOfDepartment/Home/ViewBreadcrumb.vue'
import ViewFoldersDescAndActions from '@/Pages/HeadOfDepartment/Home/ViewFoldersDescAndActions.vue'
import AdvancedSearch from './AdvancedSearch.vue'
import NoDataSvg from '@/assets/uploadfiles.svg'

const searchValue = ref<string>('')
const showAdvancedSearch = ref<boolean>(false)


</script>

<style scoped lang="scss">
.p-mt-4{margin-top: 4px}
.p-mt-122{margin-top: 122px}
.header-container{
    width: 100%;
    height: 68px;
    display: flex;
    justify-content: space-between;
    padding-left: 42px;
    padding-right: 16px;
    margin: 12px 0;
    border-bottom: solid 1px $grey-4;
    .filter-input{display: flex}
    .avatar{height: 30px}
    .filter-input{
        display: flex;
        width: 100%;
        position: relative;
        .search{
            position: absolute;
            right: 0;
            left: 0;
        }
    }
}
@media (max-width: 1216px){
    .header-container{
        height: 120px;
        flex-direction: column-reverse;
        align-items: flex-end;
        .avatar{margin-right: 12px}
        .filter-input{display: flex; width: 100%}
    }
}
</style>
