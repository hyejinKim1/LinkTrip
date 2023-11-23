<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { listMyArticle } from "@/api/community.js";
import { useMemberStore } from "@/stores/member";
import PageNavigation from "./PageNavigation.vue"

const memberStore = useMemberStore();
const router = useRouter();

const myArticle = ref([]);

//param을 가지고 myArticle list를 뽑아옴 
const param = ref({
    pgno: 1,
    userId : memberStore.userInfo.userId
});

const currentPage = ref(1);
function changeCurrentPage(pageNumber) {
  currentPage.value = pageNumber;
  param.value.pgno = pageNumber;
  init();
}



async function init() {
    console.log("my article 함수 호출");
    myArticle.value = await listMyArticle(param.value);
    console.log("myArticle : ", myArticle.value);
}

init();


function onClickCard(articleIdx) {
  router.push({ name: "detailArticle", params: { articleIdx: articleIdx } });
  console.log("onClickCard");
}
</script>

<template>
  <div id="container" class="container">
    <div class="row">
      
      <div class="article col-lg-3" v-for="article in myArticle.articleList" :key="article.articleIdx" @click="onClickCard(article.articleIdx)">
        <h2 class="card-title">{{ article.articleTitle }}</h2>
        <p class="card-text">{{ article.content }}</p>
        <p class="date card-text">Created at: {{ article.createAt }}</p>
      </div>

      
    </div>
    <page-navigation
          :total-page="myArticle.totalCount"
          :current-page="currentPage"
          @click-button="changeCurrentPage"
      >
      </page-navigation>
  </div>
</template>

<style scoped>
/* #container{
  margin-top:9vh;

  width: 100vw;
} */

#container {
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
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
  width: 40vw;
  box-sizing: border-box;
}

h2 {
  color: #333;
}

p {
  color: #666;
}

.date {
  color: #999;
  font-size: 14px;
}
</style>