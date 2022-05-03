<template>
  <div class="main-container">
    <POptionList
      class="avatar"
      :options="options"
      type="avatar"
    >
      <template #header>
        <PUserDescription />
      </template>
    </POptionList>
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
import {computed, ref} from 'vue'
import PSidebarIconButton from '@/components/Atoms/PSidebarIconButton.vue'
import {useStore} from 'vuex'
import PUserDescription from '@/components/Molecules/PUserDescription.vue'
import {Option} from '@/components/Molecules/POptionList.vue'
import {useLogOut} from '@/Composables/useUserSessionMethods'
const options = ref<Option[]>([
    {optionLabel: 'Cerrar sesión', action: useLogOut, icon: 'logout'},
])

const userRol = computed<string>(() => useStore().getters.getRol)
const onLoadModules = computed<Module[]>(() => RolesModules[userRol.value])
</script>

<style scoped lang="scss">
.main-container{
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 80px 1fr;
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
    height: 100%;
    overflow-y: scroll;
}
.logo{
    height: 83px;
    width: 73px;
    margin-bottom: 19px;
    margin-top: 6px;
}
.avatar{
    position: absolute;
    top: 12px;
    right: 24px;
    z-index: 10;
}
</style>
