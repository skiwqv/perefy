<template>
  <div>
    <aside class="sidebar">
        <router-link to="/" active-class="link__active" class="sidebar__link">
            <unicon width="22px" :fill="isActive('/') ? '#fff' : '#FFFFFF40'" height="22px" hover-fill="#fff" name="home"></unicon>
        </router-link>
        <router-link to="/about" active-class="link__active" class="sidebar__link">
        <unicon width="22px" height="22px" :fill="isActive('/about') ? '#fff' : '#FFFFFF40'" hover-fill="#fff"  name="music"></unicon>
        </router-link>
        <router-link to="/favorite" active-class="link__active" class="sidebar__link">
            <unicon width="22px" height="22px" :fill="isActive('/favorite') ? '#fff' : '#FFFFFF40'" hover-fill="#fff"   name="folder-heart"></unicon>
        </router-link>
        <router-link to="/settings" active-class="link__active" class="sidebar__link">
            <unicon width="22px" height="22px" :fill="isActive('/settings') ? '#fff' : '#FFFFFF40'" hover-fill="#fff"   name="setting"></unicon>
        </router-link>

    </aside>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

function isActive(page){
    return route.path === page
}


</script>

<style scoped>
.sidebar{
    border-radius: 100px;
    background: #0F0E0E;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 52px;
    height: 220px;
    padding-top: 20px;
    row-gap: 31px;
    position: fixed;
    z-index: 10;
    margin-left: 22px;
}
.link__active{
    fill: white;
}

</style>