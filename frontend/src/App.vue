<template>
  <oGenerateBoxVue/>
</template>

<script>
import oGenerateBoxVue from './components/organisms/o-generate-box.vue';

export default {
  name: 'App',
  components: {
    oGenerateBoxVue
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #191716;
}
</style>
