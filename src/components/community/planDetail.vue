<script setup>
import KakaoMap from '../map/KakaoMap.vue';
import { ref, onMounted } from "vue";
const props = defineProps({
    plan : Object
});

const mapData = ref([]);

function selectDay(index){
    mapData.value = props.plan.placeOrder[index];
}

onMounted(() => {
    mapData.value = props.plan.placeOrder[0];
})

console.log("plan")
console.log(props.plan);

console.log(props.plan.planDTO.region);
</script>

<template>
    <!-- <div > -->
        <!-- <h1>planDetail</h1>
        <h2>{{ plan }}</h2>

        <template v-for="el in plan.placeOrder" :key="el">
            <p>{{ el }}</p>
        
        </template> -->
        <div class="center">
        <div class="title">
        <h1 style="margin-top:20px;">{{plan.planDTO.planTitle}}</h1>
        </div>
        <div v-for="(day,index) in plan.placeOrder" :key="index" class="day-text " @click="selectDay(index)">
        <button class="button">{{ index+1 }}day </button>
        </div>
        <div class="map-div">
            <KakaoMap :mapData="mapData" :region="plan.planDTO.region"/>
        </div>
        <div v-for="(day,index) in plan.placeOrder" :key="index" class="day-div">
            <h2>{{ index+1 }}day </h2>
            <div v-for="place in day" :key="place.placeName" class="place-div">
                {{ place.placeName }}
            </div>
        </div>
    </div>
        
</template>

<style scoped>
.map-div {
  width: 63vw;
  height: 40vh;
  border-radius: 10px;
  background-color: #f0f0f0; /* Light grey background */
}

.day-div {
  margin: 15px;
  padding: 15px;
  border: 1px solid #ddd; /* Light grey border */
  border-radius: 10px;
  background-color: #fff; /* White background */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Soft box shadow */
}

.place-div {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd; /* Light grey border */
  border-radius: 8px;
  background-color: #fff; /* White background */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* Soft box shadow */
}

/* .day-text {
  margin: 10px;
  padding: 10px;
  display: inline-block;
  cursor: pointer;
  transition: color 0.3s, transform 0.3s;
} */

.day-text:hover {
  color: #555; /* Dark grey on hover */
  transform: scale(1.05);
}

.center {
  display: block;
  width : 75%;
  margin-left: auto;
  margin-right: auto;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.plan-detail {
  padding: 20px;
}
.day-text {
  display: inline-block;
  margin: 5px;
  padding: 8px;
  /* background-color: #4CAF50; */
  /* color: white;
  border-radius: 5px; */
  cursor: pointer;
  transition: background-color 0.3s;
}

.plan-div {
  width: 60vw;
  margin: auto;
  text-align: center;
}

.map-div {
  height: 35vh;
  width : 100%;
  border-radius: 15px;
  overflow: hidden;
  display: block;
}

.button {
  width: 100px;
  height: 50px;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 700;
  padding: 10px 20px;
  text-transform: uppercase;
  font-weight: 800;
  color: #000;
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(65, 65, 65, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  }

.button:hover {
  background-color: rgb(163, 217, 248);
  box-shadow: 0px 15px 20px rgba(145, 211, 255, 0.4);
  color: #fff;
  transform: translateY(-7px);
}
</style>
