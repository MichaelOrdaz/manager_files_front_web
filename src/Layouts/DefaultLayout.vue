<template>
  <div class="main-container">
    <div class="sidebar">
      <img
        src="../assets/logo.svg"
        alt="Logo"
        class="logo"
      >
      <PSidebarIconButton
        v-for="(module, index) in RolesModules"
        :key="index"
        :iconName="module.icon"
      />
    </div>
    <div class="body">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import {RolesModules} from '@/Layouts/RolesModules'
import PSidebarIconButton from '@/components/Atoms/PSidebarIconButton.vue'
</script>

<style scoped lang="scss">
.main-container{
    width: 100%;
    height: 100%;
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
