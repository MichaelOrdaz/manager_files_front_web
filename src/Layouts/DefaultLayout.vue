<template>
  <div class="main-container">
    <div class="sidebar">
      <img
        src="../assets/logo.svg"
        alt="Logo"
        class="logo"
      >
      <PSidebarIconButton
        v-for="(module, index) in onLoadModules"
        :key="index"
        :iconName="module.icon"
        :iconColor="$route.name === module.name ? 'white' : 'primary'"
        :backgroundColor="$route.name === module.name ? 'active': 'unactive'"
        @click="$router.push({name: module.name})"
      />
    </div>
    <div class="body">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import {Module, RolesModules} from '@/Layouts/RolesModules'
import {computed} from 'vue'
import PSidebarIconButton from '@/components/Atoms/PSidebarIconButton.vue'

const rol = 'Head of Department'
const onLoadModules = computed<Module[]>(() => RolesModules[rol])
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
