<script setup>

import {ref} from "vue";
import {createArticle} from "@/api/community";
import {useRoute} from "vue-router";

const route = useRoute()

const article = ref({
  articleTitle: '',
  content: '',
  planIdx: route.params.planIdx
})

function onCreate() {
  createArticle(article.value)
}

</script>

<template>
  {{article}}
  <form @submit.prevent="onCreate">
    <input type="text" v-model="article.articleTitle">
    <input type="text" v-model="article.content">
    <input type="submit" value="작성">
  </form>
</template>

<style scoped>

</style>
