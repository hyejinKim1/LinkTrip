<script setup>
import axios from "axios";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();
const { isLogin } = storeToRefs(memberStore);
<<<<<<< HEAD
=======
const { VITE_VUE_API_URL } = import.meta.env;

>>>>>>> d019886d107242bb5901679715433dc2257d4f8a
const { userLogout } = memberStore;
const emit = defineEmits(['closeMypage']);

function logout() {
    let baseUrl =  VITE_VUE_API_URL+"user/logout/" + "&userId=" + memberStore.userInfo.userId;
    console.log(baseUrl);
    closeMyPage();
    console.log(memberStore.userInfo.userId);
    axios.get(baseUrl)
        .then((res) => {
            userLogout();
        });
}

function closeMyPage(){
    document.getElementById("mySidenav").style.width = "0";
    emit("closeMypage", "0");
}
</script>

<script>
import { defineProps, ref, watch } from 'vue';

export default {
    props: {
        width: {
            type: String
        }
    },
    watch: {
        width: function () {
            console.log("side" + this.width);
            this.width_emit = this.width;
            document.getElementById("mySidenav").style.width = this.width;
        },
    },
    methods: {
        closeMyPage() {
            document.getElementById("mySidenav").style.width = "0";
            this.$emit("closeMypage", "0");
        }
    }
};
</script>

<template>
    <div id="mySidenav" class="sidenav">
        <div href="javascript:void(0)" class="closebtn btn-hover" @click="closeMyPage" style="font-size:25px;">&times;</div>

        <!-- 이름, 아이디, 로그아웃, 좋아요한 article, 내 일정, 담은 일정 -->
        <div>
            <img src="@/assets/img/person-circle.svg" alt="user" style="width:40px; height:40px;" />
        </div>
        <div style="font-size:15px; margin-bottom:20px;" v-if="isLogin">
            {{ memberStore.userInfo.userName }} 님
        </div>
        <hr style="margin:25px;" />
        <div @click="logout" class="btn-hover">로그아웃</div>
        <router-link to="/myplan" style="text-decoration:none;">
            <div class="btn-hover">나의 여행 계획</div>
        </router-link>
        <router-link to="/savedplan" style="text-decoration:none;">
            <div class="btn-hover">담은 여행 계획</div>
        </router-link>
        <router-link to="/likearticle" style="text-decoration:none;">
            <div class="btn-hover">좋아요한 여행 후기</div>
        </router-link>
    </div>
</template>

<style scoped>
/* mypage */

/* The side navigation menu */
.sidenav {
    font-family: 'Noto Sans KR', sans-serif;
    height: 100%;
    /* 100% Full-height */
    width: 0;
    /* 0 width - change this with JavaScript */
    position: fixed;
    /* Stay in place */
    z-index: 1;
    /* Stay on top */
    top: 0;
    /* Stay at the top */
    right: 0;
    background-color: white;
    /* Black*/
    overflow: hidden;
    /* Disable horizontal scroll */
    padding-top: 60px;
    /* Place content 60px from the top */
    transition: 0.5s;
    /* 0.5 second transition effect to slide in the sidenav */
    white-space: nowrap;
}

/* The navigation menu links */
.sidenav div {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 20px;
    color: #818181;
    display: block;
    transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.btn-hover:hover {
    color: #cacaca;
    transform: scale(1.03);
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
    .sidenav {
        padding-top: 15px;
    }

    .sidenav div {
        font-size: 18px;
    }
}</style>