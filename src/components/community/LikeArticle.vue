<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { listLikedArticle } from "@/api/community.js";
import PageNavigation from "./PageNavigation.vue"
const memberStore = useMemberStore();
const router = useRouter();


const LikeArticle = ref([]);

// onMounted(() => {
//   getLikeArticle();
// })

const param = ref({
    pgno: 1,
    userId : memberStore.userInfo.userId
});

// const getLikeArticle = () => {
//   let baseUrl = VITE_VUE_API_URL + "community/listLikedArticle?" + "userId=" + memberStore.userInfo.userId;
//   console.log(baseUrl);

//   axios.get(baseUrl)
//     .then((res) => {
//       console.log(res);
//       console.log(res.data.articleList);
//       LikeArticle.value = res.data.articleList;
//     });
// }
const currentPage = ref(1);
function changeCurrentPage(pageNumber) {
  currentPage.value = pageNumber;
  param.value.pgno = pageNumber;
  init();
}

async function init() {
  LikeArticle.value = await listLikedArticle(param.value);

  // const arr = await listLikedArticle(param.value);
  // LikeArticle.value =arr.LikeArticle
  console.log("LikeArticle : ", LikeArticle.value);
    // console.log("$$$$ : "+ LikeArticle.)
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