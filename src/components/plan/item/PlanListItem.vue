<script setup>

const props = defineProps({ planList: Object });
console.log(123123)
console.log(props.planList);
</script>

<template>
    <router-link :to="`/detailPlan/${planList.planIdx}`">
        <div class="planList">
            {{ planList.planTitle }}
            {{ planList.startDate }}
            {{ planList.region }}
        </div>
    </router-link>
</template>
<style scoped>
.planList{

    display:inline-block;
    width: 33%;
    height: 150px;
}
</style>
