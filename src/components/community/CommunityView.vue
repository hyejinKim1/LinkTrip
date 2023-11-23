<script setup>
import { getArticleList } from "@/api/community";
import { ref } from "vue";
// import { useMemberStore } from "../../stores/member";
import ArticleListItem from "./item/ArticleListItem.vue";
import PageNavigation from "./PageNavigation.vue"

// const ms = useMemberStore();
const articleList = ref({
  articleList: []
});
const param = ref({
  pgno: 1,
  region: '',
  order: '',
  word: ''
})

async function onSubmitFilter() {
  articleList.value = await getArticleList(param.value);
}

const currentPage = ref(1);

async function init() {
  articleList.value = await getArticleList(param.value);
  console.log("article: ", articleList)
}

function changeCurrentPage(pageNumber) {
  currentPage.value = pageNumber;
  param.value.pgno = pageNumber;
  init();
}

init();
</script>

<template>
  <div class="outer">
    <!-- <h1>community</h1> -->

    <form @submit.prevent="onSubmitFilter">
      <div class="top-bar">
        <div class="text-div">
          국내 실시간 여행기 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-airplane-engines" viewBox="0 0 16 16">
            <path
              d="M8 0c-.787 0-1.292.592-1.572 1.151A4.347 4.347 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0M7 3c0-.432.11-.979.322-1.401C7.542 1.159 7.787 1 8 1c.213 0 .458.158.678.599C8.889 2.02 9 2.569 9 3v4a.5.5 0 0 0 .276.447l5.448 2.724a.5.5 0 0 1 .276.447v.792l-5.418-.903a.5.5 0 0 0-.575.41l-.5 3a.5.5 0 0 0 .14.437l.646.646H6.707l.647-.646a.5.5 0 0 0 .14-.436l-.5-3a.5.5 0 0 0-.576-.411L1 11.41v-.792a.5.5 0 0 1 .276-.447l5.448-2.724A.5.5 0 0 0 7 7z" />
          </svg>
          <br />
          <p>직접 다녀온 여행 꿀팁과 추천 일정 확인하고 저장하기</p>
        </div>
        <div class="search-bar">
          <div class="search-word">
            <div class="search-icon">🔍</div>
            <input type="text" v-model="param.word" placeholder="검색어를 입력하세요" />
          </div>
          <select v-model="param.region">
            <option value="">지역</option>
            <option value="서울">서울</option>
            <option value="인천">인천</option>
            <option value="대전">대전</option>
            <option value="대구">대구</option>
            <option value="광주">광주</option>
            <option value="부산">부산</option>
            <option value="울산">울산</option>
            <option value="세종특별자치시">세종특별자치시</option>
            <option value="경기도">경기도</option>
            <option value="강원도">강원도</option>
            <option value="충청북도">충척북도</option>
            <option value="충청남도">충청남도</option>
            <option value="경상북도">경상북도</option>
            <option value="경상남도">경상남도</option>
            <option value="전라북도">전라북도</option>
            <option value="전라남도">전라남도</option>
            <option value="제주도">제주도</option>
          </select>
          <select v-model="param.order">
            <option value="">시간순</option>
            <option value="like">좋아요순</option>
            <option value="hit">조회수순</option>
          </select>
          <button type="submit" class="search-button">검색</button>
        </div>
      </div>
    </form>

    <div class="container">
      <div class="container d-flex row">
        <template v-for="article in articleList.articleList" :key="article.articleIdx">
          <ArticleListItem class="col-4" :article="article" :pgno="pgno"></ArticleListItem>
        </template>
      </div>
      <page-navigation :total-page="articleList.totalCount" :current-page="currentPage" @click-button="changeCurrentPage">

      </page-navigation>
    </div>
  </div>
</template>
<style scoped>
.outer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-family: 'Noto Sans KR', sans-serif;
}

.top-bar {
  width: 60vw;
  display: flex;
  justify-content: space-between;
}

form {
  position: fixed;
  top: 10vh;
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.text-div {
  float: left;
}

.text-div p {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 300;
}

.search-word {
  width: 70%;
  margin-right: 10px;
  position: relative;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #666;
  font-size: 18px;
}

input {
  width: calc(100% - 40px);
  padding: 12px;
  padding-left: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.search-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}


input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

select {
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.search-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 70px;
}

.article-item {
  width: calc(33.33% - 20px);
  margin: 10px;
}

.page-navigation {
  margin-top: 20px;
}





.top-bar {
  width: 60vw;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* Added to allow items to wrap to the next line */
}

.search-bar {
  display: flex;
  width: 100%;
}

.search-word {
  width: calc(70% - 10px); /* Adjusted width to make room for margin-right */
  margin-right: 10px;
  position: relative;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #666;
  font-size: 18px;
}

input {
  width: calc(100% - 40px);
  padding: 12px;
  padding-left: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

select {
  width: 20%;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.search-button {
  width: 20%;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

</style>
