
<template>
  <div>
    <div v-for="song in musicName" :key="song.id">
      <div>{{song.name}}</div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
const axios = require('axios');


const options = {
  method: 'GET',
  url: ' https://thibaultjanbeyer.github.io/YouTube-Free-Audio-Library-API/api.json',
};


const musicName = ref({})
async function fetchMusic(){
  const response = await axios.request(options);
  musicName.value = response.data.all
}
onMounted(()=>{
  fetchMusic()
})

</script>

<style>

</style>