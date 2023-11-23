<script setup>
import articleDetail from '@/components/community/articleDetail.vue';
import planDetail from "./planDetail.vue";
import commentList from "./commentList.vue"
import { getViewArticle } from "@/api/article.js";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const { VITE_VUE_API_URL } = import.meta.env;

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

function deleteArticle(){
    let baseUrl = VITE_VUE_API_URL+"community/deleteArticle?"+"articleIdx="+param.value.articleIdx;
  console.log("onClickdelete");
  axios.delete(baseUrl).then((res) => {
      router.push("/community");
      console.log(res.data);
  })
}

init();


</script>

<template>
        <div class="container">
            <div class="button-container">
            <button @click="$router.push('/community')" class="btn btn-light">목록 보기</button>
            <button @click="$router.push('/community/modifyArticle/'+$route.params.articleIdx)" class="btn btn-outline-dark">수정</button>
            <button @click="deleteArticle" class="btn btn-danger">삭제</button>
            </div>
            <articleDetail :article="articleDetailResponse?.articleData"></articleDetail>
            <planDetail :plan="articleDetailResponse?.planData"></planDetail>
            <commentList :comment="articleDetailResponse?.commentData" :articleIdx="param.articleIdx"></commentList>
        </div>
</template>

<style scoped>

.container {
    width: 100vw;
    padding-top: 9vh;
    font-family: 'Noto Sans KR', sans-serif;
    overflow-x: hidden;
}

.button-container {
  width : 30%;
  float: right;
}

.btn {
    margin-right: 10px;
}
</style>