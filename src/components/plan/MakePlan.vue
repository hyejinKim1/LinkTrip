<script setup>
import { ref } from "vue";
// import Calender from "./Calender.vue";
import router from "../../router";
import axios from "axios";
import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();

const planname = ref('여행');
const datePage = ref(false);
const savePage = ref(false);
const region = ref('대전');

const startdate = ref(new Date());
const enddate = ref(new Date());

const todate = () => {
  datePage.value = true;
  savePage.value = false;
}

const tosave = () => {
  datePage.value = false;
  savePage.value = true;
}

const setstartDate = (e) =>{
  startdate.value = e.target.value;
}

const setendDate = (e) =>{
  enddate.value = e.target.value;
}

const savePlan = () => {
  let baseUrl = "http://localhost/plan/createPlan?";

  const period = getDateDiff(startdate.value, enddate.value);

  // var str = startdate.value;
  // str = str.substring(2);

  // baseUrl += "&planname=" + planname.value;
  // baseUrl += "&region=" + region.value;
  // baseUrl += "&period="+period;
  // baseUrl += "&startDate=" + startdate.value;

  console.log(baseUrl);


  function toTimestamp(strDate){
   var datum = Date.parse(strDate);
   return datum/1000;
}
    // axios.post(baseUrl)
    // .then((res) => console.log(res.data));

  console.log(memberStore.userInfo.value);

    axios.post(baseUrl, {
      planTitle:planname.value,
      region: region.value,
      period:period,
      startDate:startdate.value.toISOString().split('T')[0],
      userId: memberStore.userInfo.value
    }
    ).then((res) => console.log(res.data));

  router.push({
    name: 'updateplan',  
    params: {pname: planname.value, sdate: startdate.value, edate: enddate.value, region: region.value}
  })
}

const getDateDiff = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  
  const diffDate = date1.getTime() - date2.getTime();
  
  return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
}
</script>

<!-- <script>
    export default {
        name: 'MakePlan',
        methods: {
            savePlan () {
                this.$router.push({ name: 'updateplan', params: {pname: planname.value, sdate: startdate.value, edate: enddate.value}})
            }
        }
      }
</script> -->

<template>
  <div class="makeplan-wrapper">
    <div class="slider-wrapper" id="sliderWrap" :class="{todate:datePage}, {tosave:savePage}">
      <div class="name-div slider">
        <div class="title">새로운 여행의 이름을 입력해주세요!</div>
        <div>
          <input type="title" class="name" v-model="planname" />
        </div>
        <div v-show="planname != ''">
          <button class="button" @click="todate">Next</button>
        </div>
      </div>
      <div class="date-div slider">
        <div class="title">여행 기간이 어떻게 되시나요?</div>
        <!-- <Calender/> -->
        <Input type="date" @input="setstartDate($event)"/>
        ~
        <Input type="date" @input="setendDate($event)"/>
        <div v-show="startdate != null && enddate != null">
          <button class="button" @click="tosave">Next</button>
        </div>
      </div>
      <div class="save-div slider">
        <div class="title">저장 버튼을 누르고 나만의 여행 일정을 만들어 보세요!</div>
        <div>
          <select v-model="region">
          <option value="">지역</option>
          <option value="서울">서울</option>
          <option value="인천">인천</option>
          <option value="대전">대전</option>
          <option value="대구">대구</option>
          <option value="광주">광주</option>
          <option value="부산">부산</option>
          <option value="울산">울산</option>
          <option value="세종특별자치시">세종특별자치시</option>
          <option value="경기도">경기도</option>
          <option value="강원도">강원도</option>
          <option value="충청북도">충척북도</option>
          <option value="충청남도">충청남도</option>
          <option value="경상북도">경상북도</option>
          <option value="경상남도">경상남도</option>
          <option value="전라북도">전라북도</option>
          <option value="전라남도">전라남도</option>
          <option value="제주도">제주도</option>
        </select>
        </div>
        <div class="result-div">
          <p>Plan 이름 : {{ planname }}</p>
          <p>여행 일정 : {{ startdate }} ~ {{ enddate }}</p>
        </div>
        <router-link 
        :to="{ name: 'updateplan', params: {pname: planname, sdate: startdate, edate: enddate, region: region}}" class="nav-link">
        <button class="button"
            @click="savePlan">save</button>
          </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todate{
  transform: translate(-100vw);
}

.tosave{
  transform: translate(-200vw);
}

.makeplan-wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#sliderWrap{
  transition: transform 1s; 
}

.result-div{
  padding: 10px;
}

.result-div p{
  font-size: 30px;
  font-weight: 100;
}

.slider-wrapper {
  width: 300vw;
  height: 100vh;
  display: flex;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  overflow: hidden;
}

.slider {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.title {
  margin-top: 30vh;
  font-size: 30px;
  font-weight: 700;
}

.name-div input {
  margin: 50px;
  width: 40vw;
  padding: 40px;
  border: 4px solid black;
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