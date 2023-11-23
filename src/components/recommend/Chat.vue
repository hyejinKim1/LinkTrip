<template>
  <div class="chat-container">
    <div class="chat-window">
      <div class="chat-messages">
        <div v-for="(message, index) in messages" :key="index" class="chat-message"
          :class="{ 'user-message': message.user === 'user', 'bot-message': message.user === 'bot' }">
          <div v-if="message.user === 'bot'" class="avatar-container">
            <img src="../../assets/img/gpt.png" alt="Bot" class="avatar" />
          </div>
          <div v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left"
              viewBox="0 0 16 16" style="margin:10px;">
              <path
                d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            </svg>
          </div>
          <div class="message-content">{{ message.content }}</div>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <div class="input-container">
        <img src="../../assets/img/gpt.png" alt="Bot" class="avatar" />
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your travel plan question..." />
      </div>
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const { VITE_GPT_API_KEY } = import.meta.env;

const messages = ref([]);
const newMessage = ref('');

const sendMessage = async () => {
  if (newMessage.value.trim() === '') return;

  // Add user message
  messages.value.push({ content: newMessage.value, user: 'user' });


  // Call ChatGPT API for a response
  const botResponse = await getChatGPTResponse();
  newMessage.value = '';
  messages.value.push(botResponse);
};

const getChatGPTResponse = async () => {
  try {
    const apiKey = VITE_GPT_API_KEY; // 여기에 올바른 API 키를 설정하세요
    console.log(apiKey);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any required headers, such as authorization if needed
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: '당신은 여행지를 간략하게 잘 추천해주는 챗봇입니다.' },
          { role: 'user', content: newMessage.value },
        ],
        max_tokens: 200,
      }),
    });

    const responseData = await response.json();

    // Extract the bot's response from the API response
    const botResponse = { content: responseData.choices[0].message.content, user: 'bot' };
    return botResponse;
  } catch (error) {
    console.error('Error fetching ChatGPT response:', error);
    return { content: 'Error fetching response...', user: 'bot' };
  }
};
</script>

<style scoped>
.chat-container {
  width: 100%;
  margin: 0 auto;
}

.chat-window {
  border: 1px solid #ccc;
  border-radius: 10px;
  height: 80vh;
  overflow-y: auto;
  padding: 10px;
}

.chat-message {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
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

.message-content {
  max-width: 95%;
}

.chat-input {
  width: 100%;
  display: flex;
  margin-top: 10px;
}

.avatar-container {
  display: flex;
  align-items: center;
  margin-right: 8px;
}

.avatar {
  width: 20px;
  /* 이미지 크기 조절 */
  height: 20px;
  margin: 8px;
  /* 이미지 오른쪽 마진 추가 */
}

.input-container {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  width: 80%;
}

input {
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
}

button {
  padding: 10px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}</style>
