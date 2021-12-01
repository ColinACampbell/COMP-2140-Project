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
      return this.$route.name === "Login" || this.$route.name === "Signup"
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
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.no-view{
  height: 40px;
  width: 400px;
  background: #d5c7ff;
  border-radius: 8px;
  color: #581eff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
}

</style>
