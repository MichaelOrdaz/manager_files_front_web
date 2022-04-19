<template>
  <div class="files-breadcrumb p-pl-42">
    <q-breadcrumbs
      class="text-black"
      active-color="purple"
    >
      <template #separator>
        <PIcon
          size="pmd"
          iconName="chevron_right"
          color="grey-1"
        />
      </template>
      <q-breadcrumbs-el
        class="cursor-pointer"
        label="Home"
      />
      <q-breadcrumbs-el
        class="cursor-pointer"
        label="Components"
      />
      <q-breadcrumbs-el
        class="cursor-pointer"
        label="Breadcrumbs"
      />
    </q-breadcrumbs>
  </div>
</template>
<script>

</script>
<style scoped lang="scss">
.p-pl-42 {
    padding-left: 42px
}
</style>
