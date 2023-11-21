<script setup>
import { getArticleList } from "@/api/community";
import { ref } from "vue";
// import { useMemberStore } from "../../stores/member";
import ArticleListItem from "./item/ArticleListItem.vue";
import PageNavigation from "./PageNavigation.vue"

// const ms = useMemberStore();
const articleList = ref({
  articleList: [
    
  ]
});
const param = ref({
  pgno: 1,
  region:'',
  order:'',
  word:''
})

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

    <div class="container">
      <div class="container d-flex row">
      <template v-for="article in articleList.articleList" :key="article.articleIdx">
      <ArticleListItem class="col-4" :article="article" :pgno="pgno"> </ArticleListItem>
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