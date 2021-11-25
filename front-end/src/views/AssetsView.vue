<template>
    <router-view>
    </router-view>
</template>

<script>
export default {
  name: 'AssetsView',
}
</script>

<style>
.Submitted, .Pending, .Approved, .Completed{
    height: 35px;
    max-width: 200px;
    width: 100px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 0 10px;
    font-size: 16px;
    font-weight: bold;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    margin: 0 auto;
}

.Submitted{
    color: #f04438;
    background:  #fee4e2;
}

.Pending{
    color: #12b76a;
    background: #d1fadf;
}

.Approved{
    color: #2e90fa;
    background: #d1e9ff;
}

.Completed{
    color: #f79009;
    background: #fef0c7;
}
</style>
