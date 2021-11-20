// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

import { createStore } from 'vuex'

const store = new createStore({
  state: {
    userInfo: "",
    recipients: ""

  },
  getters: {
      userName: state => state.userInfo.user.name,
      userInfo: state => state.userInfo,
      members: state => state.userInfo.members,
      token: state => state.userInfo.token
  },
  mutations: {
    updateUserInfo(state, payload){
        state.userInfo = payload.userInfo;
    }
  },
})
export default store;