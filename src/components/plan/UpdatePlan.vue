<script setup>
import KakaoMap from "@/components/map/KakaoMap.vue";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import draggable from 'vuedraggable';

const planData = ref({
  "placeOrder": [],
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

const edit = ref(false);

const placeOrder = ref([]);
const planDTO = ref([]);

//plan 보여주기

onMounted(() => {
  getPlan();
})

const getPlan = () => {
  console.log(useRoute().params.planIdx);
  let baseUrl = "http://localhost/plan/viewPlan?" + "&planIdx=" + useRoute().params.planIdx;
  console.log(baseUrl);

  axios.get(baseUrl)
    .then((res) => {
      // planData.value = res.data.data;
      planDTO.value = res.data.data.planDTO;
      placeOrder.value = res.data.data.placeOrder;
      console.log(res.data.data);
      console.log("PlaceOrder");
      console.log(placeOrder.value);
      mapData.value = placeOrder.value[0];
      // console.log(planData.value.placeOrder);
      // console.log(planData.value.placeOrder.length);
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
  +
    console.log("emit result:");
  console.log(result);
  places.value = result;
}

function dayAddBtn(index) {
  console.log("day " + index);
  dayAdd.value = index;
  mapData.value = placeOrder.value[dayAdd.value];
  var map = document.getElementsByClassName("map-div");
  for (var i = 0; i < map.length; i++) {
    map[i].style.width = "66vw";
  }

}

function closeDayAddBtn() {
  dayAdd.value = null;
  var map = document.getElementsByClassName("map-div");
  for (var i = 0; i < map.length; i++) {
    map[i].style.width = "83vw";
  }
}

function viewRoute(index) {
  mapData.value = placeOrder.value[index];
}

const mapData = ref({
  // "placeIdx": 0,
  "lat": 0,
  "lon": 0,
  "placeName": '',
  // "createAt": null
});

function placeAddBtn(index) {
  console.log("placeOrder day" + index);
  console.log(placeOrder.value[dayAdd.value]);
  placeOrder.value[dayAdd.value].push({
    // "placeIdx": 0,
    "lat": places.value[index].x,
    "lon": places.value[index].y,
    "placeName": places.value[index].place_name,
    "placeUrl": places.value[index].place_url
    // "createAt": null
  });
  mapData.value = placeOrder.value[dayAdd.value];
  console.log("mapData ");
  console.log(mapData.value);
}

function savePlan() {
  edit.value = false;
  dayAdd.value = null;

  //   int planIdx;
  // 	String startDate;
  // 	int period;
  // 	List<PlaceDTO>[] placeList;

  let baseUrl = "http://localhost/plan/savePlan?";
  console.log(baseUrl);
  console.log("placeOrder 저장")
  console.log(placeOrder.value);
  axios.post(baseUrl, {
    planIdx: planDTO.value.planIdx,
    startDate: planDTO.value.startDate.split('T')[0],
    period: planDTO.value.period,
    placeList: placeOrder.value,
  }).then((res) => {
    console.log(res.data);
  });
}

function onOrderChange(event) {
  // 이동이 끝날 때 호출되는 콜백 함수
  // 여기서 새로운 순서로 정렬된 배열을 사용할 수 있습니다.
  console.log('New order:', placeOrder);
}

const drag = ref(false)
const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
  };
})

function onChange() {
  console.log('sdf')
}
const list = ref([
  { name: 1, order: 1 },
  { name: 2, order: 2 },
  { name: 3, order: 3 },
  { name: 4, order: 4 },
])

</script>

<template>
  <div class="update-wrapper">
    <div class="plan-div split">
      <div class="title-div">{{ planDTO.planTitle }}</div>
      <div>{{ new Date(planDTO.startDate).toLocaleDateString() }}
        ~
        {{ new Date(new Date(planDTO.startDate).setDate(new
        Date(planDTO.startDate).getDate() + planDTO.period)).toLocaleDateString() }}</div>
      <div v-show="!edit"><button @click="edit = !edit">편집</button></div>
      <div v-show="edit"><button @click="savePlan">저장</button></div>


      <div v-for="(day, index) in placeOrder" :key="index" class="day-div" @click="viewRoute(index)">
        Day{{ index + 1 }}
        <div style="font-size:12px; color: gray;">{{ new Date(new Date(planDTO.startDate).setDate(new
          Date(planDTO.startDate).getDate() + index)).toLocaleDateString() }}</div>
        <span v-show="dayAdd != index && edit">
          <button @click="dayAddBtn(index)">추가</button>
        </span>
        <span v-show="dayAdd == index && edit">
          <button @click="closeDayAddBtn()">닫기</button>
        </span>
        <div v-show="day.length == 0">
          <p style="font-size:10px;">day{{ index + 1 }} 일정이 없습니다</p>
        </div>
        <div v-show="day.length > 0">
          <!-- <draggable v-for="(day, index) in placeOrder" :key="index" :list="day" group="placeOrder" @change="onDragEnd" > -->
          <!-- <div v-for="(place, placeIndex) in day" :key="placeIndex" class="placeOrder-div">
                {{ place.placeName }}
              </div> -->
          <!-- </draggable> -->
          <!-- <draggable v-for="(day, orderIndex) in placeOrder" :key="orderIndex" :list="day" group="day" @change="onOrderChange">
             <div v-for="(place, placeIndex) in day" :key="placeIndex" class="placeOrder-div">
                {{ place.placeName }}
                </div> 
            </draggable> -->


          <!-- <draggable v-for="(order, orderIndex) in placeOrder" :key="orderIndex" :list="order" group="places"
            @change="onOrderChange">
            <div v-for="(place, placeIndex) in order" :key="placeIndex">
               Add the item slot below 
               <template #item="{ element }">
            <div class="placeOrder-div">
              {{ element }}
            </div>
          </template>
            </div>
          </draggable> -->

          <draggable
            class="list-group"
            :component-data="{
            tag: 'ul',

            type: 'transition-group',
            name: !drag ? 'flip-list' : null
          }"
            v-model="placeOrder"
            v-bind="dragOptions"
            @start="drag = true"
            @end="onChange"
            item-key="order"
        >
          <template #item="{ element }">
            <div class="placeOrder-div">
              {{ element }}
            </div>
          </template>
        </draggable>

        </div>
      </div>
    </div>
    <div class="search-div" v-show="dayAdd != null">
      Day{{ dayAdd + 1 }} 장소 검색
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
    <div class="map-div">
      <KakaoMap :region="useRoute().params.region" :query="query" :mapData="mapData"
        @search-places="searchPlacesResult" />
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
  background-color: rgb(200, 229, 247);
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
  width: 83vw;
  height: 92vh;
}

.search-div {
  width: 17vw;
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
</style>