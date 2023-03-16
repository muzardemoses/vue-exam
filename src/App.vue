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
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
export default {
  
  name: 'App',
  components: {
    Header,
    Footer,
  },

  
}
</script>

<style>
div {
  font-family: "Inter", sans-serif;
}


</style>