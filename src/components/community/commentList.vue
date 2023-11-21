<script setup>
const props = defineProps({
    comment : Object
});

console.log(props.comment)
</script>

<template>
    <div>
        <h1>commentList</h1>
        {{ comment }}
    </div>
</template>

<style scoped>

</style>