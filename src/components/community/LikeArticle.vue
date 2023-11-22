<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
// import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();
const { VITE_VUE_API_URL } = import.meta.env;

const LikeArticle = ref([]);

onMounted(() => {
  getLikeArticle();
})

const getLikeArticle = () => {
  let baseUrl = VITE_VUE_API_URL + "community/listLikedArticle?" + "userId=" + memberStore.userInfo.userId;
  console.log(baseUrl);

  axios.get(baseUrl)
    .then((res) => {
      console.log(res);
      console.log(res.data.articleList);
      LikeArticle.value = res.data.articleList;
    });
}
</script>

<template>
  <div id="container" class="container">
    <div class="row">
      <div class="article col-lg-3" v-for="article in LikeArticle" :key="article.articleIdx">
        <h2 class="card-title">{{ article.articleTitle }}</h2>
        <p class="card-text">{{ article.content }}</p>
        <p class="date card-text">Created at: {{ article.createAt }}</p>
      </div>
    </div>
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