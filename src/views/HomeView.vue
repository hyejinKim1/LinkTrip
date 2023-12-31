<script setup>
import { ref, onMounted } from 'vue';
import HomeText from '../components/home/HomeText.vue';

const clouds = ref([]);
let isDragging = false;
let startX = 0;
let startY = 0;
let currentCloud = null;

onMounted(() => {
  clouds.value = document.querySelectorAll('.cloud');

  clouds.value.forEach((cloud) => {
    cloud.addEventListener('mousedown', (e) => handleMouseDown(e, cloud));
  });

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
});

const handleMouseDown = (e, cloud) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  currentCloud = cloud;
};

const handleMouseMove = (e) => {
  if (isDragging && currentCloud) {
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    const rect = currentCloud.getBoundingClientRect();
    currentCloud.style.left = rect.left + deltaX + 'px';
    currentCloud.style.top = rect.top + deltaY + 'px';

    startX = e.clientX;
    startY = e.clientY;
  }
};

const handleMouseUp = () => {
  isDragging = false;
  currentCloud = null;
};
</script>

<template>
  <div class="container-div">
    <!-- cloud -->
    <cloud class="cloud"></cloud>
    <cloud class="cloud"></cloud>
    <cloud class="cloud"></cloud>
    <cloud class="cloud"></cloud> 
    <!-- /cloud-->

    <!-- airplain -->
    <airplane class="airplane">
      <div class="head"></div>
      <div class="body">
        <div class="window"></div>
        <div class="window"></div>
        <div class="window"></div>
      </div>
      <div class="lwing"></div>
      <div class="rwing"></div>
      <div class="tale"></div>
    </airplane>
    <!-- /airplain -->

    <!-- ground -->
    <ground class="ground">
      <tree class="tree">
        <div class="leaves"></div>
      </tree>
      <tree class="tree">
        <div class="leaves"></div>
      </tree>
      <tree class="tree">
        <div class="leaves"></div>
      </tree>
      <tree class="tree">
        <div class="leaves"></div>
      </tree>
      <tree class="tree">
        <div class="leaves"></div>
      </tree>
    </ground>
    <!-- /ground -->
    <HomeText />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

/*----------------------------------
	Main
----------------------------------*/
* {
  margin: 0;
  padding: 0;
}

.container-div {
  background: #aad9ff;
  width: 100vw;
  height: 100vh;
  position: absolute;
  overflow: hidden;
}

/*----------------------------------
	Cloud
----------------------------------*/
.cloud,
.cloud:before,
.cloud:after {
  content: "";
  background: #e0f4ff;
  display: block;
  position: absolute;
  left: 25%;
  top: 15%;
  border-radius: 100%;
  width: 160px;
  height: 60px;
  z-index: 1;
}

.cloud:before {
  width: 120px;
  height: 65px;
  top: -22px;
  border-radius: 50%;
  left: 24px;
}

.cloud:after {
  width: 50px;
  height: 40px;
  top: -35px;
  left: 57px;
}

.cloud:nth-child(1) {
  -webkit-animation: cloud 18s linear infinite;
  -o-animation: cloud 18s linear infinite;
  animation: cloud 18s linear infinite;
}

.cloud:nth-child(2) {
  left: 50%;
  top: 40%;

  /* transform */
  -webkit-transform: scale(1.8);
  -ms-transform: scale(1.8);
  -o-transform: scale(1.8);
  transform: scale(1.8);

  /* animation */
  -webkit-animation: cloud_b 26s linear infinite;
  -o-animation: cloud_b 26s linear infinite;
  animation: cloud_b 26s linear infinite;
}

.cloud:nth-child(3) {
  left: 62%;
  top: 25%;

  /* transform */
  -webkit-transform: scale(1.3);
  -ms-transform: scale(1.3);
  -o-transform: scale(1.3);
  transform: scale(1.3);

  /* animation */
  -webkit-animation: cloud_a 22s linear infinite;
  -o-animation: cloud_a 22s linear infinite;
  animation: cloud_a 22s linear infinite;
}

.cloud:nth-child(4) {
  left: 25%;
  top: 40%;

  /* transform */
  -webkit-transform: scale(1.5);
  -ms-transform: scale(1.5);
  -o-transform: scale(1.5);
  transform: scale(1.5);

  /* animation */
  -webkit-animation: cloud_d 24s linear infinite;
  -o-animation: cloud_d 24s linear infinite;
  animation: cloud_d 24s linear infinite;
}

/*----------------------------------
	Ground
----------------------------------*/
.ground {
  position: absolute;
  width: 80%;
  height: 110px;
  border-radius: 100%;
  background: #75bf8d;
  left: 10%;
  bottom: -60px;
  z-index: 1;
}

/*----------------------------------
	Tree
----------------------------------*/
.tree {
  width: 20px;
  height: 90px;
  background: rgb(252, 206, 132);
  z-index: 1;
  display: block;
  position: absolute;
  bottom: 70px;
  left: 62%;
  -webkit-transform: rotate(6deg);
  -ms-transform: rotate(6deg);
  -o-transform: rotate(6deg);
  transform: rotate(6deg);
}

.leaves,
.leaves:before,
.leaves:after {
  content: "";
  background: rgb(255, 235, 103);
  border-radius: 90%;
  width: 70px;
  top: -50px;
  height: 80px;
  position: absolute;
  left: -30px;
  z-index: 1;
}

.leaves:before {
  width: 30px;
  top: -4px;
  left: 9px;
}

.leaves:after {
  width: 50x;
  top: -20px;
  left: 19px;
}

.tree:nth-child(2) {
  bottom: 60px;
  left: 80%;
  -webkit-transform: rotate(12deg) scale(0.7);
  -ms-transform: rotate(12deg) scale(0.7);
  -o-transform: rotate(12deg) scale(0.7);
  transform: rotate(12deg) scale(0.7);
}

.tree:nth-child(3) {
  bottom: 80px;
  left: 50%;
  -webkit-transform: rotate(-2deg) scale(0.5);
  -ms-transform: rotate(-2deg) scale(0.5);
  -o-transform: rotate(-2deg) scale(0.5);
  transform: rotate(-2deg) scale(0.5);
}

.tree:nth-child(4) {
  bottom: 78px;
  left: 40%;
  -webkit-transform: rotate(7deg) scale(0.6);
  -ms-transform: rotate(7deg) scale(0.6);
  -o-transform: rotate(7deg) scale(0.6);
  transform: rotate(7deg) scale(0.6);
}

.tree:nth-child(5) {
  bottom: 75px;
  left: 26%;
  -webkit-transform: rotate(-12deg) scale(0.7);
  -ms-transform: rotate(-12deg) scale(0.7);
  -o-transform: rotate(-12deg) scale(0.7);
  transform: rotate(-12deg) scale(0.7);
}

/*----------------------------------
	Airplain
----------------------------------*/
.airplane {
  position: absolute;
  left: 40%;
  top: 10%;
  z-index: 3;
  -webkit-animation: plainfly 10s linear infinite;
  -o-animation: plainfly 10s linear infinite;
  animation: plainfly 10s linear infinite;
}

.airplane div {
  background: #f9fbfc;
  border-radius: 100%;
  width: 60px;
  height: 60px;
  position: absolute;
  z-index: 1;
}

div.head {
  top: 21px;
  left: 83px;
  width: 60px;
  height: 25px;
  border-radius: 100%;
}

div.body {
  top: 20px;
  left: 0;
  width: 130px;
  height: 26px;
  border-radius: 40% 30% 20% 50%;
  z-index: 1;
}

div.lwing {
  top: 7px;
  left: 60px;
  height: 21px;
  width: 30px;
  border-radius: 5px;
  z-index: 0;
  -webkit-transform: skew(51deg, 0deg);
  -ms-transform: skew(51deg, 0deg);
  -o-transform: skew(51deg, 0deg);
  transform: skew(51deg, 0deg);
}

div.rwing {
  top: 34px;
  left: 57px;
  height: 27px;
  width: 35px;
  border-radius: 5px;
  z-index: 1;
  box-shadow: 0px 6px 4px rgba(0, 0, 0, 0.16);
  -webkit-transform: skew(-49deg, 0deg);
  -ms-transform: skew(-49deg, 0deg);
  -o-transform: skew(-49deg, 0deg);
  transform: skew(-49deg, 0deg);
}

div.tale {
  top: 15px;
  left: 10px;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  -webkit-transform: skew(35deg, -9deg);
  -ms-transform: skew(35deg, -9deg);
  -o-transform: skew(35deg, -9deg);
  transform: skew(35deg, -9deg);
  background: linear-gradient(0deg, #fff, #bbdeff);
}

div.window,
div.window:before,
div.window:after {
  content: "";
  top: 6px;
  left: 48px;
  width: 4px;
  height: 4px;
  border-radius: 30%;
  background: #9ad0f5;
  border: 1px solid #5093d1;
  position: absolute;
}

div.window:before {
  left: -12px;
  top: -1px;
}

div.window:after {
  left: 10px;
  top: -1px;
}

div.window:nth-child(1) {
  left: 81px;
}

div.window:nth-child(2) {
  left: 115px;
}

div.window:nth-child(2):after {
  border-top-right-radius: 8px;
  width: 6px;
}

/*----------------------------------
	Animation
----------------------------------*/
@-webkit-keyframes plainfly {
  0% {
    left: -10%;
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }

  50% {
    left: 110%;
    -webkit-transform: scale(1.9);
    -ms-transform: scale(1.9);
    -o-transform: scale(1.9);
    transform: scale(1.9);
  }

  51% {
    -webkit-transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
    -ms-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }

  100% {
    left: -10%;
    -webkit-transform: scale(1.4) rotateY(180deg);
    -ms-transform: scale(1.4) rotateY(180deg);
    -o-transform: scale(1.4) rotateY(180deg);
    transform: scale(1.4) rotateY(180deg);
  }
}

@-webkit-keyframes cloud {
  0% {
    left: 15%;
  }

  50% {
    left: 63%;
  }

  100% {
    left: 15%;
  }
}

@-webkit-keyframes cloud_a {
  0% {
    left: 62%;
  }

  50% {
    left: 90%;
  }

  100% {
    left: 62%;
  }
}

@-webkit-keyframes cloud_b {
  0% {
    left: 50%;
  }

  50% {
    left: 23%;
  }

  100% {
    left: 50%;
  }
}

@-webkit-keyframes cloud_c {
  0% {
    left: 37%;
  }

  50% {
    left: 47%;
  }

  100% {
    left: 37%;
  }
}

@-webkit-keyframes cloud_d {
  0% {
    left: 25%;
  }

  50% {
    left: 65%;
  }

  100% {
    left: 25%;
  }
}
</style>