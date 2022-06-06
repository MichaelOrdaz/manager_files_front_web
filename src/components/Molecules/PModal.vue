<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <transition name="modal">
        <div class="modal-container">
          <PIcon
            iconName="close"
            class="close-icon"
            @click="$emit('cancel')"
          />
          <div
            v-if="props.modalTitle"
            class="modal-header"
          >
            <PText
              class="title"
              variant="subtitle-2"
              color="black"
            >
              {{ props.modalTitle }}
            </PText>
          </div>
          <div
            v-if="$slots.header"
            class="modal-header"
          >
            <slot name="header" />
          </div>
          <div
            v-if="props.modalBodyText"
            class="modal-body"
          >
            <PText
              variant="text-3"
              color="black"
            >
              {{ props.modalBodyText }}
            </PText>
          </div>
          <div
            v-if="$slots.body"
            class="modal-body"
          >
            <slot name="body" />
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <PButton
                class="p-mx"
                variant="white"
                size="plg"
                @click="$emit('cancel')"
              >
                {{ props.cancelButtonText }}
              </PButton>
              <PButton
                size="plg"
                data-cy="accept-modal-btn"
                @click="$emit('accept')"
              >
                {{ props.acceptButtonText }}
              </PButton>
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

defineEmits(['cancel', 'accept'])
interface Props{
    modalTitle?: string,
    modalBodyText?: string,
    modalFooter?: string,
    acceptButtonText?: string,
    cancelButtonText?: string,
    width?: string,
    heigth?: string,
}
const props = withDefaults(defineProps<Props>(), {
    modalTitle: undefined,
    modalBodyText: undefined,
    modalFooter: undefined,
    acceptButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    heigth: '194px',
    width: '512px',
})

const componentWidth = ref(props.width)
const componentHeight = ref(props.heigth)
</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: v-bind(componentWidth);
    height: v-bind(componentHeight);
    max-height: 700px;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;
}
.close-icon{
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
}
.title{font-weight: 500}
.modal-footer{
    display: flex;
    justify-content: flex-end;
}
.p-mx{margin: 0 12px}
@media (max-width: 551px){
    .modal-container{
        width: 90%;
        height: 50%;
        justify-content: space-between;
    }
}
</style>
