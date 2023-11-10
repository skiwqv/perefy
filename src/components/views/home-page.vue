
<template>
  <div class="song_wrapper">
    <audio class="player" controls :src="playSong"></audio>
    <div  v-for="song in musicName" :key="song.id">
      <div class="song" @click="selectSong(song)">{{song.name}}</div>
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

const songData = ref({})
let playSong = ref()

async function fetchMusic(){
  const response = await axios.request(options);
  musicName.value = response.data.all
  songMap.value = response.data.map
  }

function selectSong(song) {
  songData.value = song;
  songId.value = songData.value.id
  const alligator = songMap.value
  playSong.value = alligator[songId.value]
}

onMounted(()=>{
  fetchMusic()
})

</script>

<style>
.song_wrapper{
  margin-top: 60px;
}
.song{
  border-radius: 15px;
  background: rgba(51, 55, 59, 0.37);
  backdrop-filter: blur(5px);
  color: #FFF;
  font-family: Quicksand;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-style: normal;
  width: 90%;
  padding-left: 20px;
  margin-bottom: 10px;
  margin-left: 100px;
  height: 56px;
  flex-shrink: 0;
  font-weight: 400;
  line-height: 120%;
  transition: all .3s;
}
.song:hover{
  background: rgba(84, 91, 97, 0.37);
}
.player{
  position: fixed;
  bottom: 10px;
  transform: translate(-50%, 0); /* Сдвигаем элемент на 50% ширины влево */
  left: 50%;
  z-index: 10;
}
</style>