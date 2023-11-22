<script setup>
import {getArticleList} from "@/api/community";
import {ref} from "vue";
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
        <option value="like">좋아요순</option>
        <option value="">시간순</option>
        <option value="hit">조회수순</option>
      </select>
      <input type="text" v-model="param.word">
      <input type="submit" value="검색"/>
    </form>

    <div class="container">
      <div class="container d-flex row">
        <template v-for="article in articleList.articleList" :key="article.articleIdx">
          <ArticleListItem class="col-4" :article="article" :pgno="pgno"></ArticleListItem>
        </template>
      </div>
      <page-navigation
          :total-page="articleList.totalCount"
          :current-page="currentPage"
          @click-button="changeCurrentPage"
      >

      </page-navigation>
    </div>
  </div>
</template>

<style scoped>
.outer {
  /* padding: 150px; */
  padding-top: 9vh;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.container {
  /* width: 100%; */
}

</style>