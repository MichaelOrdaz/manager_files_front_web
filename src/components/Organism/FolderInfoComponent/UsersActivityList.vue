<template>
  <div class="users-activity-container">
    <PText variant="text-5">
      Historial
    </PText>
    <MiniCard
      v-for="number in 3"
      :key="number"
      descriptionText="Test text for the card description and more data"
      cardTitle="Test text for everyone"
    />
    <PLinkText>Ver más...</PLinkText>
  </div>
</template>

<script setup lang="ts">
import MiniCard from '@/components/Molecules/MiniCard.vue'

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
    border-bottom: solid 1px $gray-8;
}
</style>
