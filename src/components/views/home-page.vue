
<template>
  <div class="song_wrapper">
    <div v-if="isLoading" class="loading-wrapper">
      <unicon class="loading" fill="white" width="60px" height="60px" name="spinner-alt"></unicon>
    </div>
    <div class="audio-container">
      <audio controls :src="playSong"></audio>
      <p class="song-title">{{ songTitle }}</p>
    </div>
    <div @scroll="handleScroll" ref="scrollContainer" class="song_container">
      <input v-model="songSearchName" placeholder="Search" class="song_search" type="text" />
      <div v-for="song in filteredItems" :key="song">
        <div class="song" @click="selectSong(song)">{{ song.name }}</div>
      </div>
      <p v-if="reachedEnd" class="list_end">that's all available songs</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const options = {
  method: "GET",
  url: "https://thibaultjanbeyer.github.io/YouTube-Free-Audio-Library-API/api.json",
};

const musicName = ref({});
const songMap = ref({});
const songId = ref();
let songTitle = ref("");
const songData = ref({});
let playSong = ref();
let songSearchName = ref("");
let filteredSongs = ref([]);
let isLoading = ref(false);
let scrollContainer = ref(null);
const pageNumber = ref(1);
const pageSize = 100;
const reachedEnd = ref(false);
let loadedItems = ref([]);

const filteredItems = computed(() => {
  return loadedItems.value.filter((item) =>
    item.name.toLowerCase().includes(songSearchName.value.toLowerCase())
  );
});

function handleScroll() {
  const container = scrollContainer.value;
  const bottomOffset = container.scrollHeight - container.clientHeight;
  if (bottomOffset <= container.scrollTop) {
    loadMore();
  }
}

async function fetchMusic() {
  isLoading.value = true
  await axios.request(options).then(response => {
    musicName.value = response.data.all;
    songMap.value = response.data.map;
  }).catch(err => {
    console.log('err', err);
    isLoading.value = false
  })

  musicName.value.forEach((item) => {
    filteredSongs.value.push({
      name: item.name,
      id: item.id,
    });
  });
  loadMore();
}
function loadMore() {
  isLoading.value = false;
  const startIndex = (pageNumber.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const nextItems = filteredSongs.value.slice(startIndex, endIndex);
  if (nextItems.length > 0) {
    loadedItems.value = [...loadedItems.value, ...nextItems];
    pageNumber.value++;
  } else {
    reachedEnd.value = true;
  }
}

function selectSong(song) {
  songData.value = song;
  songId.value = songData.value.id;
  songTitle.value = song.name;
  const alligator = songMap.value;
  playSong.value = alligator[songId.value];
}

onMounted(() => {
  fetchMusic();
  loadedItems.value = filteredSongs.value.slice(0, pageSize);
});
</script>

<style>
.song_wrapper {
  margin-top: 60px;
}

.song_container {
  max-height: 525px;
  height: 100%;
  overflow: auto;
  position: relative;
  overflow-x: hidden;
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
  transform: translate(-50%, 0);
  left: 50%;
  z-index: 10;
}

.audio-container {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(29, 33, 35, 0.3);
  backdrop-filter: blur(15px);
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0px;
  transform: translate(-50%, 0);
  left: 50%;
  z-index: 10;
  text-align: center;
}

audio {
  width: 100%;
}

.song-title {
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}

@keyframes spin {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.loading-wrapper {
  position: fixed;
  z-index: 20;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #0000005e;
  width: 100%;
}

.loading {
  position: absolute;
  z-index: 999;
  font-size: 20px;
  color: #fff;
  animation: spin 3s linear infinite;
  font-weight: 900;
  bottom: 50%;
  transform: translate(-50%, 0);
  left: 50%;
}

.list_end {
  font-size: 20px;
  color: #fff;
  font-weight: 900;
  display: block;
  margin: 0 auto;
}

audio::-webkit-media-controls-play-button,
audio::-webkit-media-controls-pause-button,
audio::-webkit-media-controls-volume-slider-thumb {
  background-color: white;
}
</style>