<template>
  <div class="container">
    <div class="header">
        <h1>Current Assets</h1>
        <button class="create-btn" @click="showModal">Create New Asset Container</button>
    </div>
    <div v-if="isModalVisible">
        <AssetForm name="Raheem Wilson" :recipients="['hell', 'bell', 'fell', 'dell']" @close="closeModal"></AssetForm>
    </div>
  </div>

</template>

<script>
import AssetForm from "../components/AssetForm.vue"
export default {
  name: "Asset",
  components: {
    AssetForm
  },
  data(){
    return{
        isModalVisible: false
    }
  },
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
