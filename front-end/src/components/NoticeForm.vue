<template>
<div class="modal">
    <div class="modal-content"> 
        <h2>Create Notice</h2>
        <form id="notice-form" method="post" @submit.prevent="handleSubmit">
            <div>
                <label for="title">Title  <span v-if="error">--{{error}}--</span></label>
                <input type="text" name="title" id="title" v-model="title" required/>
            </div>
            <div>
                <label for="information">Information</label>
                <textarea name="information" id="information" cols="30" rows="10" v-model="information" required></textarea>
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
  name: 'NoticeForm',
  data(){
    return {
        title: "",
        information: "",
        error: "",
    } 
  },
  methods:{
    close() {
        this.$emit('close');
    },
    handleSubmit(){
        let confirm = window.confirm("Do you want to create this notice?")

        if(confirm){
            let notice = {
                title: this.title,
                message: this.information,
            }
            FormService.processNotice(notice, store.getters.token)
                .then(res => {
                    if(res === "Successful"){
                        this.close()
                        alert("Notice Created!")
                    }else{
                        this.error = "This title exist for another notice"
                        this.title = ""
                    }
                })
        }else{
            this.close()
        }

        
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
  padding-top: 10rem; 
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
    height: 90px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 14px;
    resize: none;
}

label{
    font-weight: bold;
}

form div{
    margin: 10px 0;
}

.buttons{
    display: flex;
    justify-content: flex-end;
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

</style>
