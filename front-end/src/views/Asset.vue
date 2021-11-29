<template>
<div class="asset">
    <h2>{{ title }}</h2>
    <div class="asset-container">
        <div class="asset-content"> 
            <form id="create-issue-form" method="post" @submit.prevent="handleSubmit">
                <div>
                    <label for="title">Title</label>
                    <input type="text" name="title" id="title" v-model="title" required :readonly="!isEditable"/>
                </div>
                <div>
                    <label for="description">Description</label>
                    <textarea name="description" id="description" cols="30" rows="10" v-model="description" :readonly="!isEditable" required></textarea>
                </div>
                <div v-if="!isEditable">
                    <label for="sender">Sender</label>
                    <input type="text" name="sender" id="sender" v-model="senderName" readonly/>
                </div>
                <div>
                <label for="reviewDate">Reviewed by</label>
                    <input type="date" name="reviewDate" id="reviewDate" v-model="reviewDate" required :readonly="!isEditable" />
                </div>
                <div>
                    <label for="status">Asset Status</label>
                    <select name="status" id="status" v-model="status" required v-if="changeStatus || isEditable">
                        <option v-for="option in options" v-bind:value="option" v-bind:key="option" :selected="option === status">
                            {{option}}
                        </option>
                    </select>
                    <div v-if="!isEditable && !changeStatus" :class="status">{{ status }}</div>
                </div>
                <div>
                    <label for="recipient">Recipient(s)</label>
                    <select name="positions" id="positions" v-model="receiverNames" multiple="true" required v-if="isEditable">
                        <option v-for="option in recipients" v-bind:value="option.name" v-bind:key="option">
                            {{option.name}}
                        </option>
                    </select>
                    <div class="names">
                        <div v-for="name in receiverNames" :key="name" class="name">
                            {{ name }}
                        </div>
                    </div>
                </div>
                <div>
                    <label for="file">Link to File</label>
                    <input name="link"  type="url" v-model="link" :readonly="!isEditable"/>
                </div>
                <div>
                    <label for="file">File Uploaded</label>
                    <input name="file" class="custom-file-input" id="file" type="file" @change="handleFileUpload( $event )" v-if="isEditable"/>
                </div>
                <div class="buttons">
                    <div v-if="!(isEditable || changeStatus)" class="buttons">
                        <button @click="handleChange" id="change-status">Change Asset Status</button>
                        <button @click="handleEdit" id="edit-btn" v-if="isSender">Edit Information</button>
                    </div>
                    <div v-if="isEditable || changeStatus" class="buttons">
                        <button @click="handleCancel" id="cancel">Cancel</button>
                        <button type="submit" class="change-btn" :disabled="(file === '' && link === '')">Confirm Changes</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="feedback">
            <div v-for="feedback in assetFeedbacks" :key="feedback._id">
                <div>
                    <p>{{ feedback.message }}</p>
                    <p>{{ feedback.postedBy.name }}</p>
                    <button>Reply</button>
                </div>
                <ul>
                    <li v-for="reply in feedback.replies" :key="reply.postedBy">
                        <p>{{ reply.message }}</p>
                        <p>{{ reply.postedBy.name }}</p>
                    </li>
                    <li>
                        <form id="create-feedback-form" method="post" @submit.prevent="handleFeedbackReply">
                            <div>
                                <textarea name="feedback" id="feedbacktxt" cols="30" rows="10" v-model="feedbackReply" required></textarea>
                            </div>
                            <button id="post">Reply</button>
                        </form>
                    </li>
                </ul>
            </div>
             <form id="create-feedback-form" method="post" @submit.prevent="handleFeedback">
                <div>
                    <textarea name="feedback" id="feedback" cols="30" rows="10" v-model="feedback" required></textarea>
                </div>
                <button id="post">Post</button>
             </form>
        </div>
    </div>
</div>
</template>

<script>
import store from '../store/store'
import AssetService from '../services/asset.service'


export default {
  name: 'Asset',
  data(){
      return {
        feedback: "",
        changeStatus: false,
        isEditable: false,
        isSender: true,
        title: "",
        description: "",
        senderName: "",
        position: store.getters.position,
        status: "",
        file: "",
        type: "",
        link: "http",
        reviewDate: "",
        receivers: [],
        receiverNames: [],
        error: "",
        options: ["Submitted", "Pending", "Approved", "Completed"],
        recipients: store.getters.members,
        assetID: this.$route.params.id,
        assetFeedbacks: []
      }
  },
  beforeMount(){
    AssetService.getAsset(store.getters.token, this.assetID)
        .then(res => {
            this.title = res.title
            this.description = res.description
            this.status = Asset.capitaliseFirstLetter(res.status)
            this.link = res.assetLink
            this.isSender = store.getters.userInfo.user._id === res.sender
            this.reviewDate = res.reviewBy
            this.recipients.forEach(recipient => {
                if(res.recipients.includes(recipient._id)){
                    this.receiverNames.push(recipient.name)
                }

                if(recipient._id === res.sender){
                    this.senderName = recipient.name
                }
            });

        })

    AssetService.getFeedbacks(store.getters.token)
    .then(res => {
        console.log(res)
    })
    
  },
  methods: {
    handleSubmit(){
        let confirm = window.confirm("Do you want to make these changes?")
        if(confirm){
            this.recipients.forEach(recipient => {
                if(this.receiverNames.includes(recipient.name)){
                    this.receivers.push(recipient._id)
                }
            });
            console.log(this.recipients)
            let asset = {
                status: this.status,
                fileData: this.file,
                type: this.type,
                title: this.title,
                description: this.description,
                sender: this.senderName,
                reviewBy: this.reviewDate,
                assetLink: this.link,
                recipients: [...this.receivers]
            }

            AssetService.uploadChanges(store.getters.token, this.assetID, asset)
                .then(res => {
                    alert(res === "Failed to update" ? 
                        "Asset failed to update. Try Again." :
                        "Asset was succesfully updated!"
                    )
                    this.isEditable = false
                    this.changeStatus = false
                })
        }

       
        
    },
    handleEdit(){
        this.isEditable = true
    },

    handleCancel(){
        this.isEditable = false
        this.changeStatus = false
        this.revertChanges()
    },

    handleChange(){
        this.changeStatus = true
    },

    revertChanges(){
        AssetService.getAsset(store.getters.token, this.assetID)
        .then(res => {
            this.title = res.title
            this.description = res.description
            this.status = Asset.capitaliseFirstLetter(res.status)
            this.initalStatus = this.status
            this.link = res.assetLink
            this.receivers = []
            this.receiverNames = []
            this.reviewDate = res.reviewBy
            this.isSender = store.getters.userInfo.user._id === res.sender
            this.recipients.forEach(recipient => {
                if(res.recipients.includes(recipient._id)){
                    this.receiverNames.push(recipient.name)
                }

                if(recipient._id === res.sender){
                    this.senderName = recipient.name
                }
            });

        })
    },
    
    handlefeedback(){
       let feedback = { message: this.feedback, assetId:this.assetID };

    }

  }
}

</script>

<style scoped>
h2{
    font-weight: bolder;
    margin-bottom: 0px;
    color: #865cff;
}

label{
    font-weight: 500;
}

input:read-only, textarea:read-only{
    display: flex;
    font-size: 16px;
    border: none;
    color: #865cff;
    font-weight: bold;
    padding: 0;
}

textarea:read-only{
    margin-top: 5px;
    height: 50px;
}

#create-feedback-form{
     border: 1px solid rgba(0, 0,0, 0.25);
     border-radius: 10px;
     padding: 5px 10px;
}

input, select, textarea{
    display: block;
    width: 95%;
    height: 40px;
    border: 1px solid #d5c7ff;
    border-radius: 8px;
    padding: 0 10px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

.asset-content{
    border-right: 1px solid rgba(0, 0,0, 0.25);
}

.feedback{
    padding: 10px;
}

textarea{
    height: 70px;
    resize: none;
    font-size: 14px;
}

form div{
    margin: 15px 0;
}

.file-input{
    margin-bottom: 0;
}

.asset-container{
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.buttons{
    display: flex;
    justify-content: flex-end;
    margin-top: -6px;
    margin-right: 10px;
}

.buttons button, #post{
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

#post{
    text-align: right;
    margin-right: -20px;
}

button:disabled{
    background: #d5c7ff;
    border: 1px solid #d5c7ff;
}

#cancel, #change-status{
    background: none;
    color: #865cff;
}

.custom-file-input {
    border: none;
    padding-top: 10px;

}

select[multiple] {
    padding-top: 5px ;
    height: 4rem;
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