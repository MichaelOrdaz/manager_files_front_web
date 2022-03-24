<template>
  <button :class="estilosComputados">
    <slot>
      Texto de boton
    </slot>
  </button>
</template>

<script setup lang="ts">
import {computed, withDefaults} from 'vue'
interface Props {
    variante?: string,
    tamano?: string,
}
const props = withDefaults(defineProps<Props>(), {variante: 'primario', tamano: 'sm'})
console.log(import.meta.env.VITE_API_URL)
const estilosComputados = computed<string>(() => `${props.variante} ${props.tamano}`)
</script>

<style scoped>
button{
    border-radius: 4px;
    border: none;
    font-size: 16px;
    font-weight: 500;
    display: inline-block;
}
.pxsm{
    height: 30px;
    min-width: 65px;
}
.psm{
    height: 34px;
    min-width: 65px;
}
.pmd{
    height: 38px;
    min-width: 65px;
}
.plg{
    height: 42px;
    min-width: 65px;
}
.pxlg{
    height: 46px;
    min-width: 65px;
}
.primario{
    background-color: #42b983;
    color: #eeeeee;
}
button:hover{ opacity: 0.5; cursor: pointer }
button:active{ opacity: 0.2; cursor: pointer }
</style>
