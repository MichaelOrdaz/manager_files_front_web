<template>
  <button
    :class="computedStyles"
  >
    <div>
      <PIcon
        v-if="props.leftIcon"
        :iconName="props.leftIcon"
        size="pmd"
        color="white"
      />
    </div>
    <div>
      <slot>
        Button Text
      </slot>
    </div>
    <div>
      <PIcon
        v-if="props.rightIcon"
        :iconName="props.rightIcon"
        size="pequeno"
        class="icono"
        color="blanco"
      />
    </div>
  </button>
</template>

<script setup lang="ts">
import {computed, withDefaults} from 'vue'
interface Props {
    variant?: string,
    size?: string,
    rightIcon?: string | null,
    leftIcon?: string | null,
    type?: 'button' | 'submit' | 'reset' | undefined,
}
const props = withDefaults(defineProps<Props>(), {variant: 'primary', size: 'psm', leftIcon: null, rightIcon: null, type: 'button' })

const computedStyles = computed<string>(() => `${props.variant} ${props.size}`
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
// Sizes
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
// Colors
.primary{
    background-color: $primary;
    color: white;
}
.secondary{
    background-color: $secondary;
    color: white;
}
.disabled{
    background-color: $disabled;
    color: white;
    pointer-events: none;
}
.white{
    background-color: white;
    border: 1px solid #DBD9D9;
    color: #374151;
}
// Effects and Events
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
