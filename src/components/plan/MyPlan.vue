<script setup>
import {getMyPlanList} from "@/api/planlist";
import { ref } from "vue";
import { useMemberStore } from "../../stores/member";
import PlanListItem from "@/components/plan/item/PlanListItem.vue";

const ms = useMemberStore();

const planLists = ref();

const param = ref(
  {
    userId : ms.userInfo.userId
  }
);

async function init() {
  planLists.value = await getMyPlanList(param.value);
  console.log("planlist : ", planLists);
}

init();

</script>

<template>
  <div class="outer">
    <div class="container">
      <h3>나의 일정</h3>
      <hr/>
      <div class="row">
      <template  v-for="planList in planLists" :key="planList.planIdx">
      <PlanListItem :planList="planList"> </PlanListItem>
      </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outer{
  font-family: 'Noto Sans KR', sans-serif;
  width: 100vw;
  padding-top: 9vh;
}
.container{
  width: 100vw;
  height: 90vh;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}


</style>