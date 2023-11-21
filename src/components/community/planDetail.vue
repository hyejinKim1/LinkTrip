<script setup>
const props = defineProps({
    plan : Object
});

console.log(props.plan.placeOrder, "##########")
console.log(props.plan.planDTO, "##########****")
</script>

<template>
    <div>
        <h1>planDetail</h1>
        <!-- <h2>{{ plan.placeOrder }}</h2> -->
        <!-- <h2>{{ plan.planDTO }}</h2> -->

        <p>{{ plan.planDTO.planTitle }}</p>
<p>{{ plan.planDTO.region }}</p>


        <p>시작!@</p>
        <template v-for="(day, index) in plan.placeOrder" :key="day">
            <p>{{ index }}일차</p>
            <p>시작일 : {{ plan.planDTO.startDate }} 에서 {{ index }}</p>
            <template v-for="place in day" :key="place">
                <p>{{ place.placeName }}</p>
            </template>
        </template>
    </div>
</template>

<style scoped>

</style>