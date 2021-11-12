<template>

  <div>
    <Header msg="" />
    <Signup />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Signup from "./pages/Signup.vue"
export default {
  name: "App",
  components: {
    Header,
    Signup
  },
};
</script>

<style>
html{
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
