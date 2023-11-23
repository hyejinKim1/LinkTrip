<script setup>
import {ref} from "vue";
const props = defineProps({
    article : Object
});
console.log(props.article);
// console.log("files", props.article.value.files);
</script>

<template>
  <div class="center font margin-top">
        <!-- {{ article }} -->
        <!-- {{ article.files }} -->
        <div class="article-title">
      <h2>{{ article.articleTitle }}</h2>
      <h6>{{ article.createAt }}</h6>
      </div>
        <br>
        {{ article.content }}
        <!-- <img class="logo block" src="@/assets/img/여권사진.png"/> -->
        <div class="img-div">
          <div v-for="(img, index) in article.files" :key="index" class="img-wrapper">
            
            <img :src="img"/>
          </div>
        </div>
        <div class="divider"></div>
        <div class="divider back"></div>
  </div>
</template>

<style scoped>

.back {
    background-color: rgb(239, 239, 239);
}

.divider {
    height : 15px;
  margin-left: auto;
  margin-right: auto;
}

.img-div{
  display: flex;
}

.img-wrapper{
  margin:10px;
  max-width: 100px;
}

.block {
    margin-left: auto;
  margin-right: auto;
  display: block;
  width : 100%;
}

.center {
  display: block;
  width : 60%;
  margin-left: auto;
  margin-right: auto;
}

.font {
    font-family: 'Noto Sans KR', sans-serif;
}

.article-title{
  background-color: white;
  width: 100vw;
}

/* .margin-top{
  margin-top: 20vh;
} */
</style>