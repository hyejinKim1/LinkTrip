<script setup>
import KakaoMap from "@/components/map/KakaoMap.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import draggable from 'vuedraggable';
const { VITE_VUE_API_URL } = import.meta.env;

// const planData = ref({
//   "placeOrder": [],
//   "planDTO": {
//     "planIdx": 0,
//     "planTitle": "",
//     "region": "",
//     "startDate": "",
//     "period": 0,
//     "userIdx": 0,
//     "scrap": "F",
//     "createAt": "",
//     "updateAt": null,
//     "deleteAt": null
//   }
// });

const query = ref('');
const inputQuery = ref('');
const places = ref([]);
const dayAdd = ref(null);

const placeOrder = ref([]);
const planDTO = ref([]);
const region = ref("서울");

//plan 보여주기

onMounted(() => {
  getPlan();
})

const getPlan = () => {
  console.log(useRoute().params.planIdx);
  let baseUrl = VITE_VUE_API_URL+"plan/viewPlan?" + "&planIdx=" + useRoute().params.planIdx;
  console.log(baseUrl);

  axios.get(baseUrl)
    .then((res) => {
      planDTO.value = res.data.data.planDTO;
      placeOrder.value = res.data.data.placeOrder;
      console.log(res.data.data);
      mapData.value = placeOrder.value[0];
      region.value = planDTO.value.region;
    });
}

function handleSearchInput() {
  query.value = planDTO.value.region + " " + inputQuery.value;
}
function getRecommend() {
  query.value = planDTO.value.region + " 명소";
}
function getRestaurant() {
  query.value = planDTO.value.region + " 식당";
}
function getCafe() {
  query.value = planDTO.value.region + " 카페";
}
function searchPlacesResult(result) {
  console.log("emit result:");
  console.log(result);
  places.value = result;
}

function closeSearch() {
  var map = document.getElementsByClassName("map-div");
  for (var i = 0; i < map.length; i++) {
    map[i].style.width = "82vw";
  }
  var map = document.getElementsByClassName("search-div")[0].style.width = "0vw";
}

function openSearch() {
  var map = document.getElementsByClassName("map-div");
  for (var i = 0; i < map.length; i++) {
    map[i].style.width = "65vw";
  }
  var map = document.getElementsByClassName("search-div")[0].style.width = "17vw";
}

function closeDayAddBtn() {
  mapData.value = placeOrder.value[dayAdd.value];
  closeSearch();
}

function selectDay(index) {
  dayAdd.value = index;
  mapData.value = placeOrder.value[index];
}

function openSearchBtn (){
  openSearch();
  dayAdd.value = index;
}

const mapData = ref({
  // "placeIdx": 0,
  "lat": 0,
  "lon": 0,
  "placeName": '',
  // "createAt": null
});

function savePlan() {
  // dayAdd.value = null;
  let baseUrl = VITE_VUE_API_URL+"plan/savePlan?";
  console.log(baseUrl);
  console.log("placeOrder 저장")
  console.log(placeOrder.value);
  axios.post(baseUrl, {
    planIdx: planDTO.value.planIdx,
    startDate: planDTO.value.startDate.split('T')[0],
    period: planDTO.value.period,
    placeList: placeOrder.value,
  }).then((res) => {
    console.log("저장완료!");
    console.log(res.data);
  });
}

function placeAddBtn(index) {
  console.log("placeOrder day" + index);
  console.log(placeOrder.value[dayAdd.value]);
  placeOrder.value[dayAdd.value].push({
    "lat": places.value[index].x,
    "lon": places.value[index].y,
    "placeName": places.value[index].place_name,
    "placeUrl": places.value[index].place_url
  });
  mapData.value = placeOrder.value[dayAdd.value];
  console.log("mapData ");
  console.log(mapData.value);
  savePlan();
}


function onChange(index) {
  // 이동이 끝날 때 호출되는 콜백 함수
  // 여기서 새로운 순서로 정렬된 배열을 사용할 수 있습니다.
  mapData.value = placeOrder.value[index];
  console.log('New order:', placeOrder.value[index]);
  savePlan();
}

</script>

<template>
  <div class="update-wrapper">
    <div class="plan-div split">
      <div class="title-div">{{ planDTO.planTitle }}</div>

      <div>{{ new Date(planDTO.startDate).toLocaleDateString() }}
        ~
        {{ new Date(new Date(planDTO.startDate).setDate(new
          Date(planDTO.startDate).getDate() + planDTO.period)).toLocaleDateString() }}</div>

      <div>
        {{ planDTO.region }}
      </div>
      <div v-for="(day, index) in placeOrder" :key="index" class="day-div" @click="selectDay(index)">
        <h5>Day{{ index + 1 }}</h5>
        <div style="font-size:12px; color: gray;">{{ new Date(new Date(planDTO.startDate).setDate(new
          Date(planDTO.startDate).getDate() + index)).toLocaleDateString() }}</div>
        <!-- <span v-show="dayAdd != index">
                <button @click="dayAddBtn(index)">추가</button>
              </span> -->
        <div v-show="day.length == 0">
          <p style="font-size:10px;">day{{ index + 1 }} 일정이 없습니다</p>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-calendar-plus hover-scale"
          viewBox="0 0 16 16" @click="openSearchBtn">
          <path
            d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7" />
          <path
            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
        </svg>

        <div v-show="day.length > 0">
          <draggable class="list-group" :component-data="{
            tag: 'ul',

            type: 'transition-group',
            name: !drag ? 'flip-list' : null
          }" v-model="placeOrder[index]" v-bind="dragOptions" @start="drag = true" @end="onChange(index)"
            item-key="order">
            <template #item="{ element }">
              <div class="placeOrder-div">
                {{ element.placeName }}
              </div>
            </template>
          </draggable>

        </div>
      </div>
    </div>
    <div class="search-div">
      Day{{ dayAdd + 1 }} 장소 검색
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
        class="bi bi-x-square-fill close-btn hover-scale" viewBox="0 0 20 20" @click="closeDayAddBtn()">
        <path
          d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
      </svg>

      <!-- <input type="text" id="place-search" v-model="inputQuery" placeholder="검색어를 입력해주세요" @input="handleSearchInput" /> -->

      <div class="input-search-div">
        <input type="text" placeholder="추가할 장소를 검색해보세요" v-model="inputQuery" @input="handleSearchInput" required>
      </div>

      <div class="search-btn-div">
        <button @click="getRecommend" class="button">명소</button>
        <button @click="getRestaurant" class="button">식당</button>
        <button @click="getCafe" class="button">카페</button>
      </div>

      <div v-if="places.length">
        <div v-for="(place, index) in places" :key="index" class="place-item-div">
          <a :href="place.place_url" target="_blank" rel="noopener noreferrer">{{ place.place_name }}</a>
          <div class="address-div">{{ place.address_name }}</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
            class="bi bi-bookmark-plus hover-scale" viewBox="0 0 20 20" @click="placeAddBtn(index)">
            <path
              d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
            <path
              d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4" />
          </svg>
        </div>
      </div>
    </div>
    <div class="map-div">
      <KakaoMap :region="region" :query="query" :mapData="mapData" @search-places="searchPlacesResult" />
    </div>
  </div>
</template>

<style scoped>
.update-wrapper {
  font-family: 'Noto Sans KR', sans-serif;
  width: 100vw;
  height: 100vh;
  display: flex;
  text-align: center;
  padding-top: 8vh;
}

.day-div {
  background-color: #c4e3fd;
  border-radius: 20px;
  margin: 5px;
  padding: 5px;
}

.day-div:hover {
  background-color: rgb(228, 240, 248);
}

.placeOrder-div {
  background-color: rgb(228, 240, 248);
  border-radius: 20px;
  margin: 5px;
  min-height: 15px;
  padding: 5px;
}

.placeOrder-div:hover {
  background-color: white;
  transform: scale(1.07);
}

.title-div {
  font-size: 28px;
  font-weight: 700;
}

.plan-div {
  width: 17vw;
  height: 92vh;
  overflow-y: scroll;
}

.plan-div::-webkit-scrollbar {
  width: 10px;
}

.plan-div::-webkit-scrollbar-thumb {
  background-color: rgb(228, 240, 248);
  border-radius: 10px;
}

.plan-div::-webkit-scrollbar-track {
  background-color: white;
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px white;
}

.map-div {
  width: 82vw;
  height: 90vh;
  padding: 10px;
  border-radius: 10px;
}

.search-div {
  width: 0;
  height: 92vh;
  overflow: scroll;
}

.search-div::-webkit-scrollbar {
  width: 10px;
}

.search-div::-webkit-scrollbar-thumb {
  background-color: rgb(228, 240, 248);
  border-radius: 10px;
}

.search-div::-webkit-scrollbar-track {
  background-color: white;
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px white;
}

.place-item-div {
  background-color: rgb(208, 231, 245);
  margin: 5px;
  border-radius: 10px;
}

.place-item-div a {
  text-decoration: none;
  font-weight: 700;
  color: black;
}

.place-item-div a:hover {
  font-weight: 1000;
  color: cornflowerblue;
}

.address-div {
  color: gray;
  font-size: 10px;
}

.button {
  width: 63px;
  height: 35px;
  font-size: 13px;
  font-weight: 700;
  font-weight: 800;
  color: #000;
  background-color: rgb(208, 231, 245);
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(65, 65, 65, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin: 5px;
}

.button:hover {
  background-color: rgb(163, 217, 248);
  box-shadow: 0px 15px 20px rgba(145, 211, 255, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

.hover-scale:hover {
  transform: scale(1.1);
}

.close-btn {
  float: right;
  margin: 10px;
}

/* input */

.input-search-div div {
  position: relative;
  width: 200px;
  margin-left: 50px;
  margin-top: 100px;
  box-sizing: border-box;
}

.input-search-div input {
  font-size: 15px;
  color: #222222;
  width: 230px;
  border: none;
  border-bottom: solid #aaaaaa 1px;
  padding-bottom: 10px;
  text-align: center;
  position: relative;
  background: none;
  z-index: 5;
}

.input-search-div input::placeholder {
  color: #aaaaaa;
}

.input-search-div input:focus {
  outline: none;
}

.input-search-div span {
  display: block;
  position: absolute;
  bottom: 0;
  left: 50%;
  /* right로만 바꿔주면 오 - 왼 */
  background-color: #666;
  width: 0;
  height: 2px;
  border-radius: 2px;
  transform: translateX(-50%);
  transition: 0.5s;
}</style>