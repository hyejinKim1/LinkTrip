<template>
  <div class="chat-container">
    <div class="chat-window">
      <div class="chat-messages">
        <div v-for="(message, index) in messages" :key="index" class="chat-message" :class="{ 'user-message': message.user === 'user', 'bot-message': message.user === 'bot' }">
          {{ message.content }}
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const messages = ref([]);
const newMessage = ref('');

const sendMessage = () => {
  if (newMessage.trim() === '') return;

  // Add user message
  messages.value.push({ content: newMessage, user: 'user' });
  newMessage.value = '';

  // Simulate API call to ChatGPT (replace this with your actual API call)
  simulateBotResponse();
};

const simulateBotResponse = () => {
  // Simulate a delayed response from the bot
  setTimeout(() => {
    // Replace this with your actual API call to ChatGPT
    const botResponse = { content: 'Bot response goes here...', user: 'bot' };
    messages.value.push(botResponse);
  }, 500);
};
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
}

.chat-window {
  border: 1px solid #ccc;
  height: 300px;
  overflow-y: auto;
  padding: 10px;
}

.chat-message {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 8px;
}

.user-message {
  background-color: #d3e0dc;
  align-self: flex-end;
}

.bot-message {
  background-color: #f0f0f0;
  align-self: flex-start;
}

.chat-input {
  display: flex;
  margin-top: 10px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
