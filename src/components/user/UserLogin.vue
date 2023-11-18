<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { useMenuStore } from "@/stores/menu";

import axios from "axios";
// import router from "../../router";
const isActive = ref(false);
const router = useRouter();
const memberStore = useMemberStore();

const { isLogin } = storeToRefs(memberStore);
const { userLogin, getUserInfo } = memberStore;
const { changeMenuState } = useMenuStore();

const loginUser = ref({
  userId: "",
  userPwd: "",
});

const toSignup = () => {
  isActive.value = true;
};

const toSignin = () => {
  isActive.value = false;
};

const loginForm = async() => {
  // let baseUrl = "http://localhost/mem/login?";
  // let userid = document.getElementById("loginid")?.value;
  // let userpwd = document.getElementById("loginpw")?.value;

  // baseUrl += "&userid=" + userid + "&userpwd=" + userpwd;
  // console.log(baseUrl);

  // axios.post(baseUrl)
  //   .then((res) => {
  //     if(res.data.resdata == 1){
  //       router.replace({path:'/home'});
  //       console.log("로그인 성공");
  //     }else{
  //       console.log("로그인 실패");
  //     }
  //   });
  console.log(loginUser.value)

  await userLogin(loginUser.value);
  let token = sessionStorage.getItem("accessToken");
  if (isLogin) {
    getUserInfo(token);
    changeMenuState();
  }
  router.push("/");
};

const joinForm = () => {
  let baseUrl = "http://localhost/mem/join?";
  let userid = document.getElementById("joinid")?.value;
  let userpwd = document.getElementById("joinpw")?.value;
  let username = document.getElementById("name")?.value;
  let email = document.getElementById("email")?.value;

  baseUrl += "&userid=" + userid + "&userpwd=" + userpwd+ "&username=" + username+ "&email=" + email;
  console.log(baseUrl);

  axios.get(baseUrl)
    .then((res) => {
      if(res.data.resdata == 1){
      
      }else{
       
      }
    });
};

</script>

<template>
<cloud></cloud>
<div class="wrapper">
  <div id="container" class="container" :class="{'right-panel-active': isActive}">
  <div class="form-container sign-up-container">
    <form v-on:submit.prevent="joinForm">
      <h1>Create Account</h1>
      <input type="text" placeholder="Name" id="name" required/>
      <input type="email" placeholder="Email" id="email" required/>
      <input type="text" placeholder="ID" id="joinid" required/>
      <input type="password" placeholder="Password" id="joinpw" required/>
      <button >Sign Up</button>
    </form>
  </div>
  <div class="form-container sign-in-container">
    <form v-on:submit.prevent="loginForm">
      <h1>Sign in</h1>
      <input v-model="loginUser.userId" type="text" placeholder="ID"  id="loginid" required/>
      <input v-model="loginUser.userPwd" type="password" placeholder="Password" id="loginpw" required/>
      <button type="submit">Sign in</button>
    </form>
  </div>
  <div class="overlay-container">
    <div class="overlay">
      <div class="overlay-panel overlay-left">
        <h1>Welcome Back!</h1>
        <p>Already have an account?</p>
        <button class="ghost" id="signIn" @click="toSignin">Sign In</button>
      </div>
      <div class="overlay-panel overlay-right">
        <h1>Welcome to LinkTrip!</h1>
        
        <p>Let’s begin the adventure with us</p>
        <button class="ghost" id="signUp" @click="toSignup">Sign Up</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
  box-sizing: border-box;
}

.wrapper {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  width:100vw;
  /* margin: -20px 0 50px; */
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #aad9ff;
  background-color: #aad9ff;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

form button{
  margin-top: 20px;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin-top: 20px;
  height: 50px;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
      0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 1000px;
  max-width: 100%;
  min-height: 700px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }
  
  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container{
  transform: translateX(-100%);
}

.overlay {
  background: #aad9ff;
  /* background: #FF416C; */
  background: -webkit-linear-gradient(to right, #c0def6, #a1d5ff);
  background: linear-gradient(to right, #a1d5ff, #c0def6);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
    transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #DDDDDD;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

footer {
    background-color: #222;
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
}

footer p {
    margin: 10px 0;
}

footer i {
    color: red;
}

footer a {
    color: #3c97bf;
    text-decoration: none;
}
</style>