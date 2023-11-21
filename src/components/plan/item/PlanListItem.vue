<script setup>
const props = defineProps({ planList: Object });
console.log(123123)
console.log(props.planList);
</script>

<template>
    <!-- <router-link :to="`/detailPlan/${planList.planIdx}`">
        <div class="planList">
            {{ planList.planTitle }}
            {{ planList.startDate }}
            {{ planList.region }}
        </div>
    </router-link> -->

    <div class="card col card-container" style="width: 25vw;">
        <router-link :to="`/detailPlan/${planList.planIdx}`" style="text-decoration:none; color: black">
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
        </router-link>
    </div>
</template>
<style scoped>
/* .planList{

    display:inline-block;
    width: 33%;
    height: 150px;
} */

img{
    border-radius: 10px;
}

.card{
    display:inline-block;
    padding: 10px;
    margin: 10px;
    /* width: 33%; */
    /* height: 150px; */
}

.card-container{
    background-color:rgb(224, 241, 251);
    border: none;
}

.card-container:hover {
    background-color:rgb(235, 244, 249);
}

.title{
    font-weight: 900;
    color: rgb(91, 91, 91);
}

.txt{
    color: gray; 
}
</style>
