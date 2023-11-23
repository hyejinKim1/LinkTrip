<script setup>
import { ref, onMounted } from "vue";
import { createArticle } from "@/api/community";
import { useRoute } from "vue-router";
import axios from "axios";
import KakaoMap from "../map/KakaoMap.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const { VITE_VUE_API_URL } = import.meta.env;


const route = useRoute();

const placeOrder = ref([]);
const planDTO = ref([]);
const region = ref("");
const files = ref([]);

const article = ref({
  articleTitle: '',
  content: '',
  planIdx: route.params.planIdx,
  open: 'F',
  files: files.value
})


const mapData = ref([]);

onMounted(() => {
  getPlan();
})

const getPlan = () => {
  console.log(route.params.planIdx);
  let baseUrl = VITE_VUE_API_URL + "plan/viewPlan?" + "&planIdx=" + route.params.planIdx;
  console.log(baseUrl);

  axios.get(baseUrl)
    .then((res) => {
      planDTO.value = res.data.data.planDTO;
      placeOrder.value = res.data.data.placeOrder;
      console.log(res.data.data);
      mapData.value = placeOrder.value[0];
      region.value = planDTO.value.region;
    });
}

function selectDay(index) {
  mapData.value = placeOrder.value[index];
}

function onCreate() {
  article.value.files = files.value.files;

  const form = new FormData()
  form.append("planIdx", article.value.planIdx);
  form.append("open", article.value.open);
  form.append("articleTitle", article.value.articleTitle);
  form.append("content", article.value.content);

  for (let i = 0; i < article.value.files.length; i++) {
    // console.log(32132131231)
    form.append("files", article.value.files[i]);
  }

  console.log(form)

  createArticle(form);
  router.push("/community");
}

function toggleVisibility(){
  if(article.value.open == 'T'){
    article.value.open = 'F';
  }else{
    article.value.open = 'T';
  }
}

const onFileSelected = (event) => {
  const input = event.target;
  console.log("****",input);
  if (input.files /* && input.files[0] */) {
    console.log("input.file", input.files);
    const reader = new FileReader();
    reader.onload = (e) => {
      files.value = input; // image source 매우 긴 영어
      // uploadImageFile.value = e.target.result; // image source 매우 긴 영어
      webMapRestImg.value = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
};
</script>

<template>
  <div class="create-article-div">
    <div class="plan-div">
      <h2>{{ planDTO.planTitle }}</h2>
      <div v-for="(day, index) in placeOrder" :key="index" class="day-text " @click="selectDay(index)">
        <button class="button">{{ index + 1 }}day</button>
      </div>
      <div class="map-div">
        <KakaoMap :mapData="mapData" :region="region" />
      </div>
    </div>
    <form @submit.prevent="onCreate" class="article-form">
      <label for="articleTitle">제목</label>
      <input type="text" id="articleTitle" v-model="article.articleTitle" class="input-field" placeholder="제목을 입력해주세요">

      <label for="content">내용</label>
      <textarea id="content" v-model="article.content" class="input-field" placeholder="여행 후기를 입력해주세요!"></textarea>

      
      <div class="mb-3">
				<label for="upfile" class="form-label">파일:</label>
				<input type="file" ref="files" class="form-control border" @click="onFileSelected" id="upfile" name="upfile" multiple="multiple">
			</div>
    

      <div class="toggle-button">
        <label for="visibility">글 공개 여부:</label>
        <button type="button" @click="toggleVisibility" :class="{ 'active': article.open == 'T' }">
          {{ article.open == 'T' ? '공개' : '비공개' }}
        </button>
      </div>

      <button type="submit" class="button">save</button>
    </form>
  </div>
</template>

<style scoped>
.day-text  {
  display: inline-block;
  margin: 5px;
  padding: 8px;
  /* background-color: #4CAF50; */
  /* color: white;
  border-radius: 5px; */
  cursor: pointer;
  transition: background-color 0.3s;
}

.plan-div {
  width: 50vw;
  margin: auto;
  text-align: center;
}

.map-div {
  width: 50vw;
  height: 35vh;
  border-radius: 15px;
  overflow: hidden;
}

.create-article-div {
  font-family: 'Noto Sans KR', sans-serif;
  width: 100vw;
  padding:9vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
}

.article-form {
  width: 50vw;
  margin: auto;
  margin-top: 15px;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #4CAF50;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
  transition: border-color 0.3s;
}

textarea:focus {
  border-color: #4CAF50;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #45a049;
}

.button {
  width: 100px;
  height: 50px;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 700;
  padding: 10px 20px;
  text-transform: uppercase;
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
.toggle-button {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.toggle-button label {
  margin-right: 10px;
}

.toggle-button button {
  background-color: #ccc;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-button button.active {
  background-color: #4CAF50;
}

/* .day-text {
  display: inline-block;
  margin: 5px;
  padding: 8px;
  // background-color: #4CAF50;
  // color: white;
  //border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.plan-div {
  width: 50vw;
  margin: auto;
  text-align: center;
}

.map-div {
  width: 50vw;
  height: 35vh;
  border-radius: 15px;
  overflow: hidden;
}

.create-article-div {
  font-family: 'Noto Sans KR', sans-serif;
  width: 100vw;
  padding:9vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
}

.article-form {
  width: 50vw;
  margin: auto;
  margin-top: 15px;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #4CAF50;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
  transition: border-color 0.3s;
}

textarea:focus {
  border-color: #4CAF50;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #45a049;
}

.button {
  width: 100px;
  height: 50px;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 700;
  padding: 10px 20px;
  text-transform: uppercase;
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
.toggle-button {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.toggle-button label {
  margin-right: 10px;
}

.toggle-button button {
  background-color: #ccc;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-button button.active {
  background-color: #4CAF50;
} */

</style>