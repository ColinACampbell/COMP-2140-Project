<template>
    <div class="container">
        <div class="header">
            <h1>Current Notices</h1>
            <button class="create-btn" @click="showModal" v-if="isNotClient && isCreator">Create New Notice</button>
        </div>
        <div v-if="isModalVisible">
            <NoticeForm @close="closeModal"></NoticeForm>
        </div>
        <div class="notices-content">
            <div>
                <h2>Notices Posted</h2>
                <div v-if="noticesPosted.length == 0" class="no-view">There are no notices for you to view at the moment.</div>
                <div class="notice-card notices-posted" v-for="notice in noticesPosted" :key="notice._id">
                    <h3 class="notice-title">{{ notice.title }}</h3>
                    <p class="notice-info">
                        {{ notice.message }}
                    </p>
                    <p class="notice-creator">Creator: <span>{{ notice.sender.name }}</span></p>
                    <p class="date-created">Date Posted: <span>{{ notice.time }}</span></p>
                </div>

            </div>
            <div v-if="isCreator">
                <h2>Notices Created</h2>
                <div v-if="noticesCreated.length == 0" class="no-view">You have not created any new notices.</div>
                <div class="notice-card" v-for="notice in noticesCreated" :key="notice._id">
                    <form id="notice-form" method="post" @submit.prevent="handleSubmit(notice._id)">
                        <div>
                            <label for="title" v-if="notice._id === noticeSelected">Title  <span v-if="error">--{{error}}--</span></label>
                            <input type="text" name="title" id="title" v-model="notice.title" required :readonly="!(notice._id === noticeSelected)"/>
                        </div>
                        <div>
                            <label for="information" v-if="notice._id === noticeSelected">Information</label>
                            <textarea name="information" id="information" cols="30" rows="10" v-model="notice.message" required :readonly="!(notice._id === noticeSelected)"></textarea>
                        </div>
                        <div class="buttons">
                            <div v-if="!(notice._id === noticeSelected)">
                                <button @click="handleEdit(notice._id)" class="edit-btn">Edit Notice</button>
                            </div>
                            <div v-if="notice._id === noticeSelected" class="buttons">
                                <button @click="handleCancel" id="cancel" class="button">Cancel</button>
                                <button type="submit" class="change-btn button">Confirm Changes</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../store/store'
import NoticeForm from '../components/NoticeForm.vue'
import NoticeService from '../services/notice.service'

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
        isCreator: store.getters.position == "Coach" || store.getters.position == "Chief Executive Officer",
        senderName: "",
        position: store.getters.position,
        error: "",
        userID: store.getters.userInfo.user._id,
        noticeSelected: "",
        recipients: store.getters.members,
    }
  },
  beforeMount(){
    NoticeService.getNotices(store.getters.token)
    .then(res => {
        res.forEach(notice => {
            let date = new Date(+notice.time)
            notice.time = date.toDateString()
            if(notice.sender._id === this.userID){
                this.noticesCreated.push(notice)
            }else{
                this.noticesPosted.push(notice)
            }
        });
    })
  },

  methods: {
    handleCancel(){
        this.isEditable = false
        this.noticeSelected = ""
        this.setNotices()
    },
    handleEdit(id){
        this.isEditable = true
        this.noticeSelected = id
        this.setNotices()
    },
    showModal() {
        this.isModalVisible = true;
    },
    closeModal() {
        this.isModalVisible = false;
        this.setNotices()
    },
    handleSubmit(id){
        let confirm = window.confirm("Do you want to make these changes?")
        if(confirm){
            var newnotice = {title: "", message: ""}
            this.noticesCreated.forEach(notice => {
                if(notice._id === id){
                    newnotice.title = notice.title
                    newnotice.message = notice.message
                }
            })

            NoticeService.uploadNoticeChanges(store.getters.token, id, newnotice)
                .then(res => {
                    if(res === "Title duplication"){
                        this.error = "Title already exists in the system."
                    } else {
                        alert(res === "Failed to update" ? 
                            "Notice failed to update. Try Again." :
                            "Notice was succesfully updated!"
                        )
                        this.noticeSelected = ""
                    }

                    
                })
        }
    },
    setNotices(){
        this.noticesPosted = []
        this.noticesCreated = []
        NoticeService.getNotices(store.getters.token)
        .then(res => {
            res.forEach(notice => {
                let date = new Date(+notice.time)
                notice.time = date.toDateString()
                if(notice.sender._id === this.userID){
                    this.noticesCreated.push(notice)
                }else{
                    this.noticesPosted.push(notice)
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

.notice-creator, .date-created{
    margin: 10px 0;
    font-weight: bold;
}

p span{
    font-weight: 100;
}


</style>