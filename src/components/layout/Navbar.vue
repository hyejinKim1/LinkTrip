<script setup>
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import {ref} from "vue";

import SideNav from "./SideNav.vue";

const memberStore = useMemberStore();
const { isLogin } = storeToRefs(memberStore);


const width = ref("0");

function openMyPage(){
  width.value = "250px";
  console.log(width.value);
}

function closeMyPage(newWidth){
  console.log("close"+newWidth.value);
  width.value = newWidth.value;
}

</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid nav-div">
      <router-link to="/" class="navbar-brand">
        <img class="logo" src="../../assets/img/logo_gray.png" style="width:100px;"/>
      </router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto" style="--bs-scroll-height: 9vh">
          <li class="nav-item">
            <div class="dropdown">
              <p class="dropbtn nav-btn">일정</p>
              <div class="dropdown-content">
                <router-link to="/makeplan" class="nav-link"><p>일정 생성</p></router-link>
                <router-link to="/myplan" class="nav-link"><p>내 일정</p></router-link>
                <router-link to="/savedplan" class="nav-link"><p>담은 일정</p></router-link>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <router-link to="/community" class="nav-link">
              <p class="nav-btn">커뮤니티</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/recommend" class="nav-link">
              <p class="nav-btn">추천여행지</p>
            </router-link>
          </li>
        </ul>
        <div class="header-dropdown">
          <template v-if="isLogin">
            <!-- <router-link to="/myPage"> -->
            <img src="@/assets/img/user.png" alt="user" style="width:30px;" @click="openMyPage"/>
          <!-- </router-link> -->
          </template>
          <template v-else>
            <router-link to="/login">
              <img src="@/assets/img/user.png" alt="user" style="width:30px;" />
            </router-link>
          </template>
        </div>
      </div>
    </div>

    <SideNav :width="width" @close-mypage="closeMyPage"/>

  </nav>
</template>

<style scoped>
.navbar{
  height:9vh;
}

li {
  margin-left: 30px;
}

p {
  color: #757575;
  margin-top: 10px;
}

.nav-div {
  padding: 10px 50px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  font-weight: 600;
}

/* Dropdown Button */
.dropbtn {
  padding: 9px;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 100px;
  padding: 0 5px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 10px;
  margin-left: -26px;
}
.dropdown-content p:hover {color: white;}

.dropdown:hover .dropdown-content {display: block;}

path{
  fill:rgb(161, 161, 161);
  color: #818181;
}
</style>