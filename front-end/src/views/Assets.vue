<template>
  <div class="container">
    <div class="header">
        <h1>Current Assets</h1>
        <button class="create-btn" @click="showModal" v-if="isNotClient">Create New Asset Container</button>
    </div>
    <div v-if="isModalVisible">
        <AssetForm @close="closeModal"></AssetForm>
    </div>
    <div v-if="isNotClient">
      <h2>Assets Sent</h2>
      <table>
        <thead>
          <tr class="table-heading">
            <td>Title</td>
            <td>Recipients</td>
            <td>Status</td>
            <td>Reviewed By</td>
            <td class="view">Action</td>
          </tr>
        </thead>
        <tbody v-for="asset in assetsSent" :key="asset">
          <tr>
            <td>{{ asset.title }}</td>
            <td>
              <ul v-for="recipient in asset.recipients" :key="recipient">
                <li>{{ recipient.name }}</li>
              </ul>
            </td>
            <td class="view">
              <span :class="(asset.status).replace(/(^|\s)\S/g, letter => letter.toUpperCase())">{{ (asset.status).replace(/(^|\s)\S/g, letter => letter.toUpperCase()) }}</span>
            </td>
            <td>{{ asset.reviewBy }}</td>
            <td class="view">
              <router-link :to="`/dashboard/assets/asset/${asset._id}`" class="view-btn">View</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="assetsSent.length == 0" class="no-view">You have not created any asset as yet.</div>
    </div>
    <div>
      <h2>Assets Recieved</h2>
      <table>
        <thead>
          <tr class="table-heading">
            <td>Title</td>
            <td>Sender</td>
            <td>Status</td>
            <td>Reviewed By</td>
            <td class="view">Action</td>
          </tr>
        </thead>
        <tbody v-for="asset in assetsRecieved" :key="asset">
          <tr>
            <td>{{ asset.title }}</td>
            <td>
              {{ asset.sender.name }}
            </td>
            <td class="view">
              <span :class="(asset.history[asset.history.length - 1].status).replace(/(^|\s)\S/g, letter => letter.toUpperCase())">{{ (asset.history[asset.history.length - 1].status).replace(/(^|\s)\S/g, letter => letter.toUpperCase()) }}</span>
            </td>
            <td>{{ asset.reviewBy }}</td>
            <td class="view">
              <router-link :to="`/dashboard/assets/asset/${asset._id}`" class="view-btn">View</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="assetsRecieved.length == 0" class="no-view">There are no assets for you to view at the moment.</div>
    </div>
  </div>

</template>

<script>
import AssetForm from "../components/AssetForm.vue"
import store from '../store/store'
import Asset from '../services/asset.service'

export default {
  name: "Assets",
  components: {
    AssetForm
  },
  data(){
    return{
        name: store.getters.userName, 
        isModalVisible: false,
        assetsSent: {},
        assetsRecieved: {},
        isNotClient: store.getters.position !== "Client"
    }
  },
  beforeMount(){
    Asset.getAssets(store.getters.token)
        .then(res => {
            if(res === "Failed to fetch"){
            console.log("failed") //Fix
          } else {
            console.log(res)
            this.assetsSent = res.sent
            this.assetsRecieved = res.recieved
            
          }
        })
  },
  
  methods: {
    showModal() {
        this.isModalVisible = true;
    },
    closeModal() {
        this.isModalVisible = false;
        this.setAssets()
    },
    setAssets(){
      Asset.getAssets(store.getters.token)
        .then(res => {
            if(res === "Failed to fetch"){
            console.log("failed")
          } else {
            this.assetsSent = res.sent
            this.assetsRecieved = res.recieved
          }
        })
    }
  }
};
</script>

<style scoped>
.container{
     padding: 10px;
}
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.create-btn{
    height: 45px;
    color: #ffffff;
    background-color: #865cff;
    text-align: center;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    padding: 10px;
}

.create-btn:hover{
  background-color: #581eff;
  color: #ffffff;
  border: 1px solid #581eff;
}

table{
  /* border-collapse: collapse; */
  border-spacing: 0;
  border: 0.1px solid rgba(0,0,0, 0.25);
  border-radius: 10px;
}

.table-heading td{
  width: 230px;
  height: 40px;
  font-weight: bold;
  padding-left: 10px;

}

td{
  border: 0.1px solid rgba(0,0,0, 0.25);
  height: 100%;
  padding: 0px 10px;
}

.view{
  text-align: center;
}

.view-btn{
  border: 1px solid #865cff;
  background: #865cff;
  color: #ffffff;
  border-radius: 8px;
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
}

a{
  text-decoration: none;
}

td ul{
  list-style: none;
  padding: 0;
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
