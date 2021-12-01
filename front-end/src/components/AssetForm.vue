<template>
<div class="modal">
    <div class="modal-content"> 
        <h2>Create Asset Container</h2>
        <span v-if="error">--{{error}}--</span>
        <form id="create-issue-form" method="post" @submit.prevent="handleSubmit">
            <div>
                <label for="title">Title</label>
                <input type="text" name="title" id="title" v-model="title" required/>
            </div>
            <div>
                <label for="description">Description</label>
                <textarea name="description" id="description" cols="30" rows="10" v-model="description" required></textarea>
            </div>
            <div>
                <label for="reviewDate">Reviewed by</label>
                <input type="date" name="reviewDate" id="reviewDate" min="" v-model="reviewDate" required>
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
            <div>
                <label for="file">Link to File</label>
                <input name="link"  type="url" v-model="link"/>
            </div>
            <div class="file-input">
                <label for="file">File Upload</label>
                <input name="file" class="custom-file-input" id="file" type="file" @change="handleFileUpload( $event )"/>
            </div>
            <div class="buttons">
                <button @click="close" id="cancel">Cancel</button>
                <button type="submit" class="create-btn" :disabled="(file === '' && link === '')">Create</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import Form from "../services/form.service"
import store from '../store/store'

export default {
  name: 'Asset',
  data(){
    return {
        title: "",
        description: "",
        senderName: store.getters.userName,
        file: "",
        type: "",
        link: "",
        reviewDate: "",
        recipients: store.getters.members,
        receivers: [],
        receiverNames: [],
        error: "",
        docID: ""
    } 
  },
  methods:{
    handleFileUpload( event ){
        this.file = event.target.files[0];
        this.type = this.file.type;
    },
    close() {
        this.$emit('close');
    },
    handleSubmit(){
        this.recipients.forEach(recipient => {
            if(this.receiverNames.includes(recipient.name)){
                this.receivers.push(recipient._id)
            }
        });
        let asset = {
            fileData: this.file,
            type: this.type,
            title: this.title,
            description: this.description,
            sender: this.senderName,
            reviewBy: this.reviewDate,
            assetLink: this.link,
            recipients: this.receivers
        }
        Form.processAsset(asset)
            .then(res => {
                if(res === "Successful"){
                    this.close()
                    alert("Asset Created!")
                } else if(res === "Title duplication"){
                    this.error = "Title already exists in the system."
                }
                else{
                    this.error = "There is an error in uploading the asset."
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
  padding-top: 0px; 
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
    margin-top: -10px;
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

.custom-file-input {
    border: none;
    padding-top: 10px;

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
