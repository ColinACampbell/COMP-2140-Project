<template>
<div class="modal">
    <div class="modal-content"> 
        <h2>Create Meeting Alert</h2>
        <span v-if="error">--{{error}}--</span>
        <form id="create-form" method="post" @submit.prevent="handleSubmit">
            <div>
                <label for="title">Title</label>
                <input type="text" name="title" id="title" v-model="title" required/>
            </div>
            <div>
                <label for="dateTime">Meeting Date and Time</label>
                <input type="datetime-local" name="dateTime" id="dateTime" v-model="dateTime" required>
            </div>
            <div>
                <label for="file">Link to Meeting</label>
                <input name="link"  type="url" v-model="link"/>
            </div>
            <div>
                <label for="recipient">Recipient(s)</label>
                <select name="positions" id="positions" v-model="receiverNames" multiple="true" required>
                    <option v-for="option in recipients" v-bind:value="option.name" v-bind:key="option.email">
                        {{option.name}}
                    </option>
                </select>
                <div class="names">
                    <div v-for="name in receiverNames" :key="name" class="name">
                        {{ name }}
                    </div>
                </div>
            </div>
            <div class="buttons">
                <button @click="close" id="cancel">Cancel</button>
                <button type="submit" class="create-btn">Create</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import FormService from "../services/form.service"
import store from '../store/store'

export default {
  name: 'MeetingForm',
  data(){
    return {
        title: "",
        senderName: store.getters.userName,
        link: "",
        dateTime: "",
        recipients: store.getters.members,
        userID: store.getters.userInfo.user._id,
        receivers: [],
        receiverNames: [],
        error: "",
    } 
  },
  methods:{
    close() {
        this.$emit('close');
    },
    handleSubmit(){
        this.recipients.forEach(recipient => {
            if(this.receiverNames.includes(recipient.name)){
                this.receivers.push(recipient._id)
            }
        });
        let meeting = {
            title: this.title,
            date: this.dateTime,
            meetingLink: this.link,
            attendees: this.receivers,
            sender: this.userID
        }
        FormService.processMeetingAlert(meeting, store.getters.token)
            .then(res => {
                if(res === "Successful"){
                    this.close()
                    alert("Meeting Alert Created Successfully!")
                }else{
                    this.error = "There is an error in creating the meeting alert."
                }
            })
        
    }
}
}
</script>

<style scoped>
span{
    color: red;
}
.modal {
  position: fixed; 
  z-index: 1; 
  padding-top: 80px; 
  left: 0;
  top: 0;
  width: 100vw; 
  height: 100vh; 
  overflow: auto; 
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
  padding: 20px 30px;
}

input, select, textarea{
    display: block;
    width: 95%;
    height: 40px;
    border: 1px solid #d5c7ff;
    border-radius: 8px;
    padding: 0 10px;
}

textarea{
    height: 70px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 14px;
}

form div{
    margin: 10px 0;
}

.file-input{
    margin-bottom: 0;
}

.buttons{
    display: flex;
    justify-content: flex-end;
    margin-top: 0px;
}

.buttons button{
    border: 1px solid #865cff;
    border-radius: 8px;
    width: 100px;
    height: 40px;
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

select[multiple] {
    padding-top: 5px ;
    height: 6rem;
}

.names{
   display: flex;
}

.name{
   height: 35px;
   border: 1px solid #d5c7ff;
   border-radius: 8px;
   background-color: #d5c7ff;
   color: #865cff;
   font-weight: bold;
   padding: 0 15px;
   margin: 0 5px;
   display: flex;
   align-items: center;
   justify-content: center;
}
</style>
