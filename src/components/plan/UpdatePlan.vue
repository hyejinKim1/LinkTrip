<script setup>
import KakaoMap from "@/components/map/KakaoMap.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";


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
const dayAdd = ref(null);

const mapData = ref([]);
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
  query.value = planData.value.planDTO.region+" "+inputQuery.value;
}
function getRecommend() {
  query.value = planData.value.planDTO.region+" 명소";
}
function getRestaurant() {
  query.value = planData.value.planDTO.region+" 식당";
}
function getCafe() {
  query.value = planData.value.planDTO.region+" 카페";
}
function searchPlacesResult(result){
  console.log("emit result:");
  console.log(result);
  places.value = result;
}

function dayAddBtn(index){
  console.log("day "+index);
  dayAdd.value = index;
}

function closeDayAddBtn(){
  dayAdd.value = null;
}

function placeAddBtn(index){
  console.log("place "+index);
  console.log(places.value);
  planData.value.placeOrder[dayAdd.value].push(places.value[index]);
  console.log("planData ");
  console.log(planData.value.placeOrder);
  console.log("placeOrder ");
  console.log(planData.value.placeOrder[dayAdd.value]);
  mapData.value = planData.value.placeOrder[dayAdd.value];
  console.log("mapData ");
  console.log(mapData.value);
}

</script>

<template>
  <div class="update-wrapper">
    <div class="plan-div split">
      <div class="title-div">{{ planData.planDTO.planTitle }}</div>
      <div>{{ planData.planDTO.startDate }}</div>
      <div v-for="(day, index) in planData.placeOrder" :key="index" class="day-div">
        {{ index+1 }}일차 
        <span v-show="dayAdd!=index">
          <button @click="dayAddBtn(index)">추가</button>
        </span>
        <span v-show="dayAdd==index">
          <button @click="closeDayAddBtn()">닫기</button>
        </span>
        <div v-show="day.length==0">
          <p style="font-size:10px;">추가 버튼을 눌러 일정을 추가해주세요!</p>
        </div>
        <div v-show="day.length>0">
          <div v-for="(place, index) in day" :key="place">
          {{ place.place_name }}
          </div>
        </div>
      </div>
    </div>
    <div class="search-div" v-show="dayAdd!=null">
      {{ dayAdd+1 }}일차 장소 검색
      <input type="text" id="place-search" v-model="inputQuery" placeholder="검색어를 입력해주세요" @input="handleSearchInput" />
      <!-- <button @click="handleSearchInput">검색</button> -->
      <div class="search-btn-div">
        <button @click="getRecommend">명소</button>
        <button @click="getRestaurant">식당</button>
        <button @click="getCafe">카페</button>
      </div>
      <div v-if="places.length">
        <div v-for="(place, index) in places" :key="index" class="place-item-div">
          <a :href="place.place_url" target="_blank" rel="noopener noreferrer">{{ place.place_name }}</a>
          <div class="address-div">{{ place.address_name }}</div>
          <button @click="placeAddBtn(index)">+</button>
        </div>
      </div>
    </div>
    <div class="map-div split">
      <KakaoMap 
      :region="useRoute().params.region" 
      :query="query"
      :mapData="mapData"
      @search-places="searchPlacesResult"/>
    </div>
  </div>
</template>

<style scoped>

.day-div{
  min-height: 10vh;
}
.update-wrapper {
  font-family: 'Noto Sans KR', sans-serif;
  width: 100vw;
  height: 100vh;
  display: flex;
  text-align: center;
  padding-top: 15vh;
}

.split{
  height:85vh;
}

.plan-div {
  width: 15%;
}
.search-div {
  width: 15%;
}
.map-div{
  width:63%;
}
.search-div {
  width: 20vw;
  height: 85vh;
  overflow: scroll;
}
.place-item-div {
  border: 1px solid black;
  margin: 5px;
  border-radius: 10px;
}

.place-item-div a{
  text-decoration: none;
  font-weight: 700;
  color: black;
}

.place-item-div a:hover{
  font-weight: 1000;
  color:cornflowerblue;
}

.address-div{
  color: gray;
  font-size: 10px;
}

</style>