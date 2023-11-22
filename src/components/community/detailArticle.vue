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

// async function mvList() {
//     console.log("****", pgno);
//     router.push();
    

// }
</script>

<template>
    <!-- <div class="outer"> -->
        <!-- <button type="button" class="btn btn-outline-dark" @click="$router.push('/community')" style="margin-left:20px;">목록 보기</button> -->

        <div class="container">
            <!-- <button type="button" class="btn btn-light" @click="mvList()">목록 보기</button> -->
            <!-- <button @click="mvList()">목록 보기</button> -->
            <articleDetail :article="articleDetailResponse?.articleData"></articleDetail>
            <planDetail :plan="articleDetailResponse?.planData"></planDetail>
            <commentList :comment="articleDetailResponse?.commentData" :articleIdx="param.articleIdx"></commentList>
        </div>
    <!-- </div> -->
</template>

<style scoped>

.container{
    width: 100vw;
    height: 100vh;
    padding-top: 9vh;
    font-family: 'Noto Sans KR', sans-serif;
}
</style>