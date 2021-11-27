<template>
    <div class="container">
        <div class="header">
            <h1>Current Meeting Alerts</h1>
            <button class="create-btn" @click="showModal" v-if="isNotClient">Create Meeting Alert</button>
        </div>
        <div v-if="isModalVisible">
            <MeetingForm @close="closeModal"></MeetingForm>
        </div>
        <div class="notices-content">
            <div v-if="isCreator">
                <h2>Meetings Created</h2>
                <div v-if="meetingsCreated.length == 0" class="no-view">You have not created any new meeting alerts.</div>
                
            </div>
            <div>
                <h2>Meetings Posted</h2>
                <div v-if="meetingsPosted.length == 0" class="no-view">There are no meeting alerts for you at the moment.</div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../store/store'
import MeetingForm from '../components/MeetingForm.vue'

export default {
  name: 'Notice',
  components: {
      MeetingForm
  },
  data(){
    return {
        isModalVisible: false,
        meetingsPosted: [],
        meetingsCreated: [],
        isNotClient: store.getters.position !== "Client",
        isEditable: false,
        isCreator: store.getters.position == "Coach" || store.getters.position == "Chief Executive Officer",
        title: "General notice for meetings",
        information: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Praesentium quaerat sed ad delectus aspernatur earum excepturi placeat magnam veritatis recusandae!",
        senderName: "",
        position: store.getters.position,
        error: "",
        recipients: store.getters.members,
    }
  },
  mounted(){

  },

  methods: {
    handleCancel(){
        this.isEditable = false
    },
    handleEdit(){
        this.isEditable = true
    },
    showModal() {
        this.isModalVisible = true;
    },
    closeModal() {
        this.isModalVisible = false;
    },
  }
}
</script>

<style scoped>
.container{
     padding: 10px 30px;
}

h2{
    color: #865cff;
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

.buttons{
    display: flex;
    justify-content: flex-end;
    margin: 10px;
}
.button{
    border: 1px solid #865cff;
    border-radius: 8px;
    height: 40px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 10px;
    background: #865cff;
    color: #ffffff;
}

button:disabled{
    background: #d5c7ff;
    border: 1px solid #d5c7ff;
}

#cancel{
    background: none;
    color: #865cff;
}

.edit-btn{
    border: none;
    background: #ffffff;
    color: #865cff;
}


.notice-card{
    border: 1px solid rgba(0,0,0, 0.25);
    border-radius: 10px;
    margin: 10px 0;
}

input, textarea{
    display: block;
    width: 48rem;
    border: 1px solid #d5c7ff;
    border-radius: 8px;
    padding: 0 10px;
    font-family: Avenir, Helvetica, Arial, sans-serif;;
    font-size: 16px;
}

input{
    height: 40px;
}

label, .notice-title{
    font-weight: bold;
}

textarea{
    height: 100px;
    resize: none;
}

form div{
    margin: 10px;
}

input:read-only, textarea:read-only{
    border: none;
}

input:read-only{
    font-weight: bold;
    font-size: 18px;
}

textarea:read-only{
    height: 80px;
    width: 80%;
}
.notices-posted{
    padding: 5px 15px;
}
.notice-info{
    width: 48rem;
}
</style>