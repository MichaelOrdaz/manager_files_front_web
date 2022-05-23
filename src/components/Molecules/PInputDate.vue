<template>
  <PInput
    ref="inputRef"
    v-model="date"
    :label="props.inputLabel"
    :width="props.width"
    :rules="props.rules"
    :placeHolder="props.placeHolder"
    data-cy="input-date"
  >
    <template #append>
      <PIcon
        iconName="event"
        class="cursor-pointer"
        @click.stop.prevent="showCalendar = true"
      />
      <q-date
        v-if="showCalendar"
        v-model="date"
        minimal
        class="date"
        :mask="props.mask"
      >
        <template #default>
          <div class="row flex justify-end">
            <PButton
              variant="white"
              @click.stop.prevent="cancel"
            >
              Cancelar
            </PButton>
            <PButton @click.stop.prevent="accept">
              Aceptar
            </PButton>
          </div>
        </template>
      </q-date>
    </template>
  </PInput>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import PInput from '@/components/Molecules/PInput.vue'
interface PinputComp{
    validateRules: () => boolean,
    component: typeof PInput
}
const emit = defineEmits(['update:modelValue'])
interface Props {
    width: string,
    inputLabel?: string,
    // eslint-disable-next-line no-unused-vars
    rules?: {(value: number | string ): boolean | string}[] | null,
    mask?: string,
    placeHolder?: string,
}
const props = withDefaults(defineProps<Props>(), {
    inputLabel: 'Label', rules: null, mask: 'YYYY-MM-DD', width: '258px', placeHolder: ''
})

const showCalendar = ref<boolean>(false)
const date = ref<string>('')
const inputRef = ref<PinputComp | null>(null)

function cancel():void {
    date.value = ''
    showCalendar.value = false
}

function accept():void {
    showCalendar.value = false
}

watch(date, () => {
    if (props.rules?.length) {
        inputRef.value.validateRules()
    }
    emit('update:modelValue', date.value)}
)
</script>

<style scoped lang="scss">
div :deep(.append-slot){
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 6px;
}
.date{
    position: absolute;
    z-index: 999;
}
</style>
