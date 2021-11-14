<template>
  <div>
    <div v-if="isLogin">
      <Header/>
    </div>   
    <main>
      <router-view></router-view>
    </main>
  </div>

</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },

  computed: {
    isLogin(){
      return this.$route.name == "Login" || this.$route.name == "Signup"
    }
  }
};
</script>

<style>
html{
  height: 100%;
}

body{
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
