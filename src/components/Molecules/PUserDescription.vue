<template>
  <div class="user-description-container">
    <PIcon
      iconName="person"
      color="black"
      size="pmd"
    />
    <div
      class="user-data"
    >
      <PText variant="text-4">
        {{ userData.user_data.name || 'Sin nombre' }}
      </PText>
      <PText variant="text-5">
        {{ userData.roles[0] || ' Sin rol' }}
      </PText>
      <PText
        variant="text-5"
        color="grey-5"
      >
        {{ userData.user_data.email || 'Sin correo' }}
      </PText>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useStore} from 'vuex'
import {computed} from 'vue'
import {Auth} from '@/store/auth/auth'

const userData = computed<Auth>(() => useStore().getters.getUserData)
</script>

<style scoped lang="scss">
.user-description-container{
    width: 100%;
    height: 66px;
    display: flex;
    flex-direction: row;
    .user-data{
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 10px;
    }
}
</style>
