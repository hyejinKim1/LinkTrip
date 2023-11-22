<script setup>
import { useMemberStore } from "@/stores/member";
import { deleteComment, createComment } from "@/api/community";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const memberStore = useMemberStore();


const props = defineProps({
  comment: Object,
  articleIdx: Number
});

const userId = ref('');
userId.value = memberStore.userInfo.userId;

const newComment = ref();

async function submitComment() {

  console.log('submit');

  await createComment({
    content: newComment.value,
    articleIdx: props.articleIdx,
    userId: userId.value
  })

  console.log("@@@@@");
  router.go(0);
}

async function onDeleteComment(commentIdx) {
  console.log(deleteComment);
  console.log("param: ", commentIdx);
  await deleteComment({ commentIdx: commentIdx });

  console.log("***************~!!", props.articleIdx);
  // router.push({ name: 'detailArticle', params: { articleIdx: props.articleIdx }});
  router.go(0);
}


console.log(userId.value);

</script>
<template>
  <!-- <div>
          <h1>commentList</h1>
          <template v-for="commentIdx in comment" :key="commentIdx">
              <p>{{ commentIdx.userId }}</p>
              <p>{{ commentIdx.content }}</p>
          </template>
        
        
          <div>
              <textarea v-model="newComment" placeholder="댓글을 입력하세요"></textarea>
              <button @click="submitComment">댓글 등록</button>
          </div>


        
      </div> -->
  <div class="comment-container">
    <h1 class="comment-title">댓글 목록</h1>
    <div class="comment-list">
      <template v-for="commentOne in comment" :key="commentOne">
        <div class="comment-item">
          <!-- {{ commentIdx }} -->

          <p class="user-id">{{ commentOne.userId }}</p>
          <p class="comment-content">{{ commentOne.content }}</p>
          <p class="comment-date">{{ commentOne.createAt }}</p>
          <!-- <p>{{commentOne.commentIdx}}</p> -->
          <template v-if="commentOne.userId === userId">
            <button @click="onDeleteComment(commentOne.commentIdx)" class="delete-button">삭제</button>
          </template>

        </div>
      </template>
    </div>

    <div class="comment-form">
      <textarea v-model="newComment" placeholder="댓글을 입력하세요" class="comment-input"></textarea>
      <button @click="submitComment" class="submit-button">댓글 등록</button>
    </div>
  </div>
</template>

<!-- <style scoped>
.comment-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.comment-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.comment-list {
  margin-bottom: 20px;
}

.comment-item {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

.user-id {
  font-weight: bold;
}

.comment-content {
  margin-top: 5px;
}

.comment-form {
  display: flex;
  flex-direction: column;
}

.comment-input {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.submit-button {
  padding: 8px;
  background-color: #a7a7a7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style> -->

<style scoped>
.comment-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.comment-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.comment-list {
  margin-bottom: 20px;
}

.comment-item {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.user-id {
  font-weight: bold;
  margin-bottom: 5px;
}

.comment-content {
  margin-top: 5px;
}

.comment-date {
  color: #888;
  font-size: 12px;
}

.comment-form {
  display: flex;
  flex-direction: column;
}

.comment-input {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.submit-button {
  padding: 8px;
  background-color: #c4c4c4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: rgb(147, 248, 255);
}

.delete-button {
  padding: 8px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;
}

.delete-button:hover {
  background-color: #d32f2f;
}
</style>