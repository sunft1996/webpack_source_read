<template>
  <div>
    <div class="title">hello world!</div>
    <div>
      <img class="img" :src="meImg" alt="头像" >
    </div>
  </div>  
</template>

<script>
import meImg from './me.jpeg';
import './app.css';
export default {
    name: 'app',
    data() {
      return {
        meImg
      }
    }
}
</script>

<style>


</style>