<template>
  <div>
    <aside class="sidebar">
        <router-link to="/" active-class="link__active" class="sidebar__link">
            <unicon width="22px" height="22px" name="home" fill="#fff"></unicon>
        </router-link>
        <router-link to="/about" class="sidebar__link">
        <unicon width="22px" height="22px" hover-fill="#fff"  name="music" fill="#FFFFFF40"></unicon>
        </router-link>
        <router-link to="/favorite" class="sidebar__link">
            <unicon width="22px" height="22px" hover-fill="#fff"   name="folder-heart" fill="#FFFFFF40"></unicon>
        </router-link>
        <router-link to="/settings" class="sidebar__link">
            <unicon width="22px" height="22px" hover-fill="#fff"   name="setting" fill="#FFFFFF40"></unicon>
        </router-link>

    </aside>
  </div>
</template>

<script setup>

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
}

.sidebar__image{
    width: 22px;
    height: 22px;
}


</style>