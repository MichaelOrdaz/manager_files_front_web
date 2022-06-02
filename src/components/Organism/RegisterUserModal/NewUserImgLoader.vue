<template>
  <div class="user-img">
    <PText
      variant="text-1"
      color="gray-6"
      fontWeight="700"
    >
      Dar de alta usuario
    </PText>
    <div class="btn-img">
      <img
        class="new-img"
        :src="newUserImg"
        alt="userImg"
      >
      <PButton
        class="upload-btn"
        variant="white"
        @click.prevent="loadUserImg"
      >
        Subir
      </PButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref} from 'vue'
import ProfileIcon from '../../../assets/profileicon.svg'
import {User} from '@/Types/User'

const newUserImg = ref<string | File>(ProfileIcon)
const emit = defineEmits(['capture-new-image'])
interface Props {userSelected?: User}
const props = withDefaults(defineProps<Props>(), {userSelected: undefined})
function loadUserImg() {
    const fileInput: HTMLInputElement = document.createElement('input')
    fileInput.type = 'file'
    fileInput.style.display = 'none'
    fileInput.accept = 'image/*'
    fileInput.click()
    fileInput.onchange = () => {
        const img = fileInput.files?.item(0)
        newUserImg.value = URL.createObjectURL(img)
        emit('capture-new-image', fileInput.files?.item(0))
    }
}
if (props.userSelected?.image) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    newUserImg.value = props.userSelected.image
}
</script>

<style scoped>
.user-img{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}
.new-img{
    height: 48px;
    width: 48px;
    border-radius: 50%;
    margin-right: 14px;
    margin-top: 13px;
}
.btn-img{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.upload-btn{
    margin-top: 10px;
}
</style>
