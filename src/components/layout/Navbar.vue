<script setup>
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import axios from "axios";

const memberStore = useMemberStore();
const { isLogin } = storeToRefs(memberStore);

const { userLogout } = memberStore;


function openMyPage(){
  document.getElementById("mySidenav").style.width = "250px";
}

function closeMyPage() {
  document.getElementById("mySidenav").style.width = "0";
}

function logout(){
  let baseUrl = "http://localhost/user/logout/" + "&userId=" + memberStore.userInfo.userId;
  console.log(baseUrl);
  closeMyPage();
  console.log(memberStore.userInfo.userId);
  axios.get(baseUrl)
    .then((res) => {
      userLogout();
      
    });
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

<div id="mySidenav" class="sidenav">
  <div href="javascript:void(0)" class="closebtn btn-hover" @click="closeMyPage" style="font-size:25px;">&times;</div>

  <!-- 이름, 아이디, 로그아웃, 좋아요한 article, 내 일정, 담은 일정 -->
  <div>
    <img src="@/assets/img/person-circle.svg" alt="user" style="width:40px; height:40px;"/>
  </div>
  <div style="font-size:18px;" v-if="isLogin">
    {{ memberStore.userInfo.userName }} 님
  </div>
  <div @click="logout" class="btn-hover">로그아웃</div>
  <div class="btn-hover">나의 여행 계획</div>
  <div class="btn-hover">담은 여행 계획</div>
  <div class="btn-hover">좋아요한 여행 후기</div>
</div>

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

/* mypage */

/* The side navigation menu */
.sidenav {
  font-family: 'Noto Sans KR', sans-serif;
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  right: 0;
  background-color: white; /* Black*/
  overflow: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
  white-space:nowrap;
}

/* The navigation menu links */
.sidenav div{
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 20px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.btn-hover:hover {
  color: #f1f1f1;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
  transition: margin-left .5s;
  padding: 20px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav div {font-size: 18px;}
}
</style>