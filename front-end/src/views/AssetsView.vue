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
    color: #dc6f26;
    border: 1px solid #dc6f26;
}

.Pending{
    color: #139e4d;
    border: 1px solid #139e4d;
}

.Approved{
    color: #1f7ef1;
    border: 1px solid #1f7ef1;
}

.Completed{
    color: #ebca11;
    border: 1px solid #ebca11;
}
</style>
