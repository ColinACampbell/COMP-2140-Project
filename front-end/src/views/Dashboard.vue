<template>
    <div class="dashboard">
        <aside class="side-nav">
            <div>
                <img id="logo" src="../assets/ipp-white.png" alt="IPP Logo"/>
            </div>
            <div class="greetings">Hello, {{ name }}</div>
            <ul class="nav-list">
                <li class="nav-item" :class="current === 'Home' ? 'active' : ''">
                    <router-link to="/dashboard" @click="current = 'Home'">
                        <img src="../assets/home.svg" alt="Home icon">
                        <span>Home</span>
                    </router-link>
                </li>
                <li class="nav-item" :class="current === 'Asset' ? 'active' : ''">
                    <router-link to="/dashboard/assets" @click="current = 'Asset'">
                        <img src="../assets/asset.svg" alt="Asset Icon">
                         <span>Assets</span>
                    </router-link>
                </li>
                <li class="nav-item" :class="current === 'Notice' ? 'active' : ''">
                    <router-link to="/dashboard/notices" @click="current = 'Notice'">
                        <img src="../assets/notices.svg" alt="Notice icon">
                         <span>Notices</span>
                    </router-link>
                </li>
                <li class="nav-item" :class="current === 'Meeting' ? 'active' : ''">
                    <router-link to="/dashboard/meeting_alerts" @click="current = 'Meeting'" >
                        <img src="../assets/meeting.svg" alt="Meeting icon">
                         <span>Meeting Alerts</span>
                    </router-link>
                </li>
            </ul>
            <div class="logout">
                <img src="../assets/logout.svg" alt="Logout icon">
                Logout
            </div>
        </aside>
        <div class="content">
            <router-view>
            </router-view>
        </div>
    </div> 
</template>

<script>
import store from '../store/store'
export default {
  name: 'Dashboard',

  data(){
    return {
        current: this.$route.name,
        name: store.getters.userName
    }
  }
}
</script>

<style scoped>

.dashboard{
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 20px;
    height: 100vh;
}
.side-nav{
  background: #865cff;
  width: 250px;
  height: 100vh;
  color: #fff;
}

.content{
    overflow-y: scroll;
}

#logo{
    padding: 30px;
    height: 50px;
}

a{
    text-decoration: none;
    color: #fff;
}

.nav-list{
    margin-top: 100px;
    padding: 0;
}

.nav-item{
    margin: 10px 0;
    list-style: none;
    width: 250px;
    height: 50px;
    padding: 0 30px;
    display: flex;
    align-items: center;
}

.nav-item img, .logout img{
    filter: brightness(0) invert(1);
}

.active{
    background: #ffffff;
}

.active a{
    color: #000;
}

.active img{
    filter: none;
}

.nav-item a, .logout{
    display: grid;
    grid-template-columns: 40px 150px;
}

.logout{
    padding: 30px;
    margin-top: 200px;
}

.greetings{
    color: #fff;
    font-weight: bolder;
    padding-left: 30px ;
}

</style>