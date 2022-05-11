<template>
  <ModalMask>
    <div class="load-files-container">
      <PIcon
        iconName="close"
        class="close-icon"
        @click.prevent.stop="$emit('cancel')"
      />
      <div class="svg-column">
        <img
          src="@/assets/pdfimg.png"
          alt=""
        >
      </div>
      <PForm
        ref="formRef"
        class="inputs-column text-left"
      >
        <PText variant="subtitle-2">
          Subir archivo
        </PText>
        <PInput
          v-model="formData.name"
          width="100%"
          placeHolder="ejemplo.pdf"
          label="Nombre archivo"
          :rules="[(value:string) => !!value.trim() || 'Agrega un nombre válido']"
        />
        <div class="textarea-container text-left p-mt-18">
          <PText variant="subtitle-3">
            Describe tu evento
          </PText>
          <textarea
            v-model="formData.description"
            class="puller-textarea"
            placeholder="Contenido del evento..."
            data-cy="aviso-descripcion"
          />
        </div>
        <div class="date-serial-container flex no-wrap justify-between p-mt-18">
          <PInputDate
            v-model="formData.date"
            label="Fecha"
            width="200px"
            :rules="[(value:string) => !!value.trim() || 'Agrega una fecha válida']"
          />
          <PInput
            v-model="formData.min_identifier"
            label="Rango de folio"
            width="253px"
            :rules="[(value:string) => !!value.trim() || 'Agrega folio/s']"
          />
        </div>
        <div class="buttons flex justify-end p-mt-46">
          <PButton
            variant="white"
            @click.prevent="$emit('cancel')"
          >
            Cancelar
          </PButton>
          <PButton
            class=""
            @click.prevent="createFile"
          >
            Subir archivo
          </PButton>
        </div>
      </PForm>
    </div>
  </ModalMask>
</template>
<script setup lang="ts">
import ModalMask from '@/components/Atoms/ModalMask.vue'
import PForm from '@/components/Organism/PForm.vue'
import PFormComp from '@/Types/PFormComp'
import PInputDate from '@/components/Molecules/PInputDate.vue'
import {reactive, ref, withDefaults} from 'vue'
import type {File} from '@/Types/File'
import {useCreateFile} from '@/Composables/useDocumentsClientMethods'
import {Notify} from 'quasar'
interface Props {
    newFile?: string, actualFolderId?: number
}
const emit = defineEmits(['cancel'])
const props = withDefaults(defineProps<Props>(), {newFile: undefined, actualFolderId: 0})


const formRef = ref<PFormComp>(null)
const formData = reactive<File>({
    name: '', description: '', date: '', min_identifier: '', file: props.newFile
})
async function createFile() {
    console.log(props.actualFolderId)
    const isValidForm: boolean = formRef.value.validate()
    if (!isValidForm) return
    try {
        await useCreateFile(formData, props.actualFolderId)
        Notify.create({message: 'Se ha subido el archivo', color: 'green'})
        emit('cancel')
    } catch (e) {
        Notify.create({message: 'Valida los campos', color: 'red'})
    }
}
</script>

<style scoped lang="scss">
@import "LoadPdfFileModal.scss";
</style>
