<script setup>
// function openMenu() {
//   document.getElementById("mySidenav").style.width = "250px";
//   document.getElementById("main").style.marginLeft = "250px";
// }

// function closeMenu() {
//   document.getElementById("mySidenav").style.width = "0";
//   document.getElementById("main").style.marginLeft = "0";
// }
</script>

<template>
    <!-- <div id="mySidenav" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" @click="closeMenu">&times;</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
        </div> -->
    <!-- <div class="nav-div">
        <router-link to="/" class="navbar-logo">
            <img class="logo" src="../../assets/img/logo_white.png" />
        </router-link>
    </div> -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img class="logo" src="../../assets/img/logo_white.png" />
        <!-- <img src="@/assets/img/service_title.png" class="rounded mx-auto d-block logo-img" alt="logo" /> -->
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
        >
        <li class="nav-item">
            <router-link to="/" class="nav-link">일정</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav-link">커뮤니티</router-link>
          </li>
        </ul>
        
			<!-- auth menus (dropdown) -->
        <!-- <template v-if="!userStore.isLoggedIn"> -->
          <div class="header-dropdown">
            <router-link to="/login"><img class="header-users-img" src="@/assets/img/nav/users.png"
					  alt="users"/></router-link>
					  <!-- <button @click = "loginForm">로그인</button>
					  <button onclick="javascript:modalOn('.modal-signup')">회원가입</button> -->
				  </div>
        <!-- </template>
        <template v-else> -->
          <label style="margin-right: 100px">님
						안녕하세요.</label>
          <div class="header-dropdown">
					  <button>	내정보</button>
					  <button>로그아웃</button>
				  </div>
        <!-- </template> -->

      </div>
    </div>
  </nav>
</template>

<style scoped>
/* .nav-div {
    background: #e0f4ff;
    height: 6vh;
} */

/* .logo {
    margin: 10px;
} */

/* .nav-div button{
    background: transparent;
    border: none;
    font-size: 20px;
    color: white;
}

.sidenav {
  height: 100%; 
  width: 0; 
  position: fixed; 
  z-index: 1; 
  top: 0; 
  left: 0;
  background-color: #e0f4ff; 
  overflow-x: hidden;
  padding-top: 60px; 
  transition: 0.5s; 
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

#main {
  transition: margin-left .5s;
  padding: 20px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
} */
</style>