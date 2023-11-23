<script setup>
import Chat from '../components/recommend/Chat.vue';
import KakaoMap from '../components/map/KakaoMap.vue';
import { ref } from "vue";

const inputQuery = ref("");
const places = ref([]);

const mapData = ref({
  // "placeIdx": 0,
  "lat": 0,
  "lon": 0,
  "placeName": '',
  "placeUrl":''
  // "createAt": null
});


function searchPlacesResult(result) {
  console.log("emit result:");
  console.log(result);
  places.value = result;
}
</script>

<template>
  <div class="recommend-div">
    <div class="search-div">
      추천 장소 검색
      <div class="input-search-div">
        <input type="text" placeholder="추천받은 장소를 검색해보세요" v-model="inputQuery" required>
      </div>

      <div v-if="places.length">
        <div v-for="(place, index) in places" :key="index" class="place-item-div">
          <a :href="place.place_url" target="_blank" rel="noopener noreferrer">{{ place.place_name }}</a>
          <div class="address-div">{{ place.address_name }}</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search hover-scale"
            viewBox="0 0 16 16">
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>
      </div>
    </div>
    <div class="map-div">
      <KakaoMap :query="inputQuery" :mapData="mapData" @search-places="searchPlacesResult" />
    </div>
    <div class="chat-div">
      <Chat />
    </div>
  </div>
</template>

<style scoped>
.recommend-div {
  width: 100vw;
  height: 100vh;
  padding-top: 8vh;
  display: flex;
  text-align: center;
}

.chat-div {
  width: 30vw;
  padding-left: 10px;
}

.map-div {
  padding: 5px;
  border-radius: 10px;
  width: 50vw;
  height: 92vh;
}

.search-div {
  width: 20vw;
  height: 92vh;
  overflow: scroll;
  overflow-x: hidden;
  padding: 15px;
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
  padding: 5px;
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

.hover-scale:hover {
  transform: scale(1.1);
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