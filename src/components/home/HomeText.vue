<script setup>
</script>

<template>
  <div class="start-text center">
      LinkTrip
  </div>  
  <div class="bottom">
    <div class="btn-div">
    <router-link to="/login">
      <router-link to="/makeplan" class="nav-link"> <button class="button">Start</button></router-link>
    </router-link>
    </div>
    <div class="text-div">
    Make your travel plans with LinkTrip!<br/>Click the Start button to get started
    </div>
  </div>
</template>

<style scoped>
.center{
  text-align: center;
  margin:0 auto;
}
.text-div{
  margin: 20px;
  color: rgb(252, 252, 252);
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  font-weight: 100;
}
.start-text{
  margin-top: 8vh;
  font-family: 'Lobster', sans-serif;
  font-size: 18vw;
  color: white;
  text-shadow: 0px 8px 15px rgba(65, 65, 65, 0.1);
} 

.bottom{
  position: absolute;
  width: 60%;
  left:20%;
  bottom: 15vh;
}

.btn-div{
  display: flex;
  align-items: center;
  justify-content: center;
} 

.button {
  width: 190px;
  height: 60px;
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
  }

.button:hover {
  background-color: rgb(163, 217, 248);
  box-shadow: 0px 15px 20px rgba(145, 211, 255, 0.4);
  color: #fff;
  transform: translateY(-7px);
}
</style>