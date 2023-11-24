
<template>
  <div class="song_wrapper">
    <div class="audio-container">
      <audio controls :src="playSong">
      </audio>
      <p class="song-title">{{songTitle}}</p>
    </div>
    <div class="song_container">
      <input
        v-model="songSearchName"
        placeholder="Search"
        class="song_search"
        type="text"
      />
      <div v-for="song in filteredItems" :key="song">
        <div class="song" @click="selectSong(song)">{{ song.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed} from "vue";
const axios = require("axios");

const options = {
  method: "GET",
  url: "https://thibaultjanbeyer.github.io/YouTube-Free-Audio-Library-API/api.json",
};

const musicName = ref({});
const songMap = ref({});
const songId = ref();
let songTitle = ref('')

const songData = ref({});
let playSong = ref();
let songSearchName = ref('');
let filteredSongs = ref([]);

const filteredItems = computed(() => {
  return filteredSongs.value.filter((item) =>
    item.name.toLowerCase().includes(songSearchName.value.toLowerCase())
  );
});

async function fetchMusic() {
  const response = await axios.request(options);
  musicName.value = response.data.all;
  songMap.value = response.data.map;

  musicName.value.forEach((item) => {
    filteredSongs.value.push({
      name:item.name,
      id:item.id
    });
  });

}

function selectSong(song) {
  songData.value = song;
  songId.value = songData.value.id;
  songTitle.value = song.name
  const alligator = songMap.value;
  playSong.value = alligator[songId.value];
}

onMounted(() => {
  fetchMusic();
});
</script>

<style>
.song_wrapper {
  margin-top: 60px;
}
.song_container {
  max-height: 650px;
  overflow: auto;
  position: relative;
}
.song_search {
  position: fixed;
  left: 120px;
  top: 10px;
  font-size: 18px;
  width: 60%;
  height: 30px;
  background-color: #301b3f;
  outline: none;
  color: white;
  border: none;
}
.song_search::placeholder {
  color: rgba(255, 255, 255, 0.25);
  font-weight: 600;
  font-size: 14px;
}
.song {
  border-radius: 15px;
  background: rgba(51, 55, 59, 0.37);
  backdrop-filter: blur(5px);
  color: #fff;
  font-weight: 400;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-style: normal;
  max-width: 90%;
  padding-left: 20px;
  margin-bottom: 10px;
  margin-left: 100px;
  height: 56px;
  flex-shrink: 0;
  transition: all 0.3s;
}
.song:hover {
  background: rgba(84, 91, 97, 0.37);
}
.player {
  position: fixed;
  bottom: 10px;
  transform: translate(-50%, 0); /* Сдвигаем элемент на 50% ширины влево */
  left: 50%;
  z-index: 10;
}

.audio-container {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(29, 33, 35, 0.30);
  backdrop-filter: blur(15px);
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0px;
  transform: translate(-50%, 0); /* Сдвигаем элемент на 50% ширины влево */
  left: 50%;
  z-index: 10;
  text-align: center;
}

/* Стили для аудио */
audio {
  width: 100%;
}

/* Стили для названия песни */
.song-title {
  color: #fff; /* Цвет текста */
  font-weight: bold;
  font-size: 18px;
}

/* Изменение цвета кнопок на белый */
/* Применяется к кнопкам управления аудио */


audio::-webkit-media-controls-play-button,
audio::-webkit-media-controls-pause-button,
audio::-webkit-media-controls-volume-slider-thumb {
  background-color: white;
}
</style>