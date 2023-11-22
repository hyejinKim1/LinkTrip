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

    <div class="card col-lg-3 col-sm-12 mx-3 my-3 card-container">
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

/* img{
    border-radius: 10px;
} */

/* .card{
    display:inline-block;
    padding: 10px;
}

.card-container{
    background-color:rgb(224, 241, 251);
    border: none;  
}

.card-container:hover {
    background-color:rgb(235, 244, 249);
}
*/
.title{
    font-weight: 900;
    color: rgb(91, 91, 91);
} 

.card{
    display:inline-block;
    padding: 10px;
    margin: 10px;
      width: 30%;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  max-height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 16px;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.card-text {
  color: #555;
  text-overflow: ellipsis; 
  overflow: hidden;
  white-space: nowrap;
}
</style>
