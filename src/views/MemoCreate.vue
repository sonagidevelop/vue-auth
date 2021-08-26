<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div>
        <label>제목</label>
        <input type="text" v-model="form.name" required />
      </div>

      <div>
        <label>내용</label>
        <input type="text" v-model="form.text" required />
      </div>

      <button type="submit">Create Memo</button>
    </form>
    <router-link to="/browse">Browse</router-link>
  </div>
</template>

<script>
import { createMemo } from "../main";
import { reactive, onBeforeMount,ref } from "vue";
import { useRouter } from 'vue-router'
import firebase from 'firebase';
export default {
  setup() {
    const router = useRouter()
    const uploader = ref("");
    const form = reactive({ name: "", text: "", writer: uploader });

    onBeforeMount(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        uploader.value = user.email.split("@")[0];
      }
    });

    const onSubmit = async () => {
      await createMemo({ ...form });
      form.name = "";
      form.text = "";
      router.push('/browse')

    };

    return { form, onSubmit, uploader };
  },
};
</script>

<style>
</style>