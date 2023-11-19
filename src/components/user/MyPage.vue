<script setup>
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";

const memberStore = useMemberStore();
const { isLogin } = storeToRefs(memberStore);

const logout = async () => {
    console.log('logout');
}


</script>

<template>
    <div>
        <h1>My Page</h1>
        <button type="button" @click="logout">로그아웃</button>
    </div>
</template>

<style scoped>

</style>