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
    <h1>community</h1>

    <div class="container">
      <template v-for="article in articleList"
      :key="article.articleIdx">
      <ArticleListItem :article="article">
      </ArticleListItem>
      </template>
    </div>
  </div>
</template>

<style scoped>
.outer{
  padding: 100px;
  display: flex;
  justify-content: center;
}
.container{
  width: 80%;
}

</style>