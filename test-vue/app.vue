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
.title {
    color: red;
}
.img {
  width: 100px;
}
</style>