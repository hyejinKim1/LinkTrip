<script setup>
import { getArticleList } from "@/api/community";
import { ref } from "vue";
// import { useMemberStore } from "../../stores/member";
import ArticleListItem from "./item/ArticleListItem.vue";

// const ms = useMemberStore();
const articleList = ref();
const param = ref({
  pgno: 1,
  region:'',
  order:'',
  word:''
})

async function init() {
  articleList.value = await getArticleList(param.value);
  console.log("article: ", articleList)
}

init();
</script>

<template>
  <div class="outer">
    <!-- <h1>community</h1> -->

    <div class="container">
      <div class="container d-flex row">
      <template v-for="article in articleList" :key="article.articleIdx">
      <ArticleListItem class="col-4" :article="article"> </ArticleListItem>
      </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outer{
  /* padding: 150px; */
  margin-top: 170px;
  display: flex;
  justify-content: center;
  width: 100%;
}
.container{
  /* width: 100%; */
}

</style>