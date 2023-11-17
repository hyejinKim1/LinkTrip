<script setup>
import {ref} from "vue";

const planname = ref('');
const startdate = ref(null);
const enddate = ref(null);

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
        <button class="button">Next</button>
      </div>
    </div>
    <div class="date-div slider">
      <div class="title">일정을 선택해주세요!</div>
      <div v-show="planname != ''">
        <button class="button">Next</button>
      </div>
    </div>
    <div class="save-div slider">
      <div class="title">저장 버튼을 누르고 여행 일정을 편집해 보세요!</div>
      <div>
        Plan Name : {{ planname }}
        여행 일정 : {{ startdate }} ~ {{ enddate }}
      </div>
      <router-link to="/updateplan" class="nav-link"><button class="button" @click="savePlan">save</button></router-link>
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

.button {
  width: 250px;
  height: 80px;
  font-family: 'Montserrat', sans-serif;
  font-size: 30px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-weight: 800;
  color: #000;
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(65, 65, 65, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-top: 30px;
  }
  .button:hover {
  background-color: rgb(163, 217, 248);
  box-shadow: 0px 15px 20px rgba(145, 211, 255, 0.4);
  color: #fff;
  transform: translateY(-7px);
  }
</style>