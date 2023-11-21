<script setup>
const props = defineProps({
    article : Object
});
</script>

<template>
    <div class="center font">
        {{ article }}
        <img class="logo block" src="@/assets/img/여권사진.png"/>
        
        <h2>{{ article.articleTitle }}</h2>
        <h6>{{ article.createAt }}</h6>
        {{ article.content }}
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
</style>