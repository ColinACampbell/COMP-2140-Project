<template>
    <div class="container">
        <div class="header">
            <h1>Current Meeting Alerts</h1>
            <button class="create-btn" @click="showModal" v-if="isNotClient">Create Meeting Alert</button>
        </div>
        <div v-if="isModalVisible">
            <MeetingForm @close="closeModal"></MeetingForm>
        </div>
        <div class="meeting-content">
            <div v-if="isCreator">
                <h2>Meetings Created</h2>
                <div v-if="alertsCreated.length == 0" class="no-view">You have not created any new meeting alerts.</div>
                <form action="post" v-for="alert in alertsCreated" :key="alert._id" @submit.prevent="handleSubmit(alert._id)">
                    <div class="input">
                        <label for="title">Title  <span v-if="error">--{{error}}--</span></label>
                        <input type="text" name="title" id="title" v-model="alert.title" required :readonly="!(alert._id === alertSelected)"/>
                    </div>
                    <div class="input">
                        <label for="dateTime">Meeting Date and Time</label>
                        <input type="datetime-local" name="dateTime" id="dateTime" v-model="alert.date" required :readonly="!(alert._id === alertSelected)">
                    </div>
                    <div class="input">
                        <label for="link">Link to Meeting</label>
                        <input name="link" id="link" type="url" v-model="alert.meetingLink" :readonly="!(alert._id === alertSelected)"/>
                    </div>
                    <div class="input">
                        <label for="recipient">Attendee(s)</label>
                        <select name="recipient" id="recipient" v-model="alert.attendees" multiple="true" required v-if="isEditable && alert._id === alertSelected">
                            <option v-for="option in recipients" v-bind:value="option" v-bind:key="option.name">
                                {{option.name}}
                            </option>
                        </select>
                        <div class="names">
                            <div v-for="attendee in alert.attendees" :key="attendee.name" class="name">
                                {{ attendee.name }}
                            </div>
                        </div>
                    </div>
                    <div class="buttons">
                        <div v-if="!(alert._id === alertSelected)">
                            <button @click="handleEdit(alert._id)" class="edit-btn">Edit Meeting Alert</button>
                        </div>
                        <div v-if="alert._id === alertSelected" class="buttons">
                            <button @click="handleCancel" id="cancel" class="button">Cancel</button>
                            <button type="submit" class="change-btn button">Confirm Changes</button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <h2>Meetings Posted</h2>
                <div v-if="alertsPosted.length == 0" class="no-view">There are no meeting alerts for you at the moment.</div>
                <div v-for="alert in alertsPosted" :key="alert._id" class="meeting">
                    <div>
                        <p class="label">Title</p>
                        <p>{{ alert.title }}</p>
                    </div>
                    <div>
                        <p class="label">Meeting Date and Time</p>
                        <p>{{ alert.date }}</p>
                    </div>
                    <div>
                        <p class="label">Link to Meeting</p>
                        <p>{{ alert.meetingLink }}</p>
                    </div>
                    <div>
                        <p class="label">Attendee (s)</p>
                        <div class="names attendees">
                            <p v-for="attendee in alert.attendees" :key="attendee.name" class="name attendee">
                                {{ attendee.name }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../store/store'
import MeetingForm from '../components/MeetingForm.vue'
import MeetingService from '../services/meeting.service'

export default {
  name: 'Notice',
  components: {
      MeetingForm
  },
  data(){
    return {
        isModalVisible: false,
        alertsPosted: [],
        alertsCreated: [],
        alertSelected: "",
        position: store.getters.position,
        isNotClient: store.getters.position !== "Client",
        isEditable: false,
        isCreator: store.getters.position == "Coach" || store.getters.position == "Chief Executive Officer",
        userName: store.getters.userName,
        userID: store.getters.userInfo.user._id,
        error: "",
        recipients: store.getters.members,
    }
  },
  beforeMount(){
    MeetingService.getMeetingAlerts(store.getters.token)
    .then(res => {
        res.forEach(alert => {
            console.log(alert)
            alert.attendeeNames = alert.attendees
            if(alert.sender._id === this.userID){
                this.alertsCreated.push(alert)
            }else{
                alert.attendees.forEach(attendee => {
                    if(attendee._id === this.userID){
                        this.alertsPosted.push(alert)
                    }
                })
                
            }
        });
    })
  },

  methods: {
    handleCancel(){
        this.isEditable = false
        this.alertSelected = ""
        this.setAlerts()
    },
    handleEdit(id){
        this.isEditable = true
        this.alertSelected = id
        this.setAlerts()
    },
    showModal() {
        this.isModalVisible = true;
    },
    closeModal() {
        this.isModalVisible = false;
        this.setAlerts()
    },
    handleSubmit(id){
        let confirm = window.confirm("Do you want to make these changes?")
        if(confirm){
            let newalert = {
                title: "",
                date: "",
                meetingLink: "",
                attendees: [],
                sender: this.userID
            }
            this.alertsCreated.forEach(alert => {
                if(alert._id === id){
                    newalert.title = alert.title
                    newalert.meetingLink = alert.meetingLink
                    newalert.date = alert.date
                    alert.attendees.forEach(recipient => {
                        newalert.attendees.push(recipient._id)
                    })
                }
            })
            MeetingService.uploadAlertChanges(store.getters.token, id, newalert)
                .then(res => {
                    alert(res === "Failed to update" ? 
                        "Meeting Alert failed to update. Try Again." :
                        "Meeting Alert was succesfully updated!"
                    )
                    this.alertSelected = ""
                })
        }
    },
    setAlerts(){
        this.alertsPosted = []
        this.alertsCreated = []
        MeetingService.getMeetingAlerts(store.getters.token)
            .then(res => {
                res.forEach(alert => {
                    if(alert.sender._id === this.userID){
                        this.alertsCreated.push(alert)
                    }else{
                        this.alertsPosted.push(alert)
                    }
                });
            })
    }
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

.input, .meeting div{
    display: grid;
    grid-template-columns: 250px 1fr;
    align-items: center;
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

input, select{
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

label{
    font-weight: bold;
}

form, .meeting{
    border: 1px solid rgba(0,0,0, 0.25);
    border-radius: 10px;
    padding: 10px;
    margin: 5px;
}

form div{
    margin: 10px;
}

input:read-only{
    border: none;
}

input:read-only{
    font-size: 18px;
}

.names{
   display: flex;
   grid-area: 2 / 2;
}

.attendees{
    grid-area: 1 / 2;
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
p{
    margin: 10px 0;
}
.attendee{
    width: 150px;
}

.label{
    font-weight: bold;
}
</style>