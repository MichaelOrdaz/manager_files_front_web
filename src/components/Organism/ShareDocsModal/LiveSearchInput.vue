<template>
  <div
    ref="componentRef"
    class="input-filter-container"
  >
    <PInput
      label="Busca a usuario"
      width="100%"
      placeHolder="Buscar"
      v-model="filterValue"
    />
    <div
      v-if="showUsersList && users.length"
      class="users-list"
    >
      <UserItem
        v-for="(user, index) in users"
        :key="index"
        :itemTitleText="user.id"
        @click="addEvent(user, index)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
/* eslint-disable no-unused-vars */
import {ref, watchEffect} from 'vue'
import type {User} from '@/Types/User'
import UserItem from './UserItem.vue'
import useDetectOutsideClick from '@/utils/useDetectOutsideClick'

const emit = defineEmits<{(e:'add-user', val: User):void}>()

const filterValue = ref<string>('')
const showUsersList = ref<boolean>(false)
const isTyping = ref<boolean>(false)
const users = ref<User[]>([])
const componentRef = ref(null)
async function getUsers(): Promise<void> {
    const resp = await fetch('https://ghibliapi.herokuapp.com/films')
    users.value = await resp.json()
}
function addEvent(userData: User, index: number) {
    emit('add-user', userData)
    users.value.splice(index, 1)

}
watchEffect((onInvalidate) => {
    if (filterValue.value.trim().length > 0) {
        isTyping.value = true
        const startFetch = setTimeout(() => {
            getUsers()
            isTyping.value = false
            showUsersList.value = true
        }, 2000)
        onInvalidate(() => {
            clearInterval(startFetch)
            isTyping.value = false
            showUsersList.value = false
        })
    }
})

useDetectOutsideClick(componentRef, () => { showUsersList.value = false })

</script>
<style scoped lang="scss">
.input-filter-container {
    position: relative;
}
.users-list {
    width: 100%;
    position: absolute;
    right: 0;
    left: 0;
    height: 210px;
    overflow-y: scroll;
    z-index: 9999;
    background-color: white;
}
</style>
