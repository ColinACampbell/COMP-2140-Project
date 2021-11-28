<template>
  <div class="container">
    <div>
      <div class="heading">
        <h1 class="title">Welcome, {{ name }}</h1>
        <h3>{{ date }}</h3>
      </div>
      <h2>Asset Status Report</h2>
    </div>
    <div class="display-content">
      <div class="content">
        <div class="cards">
          <div class="card submitted" @click="viewAssets = assetsSubmitted">
            <div>{{ assetsSubmitted.length  }}</div>
            <p>{{ assetsSubmitted.length > 1 ? "ASSETS SUBMITTED" : "ASSET SUBMITTED" }}</p>
          </div>
          <div class="card pending" @click="viewAssets = assetsPending">
            <div>{{ assetsPending.length }}</div>
            <p>{{ assetsPending.length > 1 ? "ASSETS PENDING" : "ASSET PENDING" }}</p>
          </div>
          <div class="card approved" @click="viewAssets = assetsApproved">
            <div>{{ assetsApproved.length }}</div>
            <p>{{ assetsApproved.length > 1 ? "ASSETS APPROVED" : "ASSET APPROVED" }}</p>
          </div>
          <div class="card completed" @click="viewAssets = assetsCompleted">
            <div>{{ assetsCompleted.length }}</div>
            <p>{{ assetsCompleted.length > 1 ? "ASSETS COMPLETED" : "ASSET COMPLETED" }}</p>
          </div>
        </div>
        <div class="chart">
            <GChart
              type="ColumnChart"
              :options="options"
              :data="chartData"
            />
        </div>
      </div>
      <div class="details">
        <ul>
          <li v-for="asset in viewAssets" :key="asset.status">
              {{ asset.title }}
              <ul>
                <li v-for="info in asset.history" :key="info.status">
                    <p>{{ info.status }}</p>
                    <p>Date Modified: {{ new Date(+info.time).toDateString() }}</p>
                    <p>Modified by: {{ info.updatedBy.name }}</p>
                </li>
              </ul>
          </li>
        </ul>
      </div>
    </div>
  </div> 
</template>

<script>
import store from '../store/store'
import AssetService from '../services/asset.service'
import { GChart } from "vue-google-charts";

export default {
  name: 'Home',
  components: {
    GChart
  },
  data(){
    return {
      name: store.getters.userName,
      date: "",
      assetsSubmitted: [],
      assetsPending: [],
      assetsApproved: [],
      assetsCompleted: [],
      viewAssets: [],
      chartData: null,
      options: null
    }
  },
  beforeMount(){
    let date = new Date()
    this.date = date.toDateString()
    AssetService.getAssets(store.getters.token)
      .then(res => {
        console.log(res)
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

          this.fillData()
        }
      })
  },
  methods: {
    fillData(){
      this.chartData = [
        ['Asset Progress', 'Number of Assets', { role: 'style' } ],
        ['Submitted', this.assetsSubmitted.length, 'stroke-color: #f04438; stroke-opacity: 1; stroke-width: 1; fill-color: #fee4e2; '],
        ['Pending', this.assetsPending.length, 'stroke-color: #12b76a; stroke-opacity: 1; stroke-width: 1; fill-color: #d1fadf; '],
        ['Approved', this.assetsApproved.length, 'stroke-color: #2e90fa; stroke-opacity: 1; stroke-width: 1; fill-color: #d1e9ff; '],
        ['Completed', this.assetsCompleted.length, 'stroke-color: #f79009; stroke-opacity: 1; stroke-width: 1; fill-color: #fef0c7; ' ],
      ]
      this.options = {
        width: 650,
        height: 350,
        legend: 'none'
      }
    }
  }

 
}
</script>

<style scoped>
.container{
  padding: 10px 30px 10px 10px;
}

.cards{
  display: flex;
  flex-wrap: row;
}

.display-content{
  display: grid;
  grid-template-columns: 750px 1fr;
}

.content{
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  padding-right: 10px ;
}

.card{
  border-radius: 10px;
  width: 200px;
  height: 150px;
  margin: 10px;
  text-align: center;
  padding: 5px 10px;
  cursor: pointer;
}

.card div:nth-child(1){
  font-size: 60px;
  text-align: center;
  height: 70px;
  margin-top: 10px;
}

.card p{
  font-size: 16px;
  font-weight: 900;
  width: 100px;
  text-align: center;
  margin: 10px auto;
}

.submitted{
  border: 1px solid #fee4e2;
  color: #f04438;
}

.submitted:hover{
  background: #fee4e2;
}

.pending{
  border: 1px solid#d1fadf;
  color: #12b76a;
}

.pending:hover{
  background: #d1fadf;
}

.approved{
  border: 1px solid #d1e9ff;
  color: #2e90fa;
}

.approved:hover{
  background: #d1e9ff;
}

.completed{
  border: 1px solid #fef0c7;
  color: #f79009;
}

.completed:hover{
  background: #fef0c7;
}

.heading{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart{
  display: block;
}

</style>
