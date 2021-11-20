<template>
    <div>
        <div class="container">
            <div class="login-form">
                <h1>Welcome!</h1>
                <p>Please enter your login details to gain access to IPP's system.</p>
                <form @submit.prevent="loginUser" method="post">
                    <div>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" v-model="email"/>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" v-model="password">
                    </div>
                    <button type="submit" class="submit-btn">Login</button>
                </form>
            </div>
            <div v-if="error" class="error">Invalid login information</div>
        </div>
    </div> 
</template>

<script>
import Login  from "../services/user.service.js";
import store from '../store/store'

export default {
  name: 'Login',
  data: function() {
      return {
        email : "",
        password: "",
        error: false
      }
    
  },
  methods: {
    loginUser: function(){
        let email = this.email
        let password = this.password
        Login.login({email, password})
            .then(res => {
                console.log(res)
                if(res === "Invalid login"){
                    this.error = true
                    this.email = ""
                    this.password = ""
                } else {
                    store.commit('updateUserInfo', { userInfo: res })
                    this.$router.push("/dashboard")
                }
            })
        
        // if(res["message"]){
        //     this.error = true
            
        // }else{
        //     this.$router.push("/dashboard")
        // }
        
    }
  }

}
</script>

<style scoped>
.container{
    width: 500px;
    height: 500px;
    border: 1px solid rgba(0,0,0, 0.25);
    border-radius: 10px;
    margin: 5% auto;
    text-align: center;
}

p{
    width: 400px;
    margin: 0 auto;
}

input{
    display: block;
    margin: 0 auto;
    width: 400px;
    height: 40px;
    border: 1px solid #d5c7ff;
    border-radius: 8px;
}

form div, .submit-btn{
    margin: 30px 0;
    text-align: left;
}

form label{
   margin-left: 50px ;
}

.submit-btn{
    height: 45px;
    color: #ffffff;
    background-color: #865cff;
    width: 400px;
    text-align: center;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

.submit-btn:hover{
  background-color: #581eff;
  color: #ffffff;
  border: 1px solid #581eff;
}

.error{
    color: #ff0033;
}
</style>