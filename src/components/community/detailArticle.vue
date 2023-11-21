<script setup>
import articleDetail from '@/components/community/articleDetail.vue';
import planDetail from "./planDetail.vue";
import commentList from "./commentList.vue"
import { getViewArticle } from "@/api/article.js";
import { useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute();

const param = ref({
    articleIdx: route.params.articleIdx
})

const articleDetailResponse = ref();

async function init() {
    articleDetailResponse.value = await getViewArticle(param.value);
    console.log("articleDetailResponse : ", articleDetailResponse);
}

init();
</script>

<template>
    <div class="outer">
        <div class="container">
            <articleDetail :article="articleDetailResponse?.articleData"></articleDetail>
            <planDetail :plan="articleDetailResponse?.planData"></planDetail>
            <commentList :comment="articleDetailResponse?.commentData"></commentList>
        </div>
    </div>
</template>

<style scoped>
.container{
    margin-top: 170px;
  /* display: flex; */
  justify-content: center;
  
}
</style>