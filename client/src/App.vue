<template>
  <div id="app">
    <div id="nav">
      <navbar />
    </div>
    <b-container>
      <router-view />
    </b-container>
    <footer class="footer">
      <div class="container text-center">
        <span class="text-muted">
          Copyright © 2019 developed by Pidfihrnyi Orest
        </span>
      </div>
    </footer>
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
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
</style>
