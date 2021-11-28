import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from "./store/store"
import VueGoogleCharts from 'vue-google-charts'
 

createApp(App).use(router).use(store).use(VueGoogleCharts).mount('#app')
