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
          maxLength="254"
          label="Nombre archivo"
          :rules="[(value:string) => /^[a-z0-9_\-\s\.]+$/i.test(value) || 'El nombre solo puede contener caracteres alfanuméricos, guion bajo/medio, espacios y puntos']"
          data-cy="file-name"
        />
        <div class="textarea-container text-left p-mt-18">
          <PText variant="subtitle-3">
            Descripción
          </PText>
          <textarea
            v-model="formData.description"
            class="puller-textarea"
            placeholder="Descripción del archivo..."
            data-cy="file-desc"
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
            :rules="[(value:string) => /^[0-9]*?-?[0-9]*$/g.test(value) || 'El folio solo puede contener números o un guión para separar']"
            data-cy="identifier-input"
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
            data-cy="load-file-btn"
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
import store from '@/store'
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
    const isValidForm: boolean = formRef.value.validate()
    if (!isValidForm) return
    if (formData.min_identifier.includes('-')){
        const [min, max] = formData.min_identifier.split('-')
        formData.min_identifier = min
        formData.max_identifier = max
    }
    try {
        await useCreateFile(formData, store.getters?.getCurrentFolder?.id)
        Notify.create({message: 'Se ha subido el archivo', color: 'green'})
        await store.dispatch('get_folder_content')
        emit('cancel')
    } catch (e) {
        Notify.create({message: 'Valida los campos', color: 'red'})
    }
}
</script>

<style scoped lang="scss">
@import "LoadPdfFileModal.scss";
</style>
