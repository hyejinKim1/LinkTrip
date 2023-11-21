<script setup>
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";

// function openMenu() {
//   document.getElementById("mySidenav").style.width = "250px";
//   document.getElementById("main").style.marginLeft = "250px";
// }

// function closeMenu() {
//   document.getElementById("mySidenav").style.width = "0";
//   document.getElementById("main").style.marginLeft = "0";
// }

const memberStore = useMemberStore();
const { isLogin } = storeToRefs(memberStore);

function openMyPage(){
  document.getElementById("mySidenav").style.width = "250px";
}

function closeMyPage() {
  document.getElementById("mySidenav").style.width = "0";
}

function logout(){
  
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
  <a href="javascript:void(0)" class="closebtn" @click="closeMyPage">&times;</a>
  <a href="#" @click="logout">로그아웃</a>
  <a href="#">Services</a>
  <a href="#">Clients</a>
  <a href="#">Contact</a>
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


/* mypage */

/* The side navigation menu */
.sidenav {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #111; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */
.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
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
  .sidenav a {font-size: 18px;}
}
</style>