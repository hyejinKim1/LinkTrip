<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { listLikedArticle } from "@/api/community.js";
import PageNavigation from "./PageNavigation.vue";

const memberStore = useMemberStore();
const router = useRouter();

const LikeArticle = ref([]);

const param = ref({
    pgno: 1,
    userId: memberStore.userInfo.userId
});

const currentPage = ref(1);

async function init() {
    LikeArticle.value = await listLikedArticle(param.value);
    console.log("LikeArticle : ", LikeArticle.value);
}

function changeCurrentPage(pageNumber) {
    currentPage.value = pageNumber;
    param.value.pgno = pageNumber;
    init();
}

function onClickCard(articleIdx) {
    router.push({ name: "detailArticle", params: { articleIdx: articleIdx } });
    console.log("onClickCard");
}

init();
</script>

<template>
  <div id="container" class="container">
    <h3>좋아요한 여행후기</h3>
    <hr/>
    <div class="row">
      <div class="article col-lg-3" v-for="article in LikeArticle.articleList" :key="article.articleIdx" @click="onClickCard(article.articleIdx)">
        <h2 class="card-title">{{ article.articleTitle }}</h2>
        <p class="card-text">{{ article.content }}</p>
        <p class="date card-text">Created at: {{ article.createAt }}</p>
      </div>
    </div>
    <page-navigation
      :total-page="LikeArticle.totalCount"
      :current-page="currentPage"
      @click-button="changeCurrentPage"
    ></page-navigation>
  </div>
</template>

<style scoped>
#container {
  font-family: 'Noto Sans KR', sans-serif;
  height: 100vh;
  width: 100vw;
  padding-top: 9vh;
  overflow: hidden;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.article {
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
  width: 40vw;
  box-sizing: border-box;
  transition: background-color 0.3s;
  cursor: pointer;
}

.article:hover {
  background-color: #e0e0e0;
}

h2 {
  color: #333;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 20px;
  margin-bottom: 10px;
}

p {
  color: #666;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
}

.date {
  color: #999;
  font-size: 14px;
}
</style>
