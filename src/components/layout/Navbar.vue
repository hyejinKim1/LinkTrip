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
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid nav-div">
      <router-link to="/" class="navbar-brand">
        <img class="logo" src="../../assets/img/logo_gray.png" />
      </router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto" style="--bs-scroll-height: 100px">
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
          <router-link to="/login">
            <img src="@/assets/img/user.png" alt="user" style="width:45px;" />
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
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
  font-size: 20px;
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
  background-color: transparent;
  min-width: 120px;
  padding: 0 10px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 10px;
  margin-left: -28px;
}
.dropdown-content p:hover {color: white;}

.dropdown:hover .dropdown-content {display: block;}
</style>