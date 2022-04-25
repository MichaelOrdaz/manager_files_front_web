<script setup lang="ts">
// import {useStore} from 'vuex'
// import {AuthApi} from '@/services/api/api'
//
// const token = useStore().getters.getToken
// if (token) {
//     const resp = await new AuthApi().verifyAuth(token)
// }
</script>

<template>
  <router-view :key="$route.name" />
</template>

<style>
*{
    box-sizing: border-box;
}
body, html{
    height: 100%;
    width: 100%;
}
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
    height: 100%;
    width: 100%;
}
</style>
