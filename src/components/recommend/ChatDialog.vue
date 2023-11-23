<script setup>

import {ref} from "vue";
import ChatMsgItem from "@/components/recommend/ChatMsgItem.vue";

//const props = defineProps({
//  chatHistory: Array
//})

const emit = defineEmits([
  'sendChat'
])

const currentChatInBox = ref('')

function onSendChat() {
  emit('sendChat', currentChatInBox.value)
  currentChatInBox.value = ''
}
</script>

<template>

  <h2 class="h2-title">채팅창</h2>

  <div class="chat-content">
    <template v-for="el in chatHistory">
      <div class="line">
        <chat-msg-item :chat="el">
        </chat-msg-item>
      </div>
    </template>
  </div>

  <div>
    <div class="d-flex">
      <v-text-field id="input"
                    v-model="currentChatInBox"
                    label="질문"
                    placeholder="질문..."
                    variant="outlined"></v-text-field>
      <v-btn @click="onSendChat" style="height: 55px"> 전송</v-btn>
    </div>
  </div>

</template>

<style>
.h2-title {
  margin-top: 30px;
}

.div-chats {
  height: 500px;
}

.chat-content {
  height: 500px;
  overflow-y: scroll;
}

.line {
  margin-top: 10px;
  display: flex;
}

.chat-box {
  background: #eee;
  padding: 5px;
  max-width: 50%;
  margin: 0 10px;
  box-sizing: border-box;
  border-radius: 7px;
}

.mine {
  margin-left: auto;
}


</style>
