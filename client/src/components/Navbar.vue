<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" class="mb-3">
    <b-container>
      <b-navbar-brand to="/">
        Рефінансування підприємств
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item to="/">Головна</b-nav-item>
            <b-nav-item to="/calculator">Обчислення</b-nav-item>
            <b-nav-item to="/settings">Налаштування</b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style></style>
