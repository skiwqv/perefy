<template>
    <div class="text-wrapper">
        <div class="text">perefy</div>
        <button @click="toHome" class="button" type="button">BEGIN!</button>
    </div>
</template>

<script setup>
import router from '@/router';
let route = router

function toHome() {
    route.push('/home')
}
</script>

<style scoped>
.text-wrapper {
    background-color: #000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
}

.text {
    color: white;
    font-size: 90px;
    background-color: transparent;
    text-transform: uppercase;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -80%);
    letter-spacing: 25px;
    font-weight: normal;
    animation: changeColor 3s linear infinite;
    text-shadow: 4px 8px 9px #8a2be2, -1px -9px 4px #ba55d3;
}

.button {
    position: absolute;
    width: 250px;
    height: 80px;
    cursor: pointer;
    font-size: 30px;
    left: 50%;
    top: 60%;
    transform: translate(-55%);
    border-radius: 20px;
    letter-spacing: 10px;
    font-weight: normal;
    border: none;
    outline: none;
    padding: 0 0 0 0;
    box-shadow: 0px 0px 10px 4px #8a2be2, 0px 0px 15px 6px #ba55d3;
    transition: all .3s;
}

.button:hover {
    background-color: transparent;
    color: #fff;
}

@media screen and (max-width: 576px) {
    .text {
        font-size: 65px;
        transform: translate(-45%, -50%);
    }

    .button {
        width: 200px;
        height: 60px;
        transform: translate(-55%, -50%);
    }
}


@keyframes changeColor {
    0% {
        color: #fff;
        text-shadow: 4px 8px 9px #9e46ef;
    }

    25% {
        color: #ffffffbc;
        text-shadow: 4px 8px 9px #7621c5;
    }

    50% {
        color: #ffffffaa;
        text-shadow: 4px 8px 9px #600eac;
    }

    75% {
        color: #ffffff73;
        text-shadow: 4px 8px 9px #a356ec;
    }

    100% {
        color: #fff;
        text-shadow: 4px 8px 9px #9e46ef;
    }
}
</style>