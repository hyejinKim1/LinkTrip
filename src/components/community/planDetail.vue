<script setup>
import KakaoMap from '../map/KakaoMap.vue';
import { ref } from "vue";
const props = defineProps({
    plan : Object
});

const mapData = ref(props.plan.placeOrder[0]);
const region = ref("서울");

function selectDay(index){
    mapData.value = props.plan.placeOrder[index];
}

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
        <h1>Plan</h1>
        </div>
        <div v-for="(day,index) in plan.placeOrder" :key="index" class="day-text " @click="selectDay(index)">
        {{ index+1 }}day 
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
.map-div{
    width: 63vw;
    height: 40vh;
    border-radius:10px;
}

.day-div{
    margin: 15px;
}

.place-div{
    margin: 10px;
}

.day-text{
    margin: 10px;
    display: inline-block;
}

.day-text:hover{
    color: rgb(85, 85, 85);
    transform: scale(1.1);
}

.center {
    display: block;
    width : 75%;
    margin-left: auto;
    margin-right: auto;
}

</style>