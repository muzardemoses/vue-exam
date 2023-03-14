<template>
  <div>
    <nav>
      <Header />
    </nav>
    <div
    class="home-main"
    >
      <router-view />
    </div>
    
  </div>
</template>

<script>
import Header from './components/Header.vue';
export default {
  
  name: 'App',
  components: {
    Header,
  },
}
</script>

<style>
div {
  font-family: "Inter", sans-serif;
}


</style>