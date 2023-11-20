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
  <div class="div">
    <h1>MyPlan</h1>

    <div class="container">
      <template  v-for="planList in planLists"
        :key="planList.planIdx">
      <PlanListItem :planList="planList">
      </PlanListItem>
    </template>
    </div>
    
  </div>
</template>

<style scoped>
.div{
  padding: 100px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}

.container{
  width: 80%;
}
</style>