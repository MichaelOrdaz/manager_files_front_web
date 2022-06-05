<template>
  <div class="users-activity-container">
    <PText
      variant="text-4"
      fontWeight="600"
      color="gray-6"
    >
      Historial
    </PText>
    <MiniCard
      :descriptionText="props?.history[props.history.length - 1]?.action?.name"
      :cardTitle="`${formatDate(props?.history[props.history.length -1]?.date, 'DD')} de ${formatDate(props?.history[props.history.length -1]?.date, 'MMMM')}`"
    />
    <PLinkText @click="showHistoryModal = true">
      Ver más...
    </PLinkText>
  </div>
  <PModal
    v-if="showHistoryModal"
    :modalTitle="store.getters.isFolder ? 'Historial de carpeta' : 'Historial de archivo'"
    width="632px"
    heigth="652px"
    class="text-left"
    @cancel="showHistoryModal = false"
  >
    <template #body>
      <div class="history-items">
        <div
          v-for="record in props.history"
          :key="record.id"
          class="history-item"
        >
          <PText variant="text-5">
            {{ `${formatDate(record?.date, 'DD')} de ${formatDate(record?.date, 'MMMM')}` }}
          </PText>
          <PText
            variant="text-5"
            color="grey-5"
          >
            {{ record?.action.name }} {{ record.user?.name ?? 'Sin nombre' }}
          </PText>
        </div>
      </div>
    </template>
    <template #footer>
      <PButton
        size="xlg"
        @click="showHistoryModal = false"
      >
        Salir
      </PButton>
    </template>
  </PModal>
</template>

<script setup lang="ts">
import MiniCard from '@/components/Molecules/MiniCard.vue'
import PModal from '@/components/Molecules/PModal.vue'
import {ref} from 'vue'
import {DocumentRecord} from '@/Types/Document'
import formatDate from '@/utils/FormatDate'
import store from '@/store'
interface Props{ history: DocumentRecord[]}
const props = withDefaults(defineProps<Props>(), {history: () => []})
const showHistoryModal = ref<boolean>(false)

</script>

<style scoped lang="scss">
.users-activity-container{
    width: 100%;
    padding: 12px;
    max-height: 402px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
div :deep(.mini-card-container){
    border: none;
    margin-bottom: 12px;
}
.history-items{
    height: 400px;
    overflow-y: scroll;
    .history-item{
        width: 100%;
        height: 50px;
        padding: 6px;
        border: solid 1px $grey-1;
        display: flex;
        flex-direction: column;
    }
}
</style>
