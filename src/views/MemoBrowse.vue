<template>
  
  <div>
    <h1>{{ id }}</h1>
    <router-link :to="`/create`">
        <button>Create</button>
    </router-link>
    <router-link :to="`/`">
        <button>홈</button>
    </router-link>
    <table>
      <thead>
        <tr>

          <th scope="col">제목</th>
          <th scope="col">내용</th>
          <th scope="col">작성자</th>
          <th scope="col">Action</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, name, text, writer } in memos" :key="id">

          <td>{{ name }}</td>
          <td>{{ text }}</td>
          <td>{{ writer }}</td>
          <td>
            <router-link :to="`/edit/${id}`">
              <button>Edit</button>
            </router-link>
            <button @click="deleteMemo(id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useLoadMemos, deleteMemo } from "../main";
import {ref, onBeforeMount} from 'vue';
import firebase from 'firebase';
export default {
  setup() {
    const id = ref("");

    onBeforeMount(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        id.value = user.email.split('@')[0];
      }
    });
    const memos = useLoadMemos();
    return {
      id,
      memos,
      deleteMemo,
    };
  },
};
</script>

<style>
</style>