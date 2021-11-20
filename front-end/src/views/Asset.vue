<template>
  <div class="container">
    <div class="header">
        <h1>Current Assets</h1>
        <button class="create-btn" @click="showModal">Create New Asset Container</button>
    </div>
    <div v-if="isModalVisible">
        <AssetForm :name="name" :recipients="recipients" @close="closeModal"></AssetForm>
    </div>
  </div>

</template>

<script>
import AssetForm from "../components/AssetForm.vue"
import store from '../store/store'

export default {
  name: "Asset",
  components: {
    AssetForm
  },
  data(){
    return{
        name: store.getters.userName, 
        isModalVisible: false,
        recipients: store.getters.members
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   getPost(to.params.id, (err, post) => {
  //     next(vm => vm.setData(err, post))
  //   })
  // },
  
  // beforeRouteUpdate (to, from, next) {
  //   this.post = null
  //   getPost(to.params.id, (err, post) => {
  //     this.setData(err, post)
  //     next()
  //   })
  // },
  methods: {
    showModal() {
        this.isModalVisible = true;
    },
    closeModal() {
        this.isModalVisible = false;
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
</style>
