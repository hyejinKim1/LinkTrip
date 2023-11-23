<script setup>
import articleDetail from '@/components/community/articleDetail.vue';
import planDetail from "./planDetail.vue";
import commentList from "./commentList.vue"
import { getViewArticle } from "@/api/article.js";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
// vscode - file://vscode-app/c:/Users/SSAFY/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html
// import router from './router'

const route = useRoute();

const param = ref({
    articleIdx: route.params.articleIdx
})
const props = defineProps({
    pgno : Number
});
const articleDetailResponse = ref();

async function init() {
    articleDetailResponse.value = await getViewArticle(param.value);
    console.log("articleDetailResponse : ", articleDetailResponse);
}

init();

</script>

<template>
        <div class="container">
            <div class="button-container">
            <button @click="goToList" class="btn btn-light">목록 보기</button>
            <button @click="onDelete" class="btn btn-danger">삭제</button>
            <button @click="goToModify" class="btn btn-outline-dark">수정</button>
            </div>
            <articleDetail :article="articleDetailResponse?.articleData"></articleDetail>
            <planDetail :plan="articleDetailResponse?.planData"></planDetail>
            <commentList :comment="articleDetailResponse?.commentData" :articleIdx="param.articleIdx"></commentList>
        </div>
</template>

<style scoped>

/* .container{
    width: 100vw;
    padding-top: 9vh;
    font-family: 'Noto Sans KR', sans-serif;
    overflow-x: hidden;
}

.btn{
    margin: 5px;
} */

.container {
    width: 100vw;
    padding-top: 9vh;
    font-family: 'Noto Sans KR', sans-serif;
    overflow-x: hidden;
}

.button-container {
    margin: 10px 0;
}

.btn {
    margin: 5px;
}
</style>