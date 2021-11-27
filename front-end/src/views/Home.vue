<template>
  <div class="container">
    <div>
      <div class="heading">
        <h1 class="title">Welcome, {{ name }}</h1>
        <h2>{{ date }}</h2>
      </div>
      <h1>Asset Status Report</h1>
    </div>
    <div class="content">
      <div class="cards">
        <div class="card submitted">
          <div>{{ assetsSubmitted.length  }}</div>
          <p>ASSETS SUBMITTED</p>
        </div>
        <div class="card pending">
          <div>{{ assetsPending.length }}</div>
          <p>ASSETS PENDING</p>
        </div>
        <div class="card approved">
          <div>{{ assetsApproved.length }}</div>
          <p>ASSETS APPROVED</p>
        </div>
        <div class="card completed">
          <div>{{ assetsCompleted.length }}</div>
          <p>ASSETS COMPLETED</p>
        </div>
      </div>
      <div>

      </div>
      <div></div>
    </div>
  </div> 
</template>

<script>
import store from '../store/store'
import AssetService from '../services/asset.service'

export default {
  name: 'Home',
  data(){
    return {
      name: store.getters.userName,
      date: "",
      assetsSubmitted: [],
      assetsPending: [],
      assetsApproved: [],
      assetsCompleted: []
    }
  },
  beforeMount(){
    let date = new Date()
    this.date = date.toDateString()
    AssetService.getAssets(store.getters.token)
        .then(res => {
            if(res === "Failed to fetch"){
            console.log("failed") //Fix
          } else {
            [...res.sent, ...res.recieved].forEach(asset => {
              switch (asset.status) {
                case "Submitted":
                  this.assetsSubmitted.push(asset)
                  break;
                case "Approved":
                  this.assetsApproved.push(asset)
                  break;
                case "Pending":
                  this.assetsPending.push(asset)
                  break;
                case "Completed":
                  this.assetsCompleted.push(asset)
                  break;
                default:
                  break;
              }
            });
          }
        })
  },
}
</script>

<style scoped>
.container{
  padding: 10px 30px 10px 10px;
}

.cards{
  display: flex;
  flex-wrap: row;
  /* margin-top: 3rem; */
}

.card{
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 200px;
  height: 200px;
  margin: 10px;
  text-align: center;
  padding: 5px 10px;
}

.card div:nth-child(1){
  font-size: 90px;
  text-align: center;
  height: 100px;
  margin-top: 10px;
}

.card p{
  font-size: 18px;
  font-weight: 900;
  width: 100px;
  text-align: center;
  margin: 10px auto;
}

.submitted{
    color: #f04438;
}

.pending{
    color: #12b76a;
}

.approved{
    color: #2e90fa;
}

.completed{
    color: #f79009;
}

h2{
  /* margin-top: -15px; */
  color: #d5c7ff;
  font-style: italic;
  font-family: cursive;
}

.title{
  color: #865cff;
}

.heading{
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width: max-content; */
}

</style>
