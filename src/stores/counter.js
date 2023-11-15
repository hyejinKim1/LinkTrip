import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useUserStore = defineStore("user", () =>{
  const userinfo = ref(null);
  const username = ref("");
  const useremail = ref("");

  const isLoggedIn = computed(() => {
    return userinfo.value != null;
  });

  function logout() {
    userinfo.value = null;
  }
  function updateEmail(email){
    useremail.value = email;
  }
  function updateName(name){
    username.value = name;
  }
  return {userinfo,username, useremail, isLoggedIn, logout, updateEmail, updateName}
  
},
{ persist: { storage: localStorage } }
);