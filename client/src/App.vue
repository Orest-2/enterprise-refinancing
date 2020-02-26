<template>
  <div id="app">
    <div id="nav">
      <navbar />
    </div>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
</style>
