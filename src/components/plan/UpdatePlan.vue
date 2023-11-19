<script setup>
import KakaoMap from "@/components/map/KakaoMap.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

console.log(useRoute().params)

const planData = ref(null);

//plan 보여주기

onMounted(() => {
  getPlan();
})

const getPlan = () => {
  let baseUrl = "http://localhost/plan/viewPlan?"+"&planIdx=" + useRoute().params.planIdx;
  console.log(baseUrl);

  axios.get(baseUrl)
    .then((res) =>{
      console.log(res.data);
      planData.value = res.data;
    } );
}

</script>

<script>
export default {
  name: 'params',
  props: {
    pname: {
      type: String
    },
    sdate: {
      type: String
    },
    edate: {
      type: String
    },
    region: {
      type: String
    },
    planIdx: {
      type: Number
    }
  },
}
</script>

<template>
  <div class="update-wrapper">
    <div class="search-div">
      update
      {{ pname }}
      {{ sdate }}~{{ edate }}
      <!-- <div class="search">
        <input type="text" @input="searchPlace" v-model="keyword">
      </div> -->

      <div v-for="(plan, index) in planData" :key="index">
        planData
      </div>
      <KakaoMap />
    </div>
  </div>
</template>

<style scoped>
.update-wrapper {
  width: 100vw;
  height: 100vh;
  text-align: center;
}

.search-div {
  margin-top: 20vh;
}
</style>