
<template>
  <div>
    <audio controls :src="playSong"></audio>
    <div v-for="song in musicName" :key="song.id">
      <div @click="selectSong(song)">{{song.name}}</div>
      <button>Play</button>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
const axios = require('axios');


const options = {
  method: 'GET',
  url: 'https://thibaultjanbeyer.github.io/YouTube-Free-Audio-Library-API/api.json',
};


const musicName = ref({})
const songMap = ref({})
const songId = ref()
const songMapKeys = ref({})

async function fetchMusic(){
  const response = await axios.request(options);
  musicName.value = response.data.all
  songMap.value = response.data.map
  songMapKeys.value = Object.entries(songMap.value)
  console.log('songMapKeys.value',songMapKeys.value);
}


const songData = ref({})
let playSong = ref()

function selectSong(song) {
  songData.value = song;
  songId.value = songData.value.id
  const alligator = songMap.value
  playSong.value = alligator[songId.value]
  console.log(playSong.value );
}

onMounted(()=>{
  fetchMusic()
})

</script>

<style>

</style>