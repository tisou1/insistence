<script setup lang="ts">
import { ref, reactive } from 'vue'
import { $ref } from 'vue/macros';

// import { $ref } from "vue/macros";
import InputValue from './Input.vue'
import MyList from './List.vue'

interface Item {
  name: string
  id: string
}
let count = 0
const list = reactive<Item[]>([])

const onChange = (value: string) => {
  list.push({ name: `${value}`, id: `${count++}` })
}

const onDelete = (idx: number) => {
  list.splice(idx, 1)
}

</script>

<template>
  <div class='flex justify-center flex-col max-w-500px mx-auto'>
      <InputValue @onClick='onChange' />
      <MyList :list='list' @onDelete='onDelete' />
  </div>
</template>

<style scoped>

</style>
