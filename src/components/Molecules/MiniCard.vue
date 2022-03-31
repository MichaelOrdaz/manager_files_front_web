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
        {{ props.date }}
      </PText>
      <PText
        class="share-with-text"
        color="black"
        variant="texto-5"
      >
        Se ha compartido la carpeta con:
      </PText>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props{
    date?: string,
    usersList?: string[]
}
const props = withDefaults(defineProps<Props>(), {
    date:'15-03-2021',
    usersList: undefined,
})
</script>

<style scoped>
.mini-card-container{
    width: 256px;
    height: 46px;
    display: flex;
    justify-content: flex-start;
    text-align: left;
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
