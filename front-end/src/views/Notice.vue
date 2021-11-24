<template>
    <div class="container">
        <div class="header">
            <h1>Current Notices</h1>
            <button class="create-btn" @click="showModal" v-if="isNotClient">Create New Notice</button>
        </div>
        <div v-if="isModalVisible">
            <NoticeForm @close="closeModal"></NoticeForm>
        </div>
        <div class="notices-content">
            <div>
                <h2>Notices Created</h2>

            </div>
            <div>
                <h2>Notices Posted</h2>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../store/store'
import NoticeForm from '../components/NoticeForm.vue'

export default {
  name: 'Notice',
  components: {
      NoticeForm
  },
  data(){
    return {
        isModalVisible: false,
        noticesPosted: [],
        noticesCreated: [],
        isNotClient: store.getters.position !== "Client"
    }
  },
  mounted(){

  },

  methods: {
    showModal() {
        this.isModalVisible = true;
    },
    closeModal() {
        this.isModalVisible = false;
        this.setAssets()
    },
  }
}
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