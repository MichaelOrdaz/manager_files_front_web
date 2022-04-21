<template>
  <div class="message">
    <h1>Acceso Denegado</h1>
    <PButton
      class="cursor-pointer"
      @click="$router.push({name: 'Login'})"
    >
      Inicio
    </PButton>
  </div>
</template>

<script>

</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato');

$animationTime: 2s;

* {
    position: relative;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
}
h1 {
    margin: 40px 0 20px;
}
.message{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

</style>
