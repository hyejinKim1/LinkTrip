<script setup>
import { RouterView } from 'vue-router'
import Navbar from "./components/layout/Navbar.vue"
</script>

<template>
    <header>
        <Navbar/>
    </header>
    <router-view></router-view>
</template>

<style scoped> 
/* .wrapper{
  width: 100%;
  height: 100%;
  margin : 0;
  padding:0;
} */
</style>
