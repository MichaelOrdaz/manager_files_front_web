<template>
  <div class="main-container">
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
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.main-container{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
}
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
    width: calc(100% - 80px);
    height: 100%;
}
.logo{
    height: 83px;
    width: 73px;
    margin-bottom: 19px;
    margin-top: 6px;
}
</style>
