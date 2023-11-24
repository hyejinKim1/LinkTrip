<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  article: Object
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
    <!-- <div class="img-div">
            <div v-for="(img, index) in article.files" :key="index" class="img-wrapper">
              <img :src="img"/>
            </div>
          </div> -->

          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(img, index) in article.files" :key="index" class="carousel-item" :class="{ active: index === 0 }">
          <img class="d-block w-100" :src="img" alt="Slide {{ index + 1 }}" />
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
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
  height: 15px;
  margin-left: auto;
  margin-right: auto;
}

.img-div {
  display: flex;
  height: 70vh;
  overflow-y: scroll;
}

.img-wrapper {
  display: inline-block;
  margin: 10px;
  width: 50vw;
  height: 70vh;
}

.img-wrapper img {
  width: 50vw;
  height: 70vh;
}

.block {
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: 100%;
}

.center {
  display: block;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}

.font {
  font-family: 'Noto Sans KR', sans-serif;
}

.article-title {
  background-color: white;
  width: 100vw;
}

/* .margin-top{
  margin-top: 20vh;
} */
</style>