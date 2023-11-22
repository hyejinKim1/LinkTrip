<script setup>
import { useRouter } from "vue-router";
import { createLike, createScrap, checkLikeArticle, createLikeArticle, deleteLikeArticle } from "@/api/community";
import { ref } from "vue";
import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();

const router = useRouter();

const props = defineProps({
    article: Object,
    pgno : Number
}); 

const isLike = ref(0);
async function onCheckLikeArticle() {
  isLike.value = await checkLikeArticle({
    userId: memberStore.userInfo.userId,
    articleIdx: props.article.articleIdx
  });
}
onCheckLikeArticle();

async function onCreateLike() {
  console.log("onclick");
  console.log(isLike.value);

  if (isLike.value === 0) {
    //isLike에 데이터 생성
    await createLikeArticle({
      userId: memberStore.userInfo.userId,
      articleIdx: props.article.articleIdx
    })
    //isLike 값 변경 
    isLike.value = 1;
  }
  else {
    //isLike에 데이터 삭제
    await deleteLikeArticle({
      userId: memberStore.userInfo.userId,
      articleIdx: props.article.articleIdx
    })
    //isLike 값 변경 
    isLike.value = 0;
  }
}

const newScrapPlanIdx = ref(0); //새로 createScrap하고 나서 생긴 plan의 Idx를 저장해놔야 스크랩 취소를 했을 때 삭제할 수 있음 
const isScrap = ref(props.article.scrap);

async function onClickScrap() {
  console.log('createScrap');

  await createScrap({
    userId: memberStore.userInfo.userId,
    articleIdx : props.article.articleIdx
  })

  //확인창 띄우기
  alert("담은 일정에 추가되었어요. 자신만의 일정으로 수정해보세요!");
}

async function onClickCard() {
  // router.push({ name: 'detailArticle', params: { articleIdx: props.articleIdx }});
  router.push({ name: "detailArticle", params: { articleIdx: props.article.articleIdx } });
  console.log("onClickCard");


  //디비에서 해당 articleIdx에 대해 해당 유저가 하트를 눌렀으면 색을 바꿔줌
  //
}
</script>

<template>

<!-- {{ article }} -->

        <div class="card container" @click="onClickCard()">
            <!-- <router-link :to="`community/detailArticle/${article.articleIdx}`" :pgno="pgno"> -->
              <div style="position:relative; height: 200px;">
                <img src="@/assets/img/region/jeju/jeju1.jpg" class="card-img-top" alt="...">
                <img src="@/assets/img/icon/save_empty.png" class="card-img-haert in_box" alt="" @click.stop="onClickScrap()">
                <!-- <img src="@/assets/img/icon/dowload_icon.png" class="card-img-haert in_box" alt="" @click.stop="onClickScrap()"> -->
              
              </div>
            
            <div class="card-body">
                <h5 class="card-title">{{ article.articleTitle}}</h5>
                <p class="card-text">{{ article.content}}</p>

                <img v-if="isLike===0" src="@/assets/img/icon/heart_empty.png" class="card-img-haert" alt="" @click.stop="onCreateLike()">
                <img v-else src="@/assets/img/icon/heart_full.png" class="card-img-haert" alt="" @click.stop="onCreateLike()">

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
  /* bottom: 0px; */
  right: 10px;
}

.in_box:hover{
  transform: scale(1.1);

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