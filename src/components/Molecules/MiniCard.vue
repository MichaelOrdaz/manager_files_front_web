<template>
  <div class="mini-card-container">
    <PIcon
      class="icon"
      size="pmd"
      iconName="account_circle"
    />
    <div class="texts">
      <PText
        color="black"
        variant="texto-5"
      >
        {{ props.cardTitle }}
      </PText>
      <PText
        class="share-with-text"
        color="black"
        variant="texto-5"
      >
        {{ props.descriptionText }}
      </PText>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props{
    cardTitle?: string,
    descriptionText?: string,
}
const props = withDefaults(defineProps<Props>(), {
    cardTitle:'Title',
    descriptionText: 'Description Text'
})
</script>

<style scoped>
.mini-card-container{
    width: 256px;
    min-height: 46px;
    display: flex;
    justify-content: flex-start;
    text-align: left;
    border: 1px solid #F1F1F2;
}
.texts{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 9px;
}
.icon{padding: 6px}
.share-with-text{
    color: #939598;
}
</style>
