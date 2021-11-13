<template>
    <div>
        <!-- <Header msg=""/> -->
        <div class="container">
            <div class="login-form">
                <h1>Hello there, let's setup your account! </h1>
                <p>Please enter the relevant details to setup your account.</p>
                <form @submit.prevent="signupUser" method="post">
                    <div>
                        <label for="email">Name</label>
                        <input type="name" name="name" id="name" v-model="name"/>
                    </div>

                    <div>
                        <label for="positions">Position</label>
                        <select name="positions" id="positions" v-model="position">
                            <option disabled value="">Please select your job position</option>
                            <option v-for="option in positions" v-bind:value="option" v-bind:key="option">
                                {{option}}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" v-model="email"/>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" v-model="password">
                    </div>
                    <button type="submit" class="submit-btn">Sign up</button>
                </form>
            </div>
        </div>
    </div> 
</template>

<script>
import User from "../services/user.service";
export default {
    name: 'Signup',
    data: function() {
        return {
            name: "",
            position: "",
            email : "",
            password: "",
            positions: ["Data Analyst", "Content Creator", "Coach", "Web developer", "Chief Executive Officer", "Paid Media Specialist", "Content Marketer", "Client"]
        }
    
    },
    methods: {
        signupUser: function(){
            let user = {
                 name: this.name,
                 position: this.position,
                 email: this.email,
                 password: this.password,
            }
            User.signup(user)
            // this.name = ""
            // this.position = ""
            // this.email = ""
            // this.password = ""
        }
    }
}
</script>

<style scoped>
.container{
    width: 500px;
    height: 600px;
    border: 1px solid rgba(0,0,0, 0.25);
    border-radius: 10px;
    margin: 20px auto;
    text-align: center;
}

p{
    width: 400px;
    margin: 0 auto;
}

input, select{
    display: block;
    margin: 0 auto;
    width: 400px;
    height: 40px;
    border: 1px solid #d5c7ff;
    border-radius: 8px;
    padding: 0 10px;
}

select{
    width: 420px;
    height: 45px;
}

form div, .submit-btn{
    margin: 20px 0;
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
</style>