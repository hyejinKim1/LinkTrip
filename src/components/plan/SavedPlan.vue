<script setup>
import { getScrapPlanList } from "@/api/planlist";
import { ref } from "vue";
import { useMemberStore } from "../../stores/member";
import PlanListItem from "@/components/plan/item/PlanListItem.vue";

const ms = useMemberStore();
const planLists = ref();
const param = ref({
  userId: ms.userInfo.userId
});

async function init() {
  planLists.value = await getScrapPlanList(param.value);
  console.log("planlist : ", planLists);
}

init();

</script>

<template>
  <div class="saved-div">
    <!-- <h1>SavedPlan</h1> -->
    <div class="container">
      <h3>담은 일정</h3>
      <hr/>
      <template  v-for="planList in planLists"
        :key="planList.planIdx">
      <PlanListItem :planList="planList">
      </PlanListItem>
    </template>
    </div>
    
  </div>
</template>

<style scoped>
.saved-div{
  font-family: 'Noto Sans KR', sans-serif;
  width: 100vw;
  margin-top: 9vh;
  height: 88vh;
}

/* .container{
  width: 800px;
} */
</style>