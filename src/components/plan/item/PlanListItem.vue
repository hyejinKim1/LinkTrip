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

    <div class="card container" style="width: 18rem;">
        <router-link :to="`/detailPlan/${planList.planIdx}`">
        <img src="@/assets/img/region/jeju/jeju2.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ planList.planTitle }}</h5>
            <p class="card-text">{{ planList.startDate }}</p>
            <p class="card-text">{{ planList.region }}</p>
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

.card{
    display:inline-block;
    padding: 10px;
    margin: 10px;
    /* width: 33%; */
    /* height: 150px; */
}
</style>
