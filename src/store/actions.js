import axios from "axios"

export async function fetchMusic({ commit }) {
    let api = axios.get('https://thibaultjanbeyer.github.io/YouTube-Free-Audio-Library-API/api.json')
    commit('SET_MUSIC', (await api).data.all)
    commit('SET_MUSIC_MAP', (await api).data.map)
}

export function selectSong({ commit, state }, data) {
    let songId = data
    let playSong = state.songMap[songId]
    commit('SET_PLAY_SONG', playSong)
}