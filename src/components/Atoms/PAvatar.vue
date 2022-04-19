<template>
  <div
    class="avatar-container"
    :class="props.size"
  >
    <img
      :src="props.src"
      alt="avatar"
    >
  </div>
</template>

<script setup lang="ts">
import DefaultImg from '@/assets/profileicon.svg'
interface Props{
    src?: string,
    size?: string,
}
const props = withDefaults(defineProps<Props>(), {src: DefaultImg, size: 'pmd'})
</script>

<style scoped>
img{
    object-fit: contain;
    width: 100%;
    height: 100%;
}
.avatar-container{
    border-radius: 50%;
    object-fit: contain;
    padding: 1px;
}
.pxsm{ width: 32px }
.psm{ width: 35px; }
.pmd{ width: 38px; }
</style>
