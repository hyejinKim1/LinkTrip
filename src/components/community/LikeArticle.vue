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
  let baseUrl = VITE_VUE_API_URL+"community/listLikedArticle?" + "userId=" + memberStore.userInfo.userId;
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
    <div>
        
    </div>
</template>

<style scoped>

</style>