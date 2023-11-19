<script setup>
import KakaoMap from "@/components/map/KakaoMap.vue";
import {ref} from "vue";
const keyword = ref("");
const searchPlace = () => {

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