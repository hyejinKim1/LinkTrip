<script setup>

const props = defineProps({
    article: Object,
    pgno : Number
});
console.log(props.article)
</script>

<template>
    
        <div class="card container" style="width: 18rem;">
            <router-link :to="`community/detailArticle/${article.articleIdx}`" :pgno="pgno">
            <img src="@/assets/img/region/jeju/jeju1.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{ article.articleTitle}}</h5>
                <p class="card-text">{{ article.content}}</p>
                <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                <!-- <router-link to="/detailArticle" class="nav-link"><p>일정 생성</p></router-link> -->
            </div>
            </router-link>
        </div>
    
    
    <!-- <router-link :to="`/detailArticle/${planList.planIdx}`"> -->
        <!-- <div class="article">
            {{ article.articleIdx }}
            {{ article.articleTitle}}
        </div> -->
    <!-- </router-link> -->
    
</template>

<style scoped>
.card{
    display:inline-block;
    padding: 10px;
    margin: 10px;
    /* width: 33%; */
    /* height: 150px; */
}
</style>