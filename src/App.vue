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
</style>
