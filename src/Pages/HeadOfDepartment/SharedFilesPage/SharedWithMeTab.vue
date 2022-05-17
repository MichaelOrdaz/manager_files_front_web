<template>
  <div class="shared-files-container">
    <div class="section-head">
      <PText variant="text-1">
        Archivos que he compartido con
      </PText>
      <div class="filter-btn">
        <PText variant="text-4">
          Selecciona el departamento
        </PText>
        <PDropdown
          :options="options"
          text="Hola a todos"
        />
      </div>
    </div>
    <ColumnsDescription />
    <div class="shared-files-body">
      <div class="full-width">
        <ItemRow
          v-for="number in 10"
          :key="number"
          first-text="Primero texto"
          second-text="Segundo texto"
          third-text="tercer texto"
          fourth-text="Cuarto texto"
        />
      </div>
      <FolderInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemRow from '@/components/Organism/DirFileRowComponent.vue'
import PDropdown, {DropdownOption} from '@/components/Molecules/PDropdown.vue'
import FolderInfo from '@/components/Organism/FolderInfoComponent/index.vue'
import {ref} from 'vue'
import ColumnsDescription from '@/Pages/HeadOfDepartment/SharedFilesPage/ColumnsDescription.vue'

const options = ref<DropdownOption[]>([{label: 'Hola', action: () => {console.log('Chido')}}])
</script>

<style scoped lang="scss">
.shared-files-container{
    display: flex;
    flex-direction: column;
    width: 100%;
    .shared-files-body{
        display: flex;
        margin-top: 12px;
    }
    .section-head{
        width: 100%;
        justify-content: space-between;
        align-items: center;
        display: flex;
        .filter-btn{
            text-align: left;
            width: 345px;
        }
    }
}
</style>
