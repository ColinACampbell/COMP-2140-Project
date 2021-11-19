<template>
  <header class="header">
      <nav class="navbar">
          <div class="container">
            <a href="#" class="navbar-brand">
              <img src="../assets/ipp-logo.png" alt="IPP Logo"/>
            </a>
              <div class="navbar-nav">
                  <ul class="navbar-nav">
                      <li class="nav-item">
                        <router-link to="/" class="nav-link">Login</router-link>
                      </li>
                      <li class="nav-item" id="sign-up">
                        <router-link to="/signup" class="nav-link">Sign up</router-link>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
  </header> 
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
.header{
  padding: 10px 20px;
}
.container{
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
}
.navbar-nav{
  display: inline-flex;
  justify-content: space-evenly;
  height: 50px;
  margin: 0;
}
.nav-item{
  list-style: none;
  border: 1px solid #865cff;
  border-radius: 8px;
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.nav-link{
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-item:hover{
  background-color: #581eff;
  color: #ffffff;
  border: 1px solid #581eff;
}
.nav-item:hover  a{
  color: #ffffff;
}

#sign-up{
  background-color: #865cff;
}

#sign-up:hover{
  background: #581eff;
}

#sign-up a{
  color: #ffffff;
}

a{
  text-decoration: none;
  color: #581eff;
}

img{
  height: 40px;
}
</style>
