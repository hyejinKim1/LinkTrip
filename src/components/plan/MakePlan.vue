<script setup>
import {ref} from "vue";

const planname = ref('');

const savePlan = () => {

};
</script>

<template>
  <div class="makeplan-wrapper">
    <div class="name-div slider">
      <div class="title">새로 만들 Plan의 이름을 입력해주세요!</div>
      <div>
        <input type="title" class="name" v-model="planname"/>
      </div>
      <div v-show="planname != ''">
        <button>next</button>
      </div>
    </div>
    <div class="date-div slider">
      <div class="title">일정을 선택해주세요!</div>
    </div>
    <div class="save-div slider">
      <div class="title">저장 버튼을 누르고 여행 일정을 편집해 보세요!</div>
      <div>
        Plan Name : {{ planname }}
      </div>
      <button @click="savePlan">저장</button>
    </div>
  </div>
</template>

<style scoped>
.makeplan-wrapper{
  width: 300vw;
  height: 100vh;
  display: flex;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  overflow: hidden;
}

.slider{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.title{
  margin-top: 30vh;
  font-size: 50px;
  font-weight: 700;
}

.name-div input{
  margin: 50px;
  width: 50vw;
  padding: 40px;
  border-radius: 20px;
  font-size: 30px;
}

</style>