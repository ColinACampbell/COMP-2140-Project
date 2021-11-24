<template>
<div class="asset">
    <h2>{{ updatedAssetInfo.title }}</h2>
    <div class="asset-container">
        <div class="asset-content"> 
            <form id="create-issue-form" method="post" @submit.prevent="handleSubmit">
                <div>
                    <label for="title">Title</label>
                    <input type="text" name="title" id="title" v-model="updatedAssetInfo.title" required :readonly="!isEditable"/>
                </div>
                <div>
                    <label for="description">Description</label>
                    <textarea name="description" id="description" cols="30" rows="10" v-model="updatedAssetInfo.description" :readonly="!isEditable" required></textarea>
                </div>
                <div>
                    <label for="sender">Sender</label>
                    <input type="text" name="sender" id="sender" v-model="senderName" readonly/>
                </div>
                <div>
                    <label for="status">Asset Status</label>
                    <select name="status" id="status" v-model="updatedAssetInfo.status" required v-if="changeStatus || isEditable">
                        <option v-for="option in options" v-bind:value="option" v-bind:key="option" :selected="option === updatedAssetInfo.status">
                            {{option}}
                        </option>
                    </select>
                    <div v-if="!isEditable && !changeStatus" :class="updatedAssetInfo.status">{{ updatedAssetInfo.status }}</div>
                </div>
                <div>
                    <label for="recipient">Recipient(s)</label>
                    <select name="positions" id="positions" v-model="updatedAssetInfo.receiverNames" multiple="true" required v-if="isEditable">
                        <option v-for="option in recipients" v-bind:value="option.name" v-bind:key="option">
                            {{option.name}}
                        </option>
                    </select>
                    <div class="names">
                        <div v-for="name in updatedAssetInfo.receiverNames" :key="name" class="name">
                            {{ name }}
                        </div>
                    </div>
                </div>
                <div>
                    <label for="file">Link to File</label>
                    <input name="link"  type="url" v-model="updatedAssetInfo.link" :readonly="!isEditable"/>
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
        <div class="feedback"></div>
    </div>
</div>
</template>

<script>
import store from '../store/store'
import Asset from '../services/asset.service'


export default {
  name: 'Asset',
  data(){
      return {
        changeStatus: false,
        isEditable: false,
        isSender: true,
        initialAssetInfo: {},
        updatedAssetInfo: {},
        senderName: "",
        position: store.getters.position,
        error: "",
        options: ["Submitted", "Pending", "Approved", "Completed"],
        recipients: store.getters.members,
        assetID: this.$route.params.id
      }
  },
  mounted(){
    Asset.getAsset(store.getters.token, this.assetID)
        .then(res => {
            console.log(res)
            this.initialAssetInfo = res

            let { assetLink, description, sender, status, fileData, title } = res
            this.updatedAssetInfo.status = Asset.capitaliseFirstLetter(status)
            this.updatedAssetInfo.file = fileData
            this.updatedAssetInfo.title = title
            this.updatedAssetInfo.description = description
            this.updatedAssetInfo.sender = sender
            this.updatedAssetInfo.link = assetLink
            this.initialAssetInfo.receivers = []
            this.initialAssetInfo.receiverNames = []
            this.updatedAssetInfo.recipient = []
            this.updatedAssetInfo.receiverNames = []
            this.isSender = store.getters.userInfo.user._id === res.sender
            
            this.recipients.forEach(recipient => {
                if(res.recipients.includes(recipient._id)){
                    this.initialAssetInfo.receivers.push(recipient._id)
                    this.initialAssetInfo.receiverNames.push(recipient.name)
                    this.updatedAssetInfo.recipient.push(recipient._id)
                    this.updatedAssetInfo.receiverNames.push(recipient.name)
                }

                if(recipient._id === res.sender){
                    this.senderName = recipient.name
                }
            });

        })
  },
  methods: {
    handleSubmit(){
        let confirm = window.confirm("Do you want to make these changes?")
        
        if(confirm){
            this.recipients.forEach(recipient => {
                if(this.updatedAssetInfo.receiverNames.includes(recipient.name)){
                    this.updatedAssetInfo.receivers.push(recipient._id)
                }
            });

            Asset.uplaodChanges(store.getters.token, this.assetID, this.updatedAssetInfo)
                .then(res => {
                    console.log(res)
                    this.isEditable = false
                    this.changeStatus = false
                })
        }

       
        
    },
    handleFileUpload( event ){
        this.updatedAssetInfo.file = event.target.files[0];
        this.updatedAssetInfo.type = this.updatedAssetInfo.file.type;
    },

    handleEdit(){
        this.isEditable = true
    },

    handleCancel(){
        this.isEditable = false
        this.changeStatus = false
        this.revertChanges(this.initialAssetInfo)
    },

    handleChange(){
        this.changeStatus = true
    },

    revertChanges(obj){
        let { assetLink, description, sender, status, fileData, title } = obj
            this.updatedAssetInfo.status = Asset.capitaliseFirstLetter(status)
            this.updatedAssetInfo.file = fileData
            this.updatedAssetInfo.title = title
            this.updatedAssetInfo.description = description
            this.updatedAssetInfo.sender = sender
            this.updatedAssetInfo.link = assetLink
            this.initialAssetInfo.receivers = []
            this.initialAssetInfo.receiverNames = []
            this.updatedAssetInfo.recipient = []
            this.updatedAssetInfo.receiverNames = []

            this.recipients.forEach(recipient => {
                if(obj.recipients.includes(recipient._id)){
                    this.initialAssetInfo.receivers.push(recipient._id)
                    this.initialAssetInfo.receiverNames.push(recipient.name)
                    this.updatedAssetInfo.recipient.push(recipient._id)
                    this.updatedAssetInfo.receiverNames.push(recipient.name)
                }

                if(recipient._id === obj.sender){
                    this.senderName = recipient.name
                }
            });
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

input, select, textarea{
    display: block;
    width: 95%;
    height: 40px;
    border: 1px solid #d5c7ff;
    border-radius: 8px;
    padding: 0 10px;
}

.asset-content{
    border-right: 1px solid rgba(0, 0,0, 0.25);
}

textarea{
    height: 70px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
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
    margin-top: -8px;
    margin-right: 10px;
}

.buttons button{
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