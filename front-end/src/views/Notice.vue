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
            <div v-if="isCreator">
                <h2>Notices Created</h2>
                <div class="notice-card">
                    <form id="notice-form" method="post" @submit.prevent="handleSubmit">
                        <div>
                            <label for="title" v-if="isEditable">Title  <span v-if="error">--{{error}}--</span></label>
                            <input type="text" name="title" id="title" v-model="title" required :readonly="!isEditable"/>
                        </div>
                        <div>
                            <label for="information" v-if="isEditable">Information</label>
                            <textarea name="information" id="information" cols="30" rows="10" v-model="information" required :readonly="!isEditable"></textarea>
                        </div>
                        <div class="buttons">
                            <div v-if="!isEditable">
                                <button @click="handleEdit" class="edit-btn">Edit Notice</button>
                            </div>
                            <div v-if="isEditable" class="buttons">
                                <button @click="handleCancel" id="cancel" class="button">Cancel</button>
                                <button type="submit" class="change-btn button">Confirm Changes</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="notice-card">
                    <form id="notice-form" method="post" @submit.prevent="handleSubmit">
                        <div>
                            <label for="title" v-if="isEditable">Title  <span v-if="error">--{{error}}--</span></label>
                            <input type="text" name="title" id="title" v-model="title" required :readonly="!isEditable"/>
                        </div>
                        <div>
                            <label for="information" v-if="isEditable">Information</label>
                            <textarea name="information" id="information" cols="30" rows="10" v-model="information" required :readonly="!isEditable"></textarea>
                        </div>
                        <div class="buttons">
                            <div v-if="!isEditable">
                                <button @click="handleEdit" class="edit-btn">Edit Notice</button>
                            </div>
                            <div v-if="isEditable" class="buttons">
                                <button @click="handleCancel" id="cancel" class="button">Cancel</button>
                                <button type="submit" class="change-btn button">Confirm Changes</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="notice-card">
                    <form id="notice-form" method="post" @submit.prevent="handleSubmit">
                        <div>
                            <label for="title" v-if="isEditable">Title  <span v-if="error">--{{error}}--</span></label>
                            <input type="text" name="title" id="title" v-model="title" required :readonly="!isEditable"/>
                        </div>
                        <div>
                            <label for="information" v-if="isEditable">Information</label>
                            <textarea name="information" id="information" cols="30" rows="10" v-model="information" required :readonly="!isEditable"></textarea>
                        </div>
                        <div class="buttons">
                            <div v-if="!isEditable">
                                <button @click="handleEdit" class="edit-btn">Edit Notice</button>
                            </div>
                            <div v-if="isEditable" class="buttons">
                                <button @click="handleCancel" id="cancel" class="button">Cancel</button>
                                <button type="submit" class="change-btn button">Confirm Changes</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
            <div>
                <h2>Notices Posted</h2>
                <div class="notice-card notices-posted">
                    <h3 class="notice-title">New Notice Is Created</h3>
                    <p class="notice-info">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Praesentium quaerat sed ad delectus aspernatur earum excepturi placeat magnam veritatis recusandae!
                    </p>
                    <p class="notice-creator"></p>
                    <p class="date-created"></p>
                </div>
                <div class="notice-card notices-posted">
                    <h3 class="notice-title">New Notice Is Created</h3>
                    <p class="notice-info">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Praesentium quaerat sed ad delectus aspernatur earum excepturi placeat magnam veritatis recusandae!
                    </p>
                    <p class="notice-creator"></p>
                    <p class="date-created"></p>
                </div>
                <div class="notice-card notices-posted">
                    <h3 class="notice-title">New Notice Is Created</h3>
                    <p class="notice-info">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Praesentium quaerat sed ad delectus aspernatur earum excepturi placeat magnam veritatis recusandae!
                    </p>
                    <p class="notice-creator"></p>
                    <p class="date-created"></p>
                </div>
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
        isNotClient: store.getters.position !== "Client",
        isEditable: false,
        isCreator: true,
        title: "General notice for meetings",
        information: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Praesentium quaerat sed ad delectus aspernatur earum excepturi placeat magnam veritatis recusandae!",
        senderName: "",
        position: store.getters.position,
        error: "",
        options: ["Submitted", "Pending", "Approved", "Completed"],
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