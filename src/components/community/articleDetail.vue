<script setup>
const props = defineProps({
    article : Object
});
console.log(props.article);

</script>

<template>
  <div class="center font margin-top">
        <!-- {{ article }} -->
        <div class="article-title">
      <h2>{{ article.articleTitle }}</h2>
      <h6>{{ article.createAt }}</h6>
  </div>
        <br>
        {{ article.content }}
        <img class="logo block" src="@/assets/img/여권사진.png"/>
        <div class="divider"></div>
        <div class="divider back"></div>
  </div>
</template>

<style scoped>

.back {
    background-color: rgb(239, 239, 239);
}

.divider {
    height : 15px;
  margin-left: auto;
  margin-right: auto;
}

.block {
    margin-left: auto;
  margin-right: auto;
  display: block;
  width : 100%;
}

.center {
  display: block;
  width : 75%;
  margin-left: auto;
  margin-right: auto;
}

.font {
    font-family: 'Noto Sans KR', sans-serif;
}

.article-title{
  background-color: white;
  width: 100vw;
}

/* .margin-top{
  margin-top: 20vh;
} */
</style>