<script setup>
const props = defineProps({
    plan : Object
});

console.log(props.plan)
</script>

<template>
    <div>
        <h1>planDetail</h1>
        <h2>{{ plan }}</h2>

        <template v-for="el in plan.placeOrder" :key="el">
            <p>{{ el }}</p>
        
        </template>
    </div>
</template>

<style scoped>

</style>