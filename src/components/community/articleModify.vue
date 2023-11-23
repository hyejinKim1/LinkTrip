<script setup>

import {ref} from "vue";
import {updateArticle} from "@/api/community";
import {useRoute} from "vue-router";
import {getViewArticle} from "@/api/article";
import axios from "axios";
import KakaoMap from "../map/KakaoMap.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const { VITE_VUE_API_URL } = import.meta.env;

const route = useRoute()

const article = ref(
  {
    articleTitle: '',
    content: '',
    open:'F'
  }
)

const articleInfo = ref({
  title : '',
  content : '',
  open : '',
})

const mapData = ref([]);


function selectDay(index) {
  mapData.value = article.value.planData.placeOrder[index];
}

function onModify() {
  article.value.articleData.articleTitle = articleInfo.value.title
  article.value.articleData.content = articleInfo.value.content
  article.value.articleData.open = articleInfo.value.open 
  console.log(article.value)
  updateArticle(article.value.articleData)
  router.push("/community");
}

async function init() {
  article.value = await getViewArticle({
    articleIdx: route.params.articleIdx
  });
  articleInfo.value.title = article.value.articleData.articleTitle
  articleInfo.value.content = article.value.articleData.content
  articleInfo.value.open = article.value.articleData.open
}

function toggleVisibility(){
  if(articleInfo.value.open == 'T'){
    articleInfo.value.open = 'F';
  }else{
    articleInfo.value.open = 'T';
  }
}

init()
</script>

<template>
  <div class="create-article-div">
    <div class="plan-div">
      <p>{{ article.planData.planDTO.planTitle }}</p>
      <div v-for="(day, index) in article.planData.placeOrder" :key="index" class="day-text " @click="selectDay(index)">
        <button class="button">{{ index + 1 }}day</button>
      </div>
      <div class="map-div">
        <KakaoMap :mapData="mapData" :region="article.planData.planDTO.region" />
      </div>
    </div>
    <div>
      <form @submit.prevent="onModify" class="article-form">
      <label for="articleTitle">제목</label>
      <input type="text" id="articleTitle" v-model="articleInfo.title" class="input-field" placeholder="제목을 입력해주세요">

      <label for="content">내용</label>
      <textarea id="content" v-model="articleInfo.content" class="input-field" placeholder="여행 후기를 입력해주세요!"></textarea>

      <!--
      <div class="mb-3">
        <label for="upfile" class="form-label">파일:</label>
				<input type="file" class="form-control border" id="upfile" name="upfile" multiple="multiple">
			</div>
      -->

      <div class="toggle-button">
        <label for="visibility">글 공개 여부:</label>
        <button type="button" @click="toggleVisibility" :class="{ 'active': articleInfo.open == 'T' }">
          {{ articleInfo.open == 'T' ? '공개' : '비공개' }}
        </button>
      </div>


      <button type="submit" class="button">save</button>
    </form>
    </div>
  </div>

</template>

<style scoped>

.day-text {
  margin: 10px;
  padding: 10px;
  display: inline-block;
  cursor: pointer;
  transition: color 0.3s, transform 0.3s;
} 

.plan-div {
  width: 100vw;
  margin-top: 10vh;
  text-align: center;
}

.map-div {
  width: 100vw;
  height: 35vh;
  border-radius: 15px;
  overflow: hidden;
}

.create-article-div {
  font-family: 'Noto Sans KR', sans-serif;
  width: 100vw;
  align-items: center;
  justify-content: center;
  overflow-y: auto; /* Added to enable vertical scrolling */
  margin-top: 10vh; /* Added top margin */
}

.article-form {
  width: 100vw;
  margin: auto;
  margin-top: 15px;
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
  width: 100px;
  height: 50px;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 700;
  padding: 10px 20px;
  text-transform: uppercase;
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

.toggle-button {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.toggle-button label {
  margin-right: 10px;
}

.toggle-button button {
  background-color: #ccc;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-button button.active {
  background-color: #4CAF50;
}

</style>