<template>
  <ModalMask>
    <div class="modal-container">
      <PText
        variant="subtitle-2"
        class="text-left"
      >
        Compartir con carpeta
      </PText>
      <LiveSearchInput @add-user="addUser" />
      <div class="selected-users-chips">
        <PChip
          v-for="(user, index) in users"
          :key="user.id"
          @icon-action="removeUser(index)"
          :chipText="user.id"
          class="chip"
        />
      </div>
      <Radios v-model="userPer" />
      <div class="user-notification-msg">
        <PText
          class="text-left"
          variant="text-1"
        >
          Notificar a usuario
        </PText>
        <textarea
          v-model="notificationMsg"
          placeholder="Escribe un mensaje"
        />
      </div>
      <div class="action-btns">
        <PButton
          size="plg"
          variant="white"
        >
          Cancelar
        </PButton>
        <PButton
          size="plg"
          class="q-ml-lg"
        >
          Enviar
        </PButton>
      </div>
    </div>
  </ModalMask>
</template>

<script setup lang="ts">
import ModalMask from '@/components/Atoms/ModalMask.vue'
import LiveSearchInput from '@/components/Organism/ShareDocsModal/LiveSearchInput.vue'
import Radios from '@/components/Organism/ShareDocsModal/RadiosComponents.vue'
import {ref} from 'vue'
import {User} from '@/Types/User'

const users = ref<User[]>([])
const userPer = ref<string>('')
const notificationMsg = ref<string>('')
function removeUser(index:number) {
    users.value.splice(index,1)
}
function addUser(params: User): void {
    users.value.push(params)
}

</script>

<style scoped lang="scss">
.modal-container {
    width: 652px;
    height: 790px;
    max-height: 700px;
    background-color: white;
    padding: 45px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    .selected-users-chips{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .chip{margin: 4px}
    }
    .user-notification-msg{
        margin-top: 25px;
        display: flex;
        flex-direction: column;
        textarea{
            width: 100%;
            height: 158px;
            outline: none;
            margin-top: 12px;
        }
    }
    .action-btns{
        display: flex;
        justify-content: flex-end;
        margin-top: 99px;
    }
}
</style>
