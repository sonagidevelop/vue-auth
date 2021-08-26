import { createApp, onUnmounted, ref } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBlz6pGRYQjhAygq__L3zROEW4vKYLZW0M",
    authDomain: "vue-auth-25b85.firebaseapp.com",
    projectId: "vue-auth-25b85",
    storageBucket: "vue-auth-25b85.appspot.com",
    messagingSenderId: "966530302065",
    appId: "1:966530302065:web:b9dd1f2a84da24afcf1bd0",
    measurementId: "G-RY373YHLLH"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const memosCollection = db.collection('test');
createApp(App).use(router).mount('#app')

export const createMemo = memo => {
  return memosCollection.add(memo)
}

export const getMemo = async id => {
  const memo = await memosCollection.doc(id).get()
  return memo.exists ? memo.data() : null
}

export const deleteMemo = id => {
  return memosCollection.doc(id).delete()
}
export const updateMemo = (id, memo) => {
  return memosCollection.doc(id).update(memo)
}

export const useLoadMemos = () => {
  const memos = ref([])

  const close = memosCollection.onSnapshot(snapshot => {
    memos.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)

  return memos
}