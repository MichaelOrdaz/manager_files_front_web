<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
    name: 'ModalMask'
}
</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
}
</style>
