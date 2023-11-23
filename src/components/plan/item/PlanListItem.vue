<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
const { VITE_VUE_API_URL } = import.meta.env;
const router = useRouter();


const props = defineProps({ planList: Object });
console.log(123123)
console.log(props.planList);

function createArticle() {
  console.log("onClickcreate");
  router.push({ name: "createArticle", params: { planIdx: props.planList.planIdx } });
}

function clickPlan() {
  console.log("onClickcard");
  router.push({ name: "detailPlan", params: { planIdx: props.planList.planIdx } });
}

function deletePlan(){
  let baseUrl = VITE_VUE_API_URL+"plan/deletePlan?"+"planIdx="+props.planList.planIdx;
  console.log("onClickdelete");
  axios.delete(baseUrl).then((res) => {
      location.reload();
      console.log(res.data);
  })
};

</script>

<template>
  <!-- <router-link :to="`/detailPlan/${planList.planIdx}`">
            <div class="planList">
                {{ planList.planTitle }}
                {{ planList.startDate }}
                {{ planList.region }}
            </div>
        </router-link> -->

  <div class="card col-lg-3 col-sm-12 mx-3 my-3 card-container">
    <div style="text-decoration:none; color: black" @click="clickPlan">
      <img src="@/assets/img/region/jeju/jeju2.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h2 class="card-title title">{{ planList.planTitle }}</h2>
        <p class="card-text txt">
          {{ new Date(planList.startDate).toLocaleDateString() }}
          ~
          {{ new Date(new Date(planList.startDate).setDate(new
            Date(planList.startDate).getDate() + planList.period)).toLocaleDateString() }}</p>
        <p class="card-text txt">{{ planList.region }}</p>
      </div>

      <div class="create-article">
        <div style="font-size:10px; color: gray;">여행후기를 작성하고 다른 사용자들과 일정을 공유해보세요! </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
            class="bi bi-pencil-square btn-hover" viewBox="0 0 16 16" @click.stop="createArticle">
            <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
          </svg>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-trash3-fill btn-hover"
            viewBox="0 0 16 16" @click.stop="deletePlan">
            <path
              d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
          </svg>
        </div>
      </div>

    </div>
  </div>
</template>
<style scoped>
.create-article {
  float: right;
  margin: 5px;
}

.create-article div {
  display: inline-block;
  margin: 5px;
}

.btn-hover:hover {
  transform: scale(1.15);
}

.title {
  font-weight: 900;
  color: rgb(91, 91, 91);
}

.card {
  display: inline-block;
  padding: 10px;
  margin: 10px;
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
}</style>
