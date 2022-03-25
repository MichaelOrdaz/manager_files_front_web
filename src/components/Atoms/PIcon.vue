<template>
  <span :class="estilosComputados">
    {{ props.nombreDeIcono }}
  </span>
</template>

<script setup lang="ts">
import {computed, withDefaults} from 'vue'
interface Props {
    nombreDeIcono?: string,
    tamanio?: string,
    color?: string,
}
const props = withDefaults(defineProps<Props>(), {
    nombreDeIcono: 'link',
    tamanio: 'pmd',
    color: 'negro',
})
const estilosComputados = computed<string>(() => `material-icons ${props.color} ${props.tamanio}`)
</script>

<style scoped lang="scss">
.material-icons{ padding: 0; margin: 0; width: auto}
.psm{
    font-size: 12px;
}
.pequeno{
    font-size: 24px;
}
.blanco{color: white}
.negro{color: black}
</style>
