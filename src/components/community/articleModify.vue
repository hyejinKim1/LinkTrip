<script setup>

import {ref} from "vue";
import {updateArticle} from "@/api/community";
import {useRoute} from "vue-router";
import {getViewArticle} from "@/api/article";

const route = useRoute()

const article = ref(
  {
    articleTitle: '',
    content: ''
  }
)


function onModify() {
  console.log(article.value)
  updateArticle(article.value)
}

async function init() {
  article.value = await getViewArticle({
    articleIdx: route.params.articleIdx
  });
}

init()
</script>

<template>
  {{ article }}
  <form @submit.prevent="onModify">
    <input type="text" v-model="article.articleTitle">
    <input type="text" v-model="article.content">
    <input type="submit" value="수정">
  </form>
</template>

<style scoped>

</style>