
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
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();

let songTitle = ref("");
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

function loadMore() {

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

let music = computed(() => {
  return store.getters.getConnected;
});



async function storeFetchMusic() {
  isLoading.value = true;
  await store.dispatch("fetchMusic");
  music.value.forEach((item) => {
    filteredSongs.value.push({
      name: item.name,
      id: item.id,
    });
    isLoading.value = false;
  });
  loadMore();
}


function selectSong(song) {
  store.dispatch("selectSong", song.id);
  songTitle.value = song.name
  playSong.value = store.getters.getPlaySong
}


onMounted(() => {
  storeFetchMusic();
  loadedItems.value = filteredSongs.value.slice(0, pageSize);
});
</script>

<style></style>