<template>
  <div :class="clasesComputadas">
    <slot>
      Texto
    </slot>
  </div>
</template>

<script setup lang="ts">
import {computed, withDefaults} from 'vue'

interface Props{
    variante?: string,
    color?: string,
}
const props = withDefaults(defineProps<Props>(), {
    color: 'blanco',
    variante: 'titulo-1'
})
const clasesComputadas = computed<string>(() => `estilo-general ${props.variante} ${props.color}`)
</script>

<style scoped lang="scss">
.estilo-general{
    display: inline-block;
}
.titulo-1{
    font-size: 60px;
    font-weight: 400;
    font-style: normal;
}
.titulo-2{
    font-size: 50px;
    font-weight: 400;
    font-style: normal;
}
.titulo-3{
    font-size: 44px;
    font-weight: 400;
    font-style: normal;
}
.titulo-4{
    font-size: 40px;
    font-weight: 400;
    font-style: normal;
}
.titulo-5{
    font-size: 36px;
    font-weight: 400;
    font-style: normal;
}
.titulo-6{
    font-size: 32px;
    font-weight: 400;
    font-style: normal;
}
.subtitulo-1{
    font-size: 30px;
    font-weight: 400;
    font-style: normal;
}
.subtitulo-2{
    font-size: 24px;
    font-weight: 400;
    font-style: normal;
}
.texto-1{
    font-size: 20px;
    font-weight: 400;
    font-style: normal;
}
.texto-2{
    font-size: 18px;
    font-weight: 400;
    font-style: normal;
}
.texto-3{
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
}
.texto-4{
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
}
.texto-5{
    font-size: 12px;
    font-weight: 400;
    font-style: normal;
}
.primario{color: $primario}
.secundario{color: $secundario}
.mar{color: $mar}
.vegetacion{color: $vegetacion}
.riqueza{color: $riqueza}
.cruz{color: $cruz}
.dorado{color: $dorado}
.blanco{color: white}
.negro{color: black}

</style>
