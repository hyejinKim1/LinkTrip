<script setup>
import KakaoMap from "@/components/map/KakaoMap.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { ConsoleWriter } from "istanbul-lib-report";

const planData = ref({
  "placeOrder":[], 
  "planDTO": {
            "planIdx": 0,
            "planTitle": "",
            "region": "",
            "startDate": "",
            "period": 0,
            "userIdx": 0,
            "scrap": "F",
            "createAt": "",
            "updateAt": null,
            "deleteAt": null
        }
  });

const query = ref('');
const inputQuery = ref('');
const places = ref([]);
const day = ref(0);
const place = ref(0);

//plan 보여주기

onMounted(() => {
  getPlan();
})

const getPlan = () => {
  console.log(useRoute().params.planIdx);
  let baseUrl = "http://localhost/plan/viewPlan?"+"&planIdx=" + useRoute().params.planIdx;
  console.log(baseUrl);

  axios.get(baseUrl)
    .then((res) =>{
      console.log(res.data);
      planData.value = res.data.data;
      console.log(res.data.data);
      console.log(planData.value.placeOrder);
      console.log(planData.value.placeOrder.length);
    } );
}
function handleSearchInput() {
  query.value = " "+inputQuery.value;
}
function getRecommend() {
  query.value = " 명소";
}
function getRestaurant() {
  query.value = " 식당";
}
function getCafe() {
  query.value = " 카페";
}
function searchPlacesResult(result){
  console.log("emit result:");
  console.log(result);
  places.value = result;
}

// function dayAddBtn(index){
//   console.log(index);
// }

// function placeAddBtn(index){
//   console.log(index);
// }

</script>

<!-- <script>
export default {
  name: 'params',
  props: {
    pname: {
      type: String
    },
    sdate: {
      type: String
    },
    edate: {
      type: String
    },
    region: {
      type: String
    },
    planIdx: {
      type: Number
    }
  },
}
</script> -->

<template>
  <div class="update-wrapper">
    <div class="plan-div split">
      <div class="title-div">{{ planData.planDTO.planTitle }}</div>
      <div>{{ planData.planDTO.startDate }}</div>
      <div v-for="(day, index) in planData.placeOrder" :key="index" class="day-div">
        {{ index+1 }}일차 <button @click="dayAddBtn(index,$event)">추가</button>
        <div v-show="day.length==0">
          <p style="font-size:7px;">추가 버튼을 눌러 일정을 추가해주세요!</p>
        </div>
        <div v-show="day.length>0">
          <div v-for="(place, index) in day" :key="place">
          {{ place }}
          </div>
        </div>
      </div>
    </div>
    <div class="search-div">
      <input type="text" id="place-search" v-model="inputQuery" placeholder="장소 검색" @input="handleSearchInput" />
      <!-- <button @click="handleSearchInput">검색</button> -->
      <div class="search-btn-div">
        <button @click="getRecommend">명소</button>
        <button @click="getRestaurant">식당</button>
        <button @click="getCafe">카페</button>
      </div>
      <div v-if="places.length">
        <h2>검색 결과:</h2>
        <div v-for="(place, index) in places" :key="index" class="place-item-div">
          {{ place.place_name }}<br />
          {{ place.address_name }}<br />
          <button @click="placeAddBtn(index, $event)">+</button>
        </div>
      </div>
    </div>
    <div class="map-div split">
      <KakaoMap 
      :region="useRoute().params.region" 
      :query="query"
      @search-places="searchPlacesResult"/>
    </div>
  </div>
</template>

<style scoped>

.day-div{
  min-height: 10vh;
}
.update-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  text-align: center;
  padding-top: 15vh;
}

.split{
  height:100vh;
}

.plan-div {
  width: 20vw;
}
.search-div {
  width: 20vw;
}
.map-div{
  width:60vw;
}
.search-div {
  width: 20vw;
  height: 100vh;
  overflow: scroll;
}
.place-item-div {
  border: 1px solid black;
}

</style>