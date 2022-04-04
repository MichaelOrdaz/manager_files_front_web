<template>
  <div class="sidebar">
    <img
      src="../assets/logo.svg"
      alt="Logo"
      class="logo"
    >
  </div>
  <div class="body">
    <router-view />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.sidebar{
    background: #F7F7F7;
    width: 80px;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

}
.body{
    background-color: red;
    width: 50px;
}
.logo{
    height: 83px;
    width: 73px;
    margin-bottom: 19px;
    margin-top: 6px;
}
</style>
