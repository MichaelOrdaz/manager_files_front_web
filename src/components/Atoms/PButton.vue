<template>
  <button :class="estilosComputados">
    <div>
      <PIcon
        v-if="props.iconoIzquierda"
        :nombreDeIcono="props.iconoIzquierda"
        tamanio="pequeno"
        color="blanco"
      />
    </div>
    <div>
      <slot>
        Texto de boton
      </slot>
    </div>
    <div>
      <PIcon
        v-if="props.iconoDerecha"
        :nombreDeIcono="props.iconoDerecha"
        tamanio="pequeno"
        class="icono"
        color="blanco"
      />
    </div>
  </button>
</template>

<script setup lang="ts">
import {computed, withDefaults} from 'vue'
interface Props {
    variante?: string,
    tamano?: string,
    iconoDerecha?: string | null,
    iconoIzquierda?: string | null,
}
const props = withDefaults(defineProps<Props>(), {variante: 'primario', tamano: 'psm', iconoIzquierda: null, iconoDerecha: null})

const estilosComputados = computed<string>(() => `${props.variante} ${props.tamano}`
)
</script>

<style scoped lang="scss">
button{
    border-radius: 4px;
    border: none;
    min-width: 82px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 11px 20px;
}
div :deep(.material-icons) {
    margin: 0 4px;
}
// Tamaños
.pxsm{
    height: 30px;
    min-width: 65px;
    font-size: 12px;
    font-weight: bold;
}
.psm{
    height: 34px;
    min-width: 65px;
    font-size: 12px;
    font-weight: bold;
}
.pmd{
    height: 38px;
    min-width: 65px;
    font-size: 12px;
    font-weight: bold;
}
.plg{
    height: 42px;
    min-width: 65px;
    font-weight: bold;
}
.pxlg{
    height: 46px;
    min-width: 65px;
    font-size: 14px;
    font-weight: bold;
}
// Colores
.primario{
    background-color: $primario;
    color: white;
}
.secundario{
    background-color: $secundario;
    color: white;
}
.desactivado{
    background-color: $desactivado;
    color: white;
    pointer-events: none;
}
.blanco{
    background-color: white;
    border: 1px solid #DBD9D9;
    color: #374151;
}
// Efectos y Eventos
button:hover{ opacity: 0.8; cursor: pointer }
button:active{ opacity: 0.9; cursor: pointer }
button:after{
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    opacity: 0;
    transition: all 0.5s;
    box-shadow: 0 0 10px 10px black;
}
button:active:after{
    box-shadow: 0 0 0 0 white;
    opacity: 0.75;
    transition: 0s;
}
</style>
