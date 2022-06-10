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
          {{ props.isEdit ? 'Actualizar archivo' : 'Subir archivo' }}
        </PText>
        <PInput
          v-model="formData.name"
          width="100%"
          placeHolder="ejemplo.pdf"
          maxLength="50"
          label="Nombre archivo"
          :rules="[(value:string) => /^[a-z0-9_\-\s\.]+$/i.test(value) || 'El nombre solo puede contener caracteres alfanuméricos, guion bajo/medio, espacios y puntos',
                   (value: string) => !!value.trim() || 'Agrega un nombre para el archivo']"
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
            place-holder="2000-01-01"
            :rules="[(value:string) => !!value.trim() || 'Agrega una fecha válida']"
          />
          <PInput
            v-model="formData.min_identifier"
            label="Rango de folio"
            width="253px"
            :rules="[(value:string) => /^(\d)+-?(\d)+$/g.test(value) || 'El folio solo puede contener números o un guión para separar dos números',
                     (value: string) => value.trim().length >= 2 || 'El folio debe contener mínimo dos números']"
            data-cy="identifier-input"
            placeHolder="0001-0002"
          />
        </div>
        <div class="buttons flex justify-end p-mt-46">
          <PButton
            class="p-mr-12"
            variant="white"
            @click.prevent="$emit('cancel')"
          >
            Cancelar
          </PButton>
          <PButton
            data-cy="load-file-btn"
            @click.prevent="triggerAction"
          >
            {{ props.isEdit ? 'Actualizar archivo' : 'Subir archivo' }}
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
import {onMounted, reactive, ref, withDefaults} from 'vue'
import type {File} from '@/Types/File'
import {useCreateFile, useUpdateFile} from '@/Composables/useDocumentsClientMethods'
import {Notify} from 'quasar'
import store from '@/store'
interface Props {
    newFile?: File, actualFolderId?: number, isEdit?: boolean
}
const emit = defineEmits(['cancel'])
const props = withDefaults(defineProps<Props>(), {newFile: undefined, actualFolderId: 0, isEdit: false})


const formRef = ref<PFormComp>(null)
const formData = reactive<File>({
    name: '', description: '', date: '', min_identifier: '', file: props.newFile
})

function triggerAction() {
    if (!props.isEdit) {
        createFile()
        return
    }
    updateFile()
}

async function updateFile() {
    if (formData.min_identifier.includes('-')){
        const [min, max] = formData.min_identifier.split('-')
        formData.min_identifier = min
        formData.max_identifier = max
    }
    try {
        await useUpdateFile(store.getters.getSelectedItem.id, formData)
        Notify.create({message: 'Se ha actualizado el archivo', color: 'blue', type: 'positive', position: 'top-right'})
        await store.dispatch('get_folder_content')
        emit('cancel')
    } catch (e) {
        Notify.create({message: 'Ha ocurrido un error al actualizar el archivo', color: 'blue', type: 'positive', position: 'top-right'})
        emit('cancel')
    }
}
async function createFile() {
    const isValidForm: boolean = formRef.value.validate()
    if (!isValidForm) return
    if (!formData.description.length) {
        Notify.create({message: 'Agrega una descripción', color: 'red', type: 'negative', position: 'top-right'})
        return
    }
    if (formData.min_identifier.includes('-')){
        const [min, max] = formData.min_identifier.split('-')
        formData.min_identifier = min
        formData.max_identifier = max
    }
    try {
        await useCreateFile(formData, store.getters?.getCurrentFolder?.id)
        Notify.create({message: `Se ha subido el PDF "${formData.name}."`, color: 'blue', type: 'positive', position: 'top-right'})
        await store.dispatch('get_folder_content')
        emit('cancel')
    } catch (e) {
        Notify.create({message: 'Ha ocurrido un error al cargar el archivo, intentalo de nuevo', color: 'red', type: 'negative', position: 'top-right'})
    }
}
onMounted(() => {
    if(!props.isEdit) {
        formData.name = props.newFile.name
        return
    }
    formData.name = store.getters.getSelectedItem.name
    formData.description = store.getters.getSelectedItem.createdAt
    formData.min_identifier = store.getters.getSelectedItem.identifier
    formData.date = store.getters.getSelectedItem.date
    formData.id = store.getters.getSelectedItem.id
    formData.description = store.getters.getSelectedItem.description
})
</script>

<style scoped lang="scss">
@import "LoadPdfFileModal.scss";
</style>
