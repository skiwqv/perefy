<template>
  <div id="app">
  </div>
  <sidebarNavVue></sidebarNavVue>
  <router-view/>
</template>

<script setup>
import sidebarNavVue from "./components/links/sidebar-nav.vue";
</script>

<style>
body {
  background-color: #301B3F;
}

</style>
