<script setup>
const props = defineProps({ article: Object });
console.log(props.article)
</script>

<template>
    <!-- <router-link :to="`/detailArticle/${planList.planIdx}`"> -->
        <div class="article">
            {{ article.articleIdx }}
            {{ article.articleTitle}}
        </div>
    <!-- </router-link> -->
    
</template>

<style scoped>
.article{
    display:inline-block;
    width: 33%;
    height: 150px;
}
</style>