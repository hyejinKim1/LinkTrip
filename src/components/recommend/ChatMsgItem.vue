<script setup>
import {ref} from "vue";

const props = defineProps({
  chat: Object
})
const myId = ref(getMemberId())

</script>

<template>
  <span :class="{mine : chat.memberId === myId}" class="chat-box">{{chat.msg}}</span>

</template>

<style scoped>

.chat-box {background: #eee; padding: 5px; max-width: 50%; margin : 0 10px; box-sizing: border-box; border-radius: 7px;}
.mine {margin-left: auto;}

</style>