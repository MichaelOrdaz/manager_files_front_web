<template>
  <PTabs class="q-pa-lg">
    <PTab title="Text">
      <PText>1</PText>
    </PTab>
    <PTab title="Share docs modal">
      <ShareDocsModal />
    </PTab>
    <PTab title="Buttons">
      <PButton>Primary</PButton>
      <PButton variant="white">
        White
      </PButton>
      <PButton variant="secondary">
        Secondary
      </PButton>
      <PButton variant="disabled">
        Disabled
      </PButton>
    </PTab>
    <PTab title="Icons">
      <PIcon />
      <PIcon
        iconName="done"
        size="psm"
      />
    </PTab>
    <PTab title="New user Form">
      <NewUserForm />
    </PTab>
    <PTab title="Inputs">
      <PInput
        label="input"
      />
      <PSelect :options="[1,2,3,4,5]" />
    </PTab>
  </PTabs>
</template>

<script setup lang="ts">
import ShareDocsModal from '@/components/Organism/ShareDocsModal/ShareDocsModalIndex.vue'
import NewUserForm from '@/components/Organism/RegisterUserModal/index.vue'
</script>

<style scoped>

</style>
