<template>
  <div>
      <h3>Edit Users</h3>
      <form @submit.prevent="update">
          <div>
              <label>
                  Name
              </label>
              <input v-model="form.name" required />
          </div>

          <div>
              <label>Text</label>
              <input type="text" v-model="form.text" required/>
          </div>

          <button type="submit">Update</button>
      </form>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getMemo, updateMemo } from '../main'
export default {
    setup() {
        const router = useRouter()
        const route = useRoute()
        const userId = computed(() => route.params.id)
        const form = reactive({ name: '', text: ''})
        onMounted(async () => {
            const memo = await getMemo(userId.value)
            console.log(memo, userId.value)
            form.name = memo.name
            form.text = memo.text
        })

        const update = async () => {
            await updateMemo(userId.value, { ...form})
            router.push('/browse')
            form.name = ''
            form.text =''
        }
        return { form, update }

    
    }

}
</script>

<style>

</style>