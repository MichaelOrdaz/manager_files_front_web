<template>
  <div
    class="icon-button-container"
    :class="props.backgroundColor"
  >
    <PIcon
      :color="props.iconColor"
      :iconName="props.iconName"
    />
  </div>
</template>

<script setup lang="ts">
interface Props{
    iconName?: string,
    iconColor?: string,
    backgroundColor?: string,
}
const props = withDefaults(defineProps<Props>(), {
    iconName: 'home',
    iconColor: 'white',
    backgroundColor: 'active',
})

</script>

<style scoped lang="scss">
.active{
    background: #7D2038;
}
.unactive{
    background-color: #F7F7F7;
}
.icon-button-container{
    height: 56px;
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin-bottom: 8px;
    cursor: pointer;
}
</style>
