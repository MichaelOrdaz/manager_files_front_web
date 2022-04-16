<template>
  <div>
    <PText>Home</PText>
    <QSplitter
      v-model="splitterModel"
      :limits="[10, 25]"
      style="height: 90vh"
    >
      <template #before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">
            Before
          </div>
          <div
            v-for="n in 20"
            :key="n"
            class="q-my-md"
          >
            {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.
          </div>
        </div>
      </template>
    </QSplitter>
  </div>
</template>

<script setup lang="ts">
import {QSplitter} from 'quasar'
import {ref} from 'vue'

// eslint-disable-next-line no-undef
const splitterModel = ref<number>(50)
</script>

<style scoped>

</style>
