<script lang="ts">
import { createEventDispatcher, afterUpdate } from 'svelte';
import InputValue from "./InputValue.svelte";
import List from "./List.svelte";

interface Item {
  name: string
  id: string
}
let list: Item[] = []
let count = 0

const onChange = (value: any) => {
  let { text } = value.detail

  list = [...list, {
    name: text,
    id: `${count++}`
  }]
}
const  onDelete = (value: any) => {
  let { idx } = value.detail
  console.log(idx)
  list.splice(idx, 1)
  list = list
}

afterUpdate(() => {
  console.log('更新状态....',list)
})

</script>

<div class='flex justify-center flex-col max-w-500px mx-auto'>
  <InputValue on:handleClick={onChange} />
  <List bind:list={list} on:onDelete={onDelete} />
</div>

<style>
</style>
