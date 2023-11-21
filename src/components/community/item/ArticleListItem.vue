<script setup>
import { useRouter } from "vue-router";
import { createLike } from "@/api/community";
const router = useRouter();

const props = defineProps({
    article: Object,
    pgno : Number
});
console.log(props.article)

async function onCreateLike() {
  // await createLike({
  //    userId :
  //    articleIdx : article.articleIdx
  //   })
}

async function onClickCard() {
  // router.push({ name: 'detailArticle', params: { articleIdx: props.articleIdx }});
  router.push({ name: "detailArticle", params: { articleIdx : props.article.articleIdx } });
}
</script>

<template>
        <div class="card container" @click="onClickCard()">
            <!-- <router-link :to="`community/detailArticle/${article.articleIdx}`" :pgno="pgno"> -->
              <div style="position:relative; height: 200px;">
                <img src="@/assets/img/region/jeju/jeju1.jpg" class="card-img-top" alt="...">
                <img src="@/assets/img/icon/save_empty.png" class="card-img-haert in_box" alt="" @click.stop="OnClickLike()">
              </div>
            
            <div class="card-body">
                <h5 class="card-title">{{ article.articleTitle}}</h5>
                <p class="card-text">{{ article.content}}</p>

                <img src="@/assets/img/icon/heart_empty.png" class="card-img-haert" alt="" @click.stop="OnClickLike()">
                

                <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                <!-- <router-link to="/detailArticle" class="nav-link"><p>일정 생성</p></router-link> -->
            </div>
            <!-- </router-link> -->
        </div>
</template>

<style scoped>

.in_box {
  position: absolute;
  top: 10px;
  right: 10px;
}
.card-img-haert{
  height : 25px;
  margin-right : 5px;

}
.card{
    display:inline-block;
    padding: 10px;
    margin: 10px;
    /* width: 33%; */
    /* height: 150px; */
      width: 30%;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

}

.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  max-height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 16px;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.card-text {
  color: #555;
  text-overflow: ellipsis; 
  overflow: hidden;
  white-space: nowrap;
}
</style>