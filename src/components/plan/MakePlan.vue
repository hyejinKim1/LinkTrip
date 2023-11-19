<script setup>
import { ref } from "vue";
// import Calender from "./Calender.vue";
import router from "../../router";

const planname = ref('여행');
const datePage = ref(false);
const savePage = ref(false);

const startdate = ref(new Date().toLocaleDateString());
const enddate = ref(new Date().toLocaleDateString());

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
      let areaCode = document.getElementById("search-area")?.value;
      let contentTypeId = document.getElementById("search-content-id")?.value;
      let keyword = document.getElementById("search-keyword")?.value;

        if (areaCode != "") baseUrl += "&areaCode=" + areaCode;
        if (contentTypeId != "") baseUrl += "&contentTypeId=" + contentTypeId;
        if (keyword != "") baseUrl += "&keyword=" + keyword;

        console.log(baseUrl);

        axios.get(baseUrl)
          .then((res) => this.makeList(res.data));
  router.push({
    name: 'updateplan',  
    params: {pname: planname.value, sdate: startdate.value, edate: enddate.value}
  })
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
        <div class="result-div">
          <p>Plan Name : {{ planname }}</p>
          <p>여행 일정 : {{ startdate }} ~ {{ enddate }}</p>
        </div>
        <router-link 
        :to="{ name: 'updateplan', params: {pname: planname, sdate: startdate, edate: enddate}}" class="nav-link">
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
  font-size: 50px;
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