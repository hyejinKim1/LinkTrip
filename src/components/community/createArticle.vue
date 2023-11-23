<script setup>
import { ref, onMounted } from "vue";
import { createArticle } from "@/api/community";
import { useRoute } from "vue-router";
import axios from "axios";
import KakaoMap from "../map/KakaoMap.vue";
const { VITE_VUE_API_URL } = import.meta.env;


const route = useRoute();

const placeOrder = ref([]);
const planDTO = ref([]);
const region = ref("");

const article = ref({
  articleTitle: '',
  content: '',
  planIdx: route.params.planIdx
})

const mapData = ref([]);

onMounted(() => {
  getPlan();
})

const getPlan = () => {
  console.log(route.params.planIdx);
  let baseUrl = VITE_VUE_API_URL + "plan/viewPlan?" + "&planIdx=" + route.params.planIdx;
  console.log(baseUrl);

  axios.get(baseUrl)
    .then((res) => {
      planDTO.value = res.data.data.planDTO;
      placeOrder.value = res.data.data.placeOrder;
      console.log(res.data.data);
      mapData.value = placeOrder.value[0];
      region.value = planDTO.value.region;
    });
}

function selectDay(index) {
  mapData.value = placeOrder.value[index];
}

function onCreate() {
  createArticle(article.value)
}

</script>

<template>
  <div class="create-article-div">
    <div class="plan-div">
      <h2>{{ planDTO.planTitle }}</h2>
      <div v-for="(day, index) in placeOrder" :key="index" class="day-text " @click="selectDay(index)">
        <bitton class="button">{{ index + 1 }}day</bitton>
      </div>
      <div class="map-div">
        <KakaoMap :mapData="mapData" :region="region" />
      </div>
    </div>
    <form @submit.prevent="onCreate" class="article-form">
      <label for="articleTitle">Title:</label>
      <input type="text" id="articleTitle" v-model="article.articleTitle" class="input-field" placeholder="Enter title">

      <label for="content">Content:</label>
      <textarea id="content" v-model="article.content" class="input-field" placeholder="Enter your content"></textarea>

      <button type="submit" class="submit-button">Create Article</button>
    </form>
  </div>
</template>

<style scoped>
.day-text {
  display: inline-block;
  margin: 5px;
  padding: 8px;
  /* background-color: #4CAF50; */
  /* color: white;
  border-radius: 5px; */
  cursor: pointer;
  transition: background-color 0.3s;
}

.day-text:hover {
  /* background-color: #45a049; */
}

.plan-div {
  width: 50vw;
  margin: auto;
  text-align: center;
}

.map-div {
  width: 50vw;
  height: 35vh;
  border-radius: 15px;
  overflow: hidden;
}

.create-article-div {
  font-family: 'Noto Sans KR', sans-serif;
  width: 100vw;
  height: 100vh;
  padding-top:5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.article-form {
  width: 50vw;
  margin: auto;
  margin-top: 20px;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #4CAF50;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
  transition: border-color 0.3s;
}

textarea:focus {
  border-color: #4CAF50;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #45a049;
}

.button {
  width: 200px;
  height: 60px;
  font-family: 'Montserrat', sans-serif;
  font-size: 25px;
  font-weight: 700;
  padding: 10px;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-weight: 800;
  color: #000;
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(65, 65, 65, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  }

.button:hover {
  background-color: rgb(163, 217, 248);
  box-shadow: 0px 15px 20px rgba(145, 211, 255, 0.4);
  color: #fff;
  transform: translateY(-7px);
}
</style>
