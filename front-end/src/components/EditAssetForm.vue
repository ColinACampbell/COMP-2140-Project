<template>
<div class="modal">
    <div class="modal-content"> 
        <h2>Create Asset Container</h2>
        <form id="create-issue-form" method="post" @submit.prevent="handleSubmit">
            <div>
                <label for="title">Title</label>
                <input type="text" name="title" id="title" v-model="title" required :readonly="isEditable"/>
            </div>
            <div>
                <label for="description">Description</label>
                <textarea name="description" id="description" cols="30" rows="10" v-model="description" :readonly="isEditable" required></textarea>
            </div>
            <div>
                <label for="sender">Sender</label>
                <input type="text" name="sender" id="sender" v-model="senderName" readonly/>
            </div>
            <div>
                <label for="recipient">Recipient(s)</label>
                <select name="positions" id="positions" v-model="receivers" multiple="true" required :readonly="isEditable">
                    <option v-for="option in recipients" v-bind:value="option" v-bind:key="option">
                        {{option}}
                    </option>
                </select>
                {{ receivers }}
            </div>
            <div>
                <label for="file">Link to File</label>
                <input name="link"  type="url" v-model="link" :readonly="isEditable"/>
            </div>
            <div>
                <label for="file">File Upload</label>
                <input name="file" class="custom-file-input" id="file" type="file" @change="handleFileUpload( $event )" :readonly="isEditable"/>
            </div>
            <div class="buttons">
                <button @click="handleClick" id="edit-btn">Edit Information</button>
                <button @click="close" id="cancel">Cancel</button>
                <button type="submit" class="create-btn" :disabled="(file === '' && link === '')">Create</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import Form from "../services/form.service"
export default {
  name: 'EditAsset',
  props: [
    'name', 'recipients', 'description', 'file', 'link', 'title'
  ],
  data(){
    return {
        title: this.title,
        description: this.description,
        senderName: this.name,
        file: this.file,
        type: "",
        link: this.link,
        receivers: this.recepients,
        isEditable: false
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
    handleSubmit(){ //change the functionality in service.js
        let asset = {
            file: this.file,
            type: this.type,
            title: this.title,
            description: this.description,
            sender: this.senderName,
            link: this.link,
            recepient: this.receivers
        }
        Form.processAsset(asset)
        this.close()
        alert("Asset Created!")
    }
}
}
</script>

<style scoped>
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
.buttons{
    display: flex;
}

#cancel, .create-btn{
    justify-content: flex-end;
}

#edit-btn{
    justify-content: flex-start;
}

.buttons button{
    border: 1px solid #865cff;
    border-radius: 8px;
    width: 100px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
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
    padding: 10px 0;
}

select[multiple] {
    padding-top: 5px ;
    height: 6rem;
}
</style>
