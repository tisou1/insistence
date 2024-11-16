<script lang="ts">
import InputValue from "./InputValue.svelte";
import List from "./List.svelte";

interface Item {
  name: string
  id: string
}
let list: Item[] = $state([])
let count = $state(0)

const onChange = (value: any) => {

  list = [...list, {
    name: value,
    id: `${count++}`
  }]
}
const  onDelete = (idx: number) => {
  list.splice(idx, 1)
  // list = list // v5版本之后不需要重新赋值 使用splice就可以触发更新
}

$effect(() => {
  console.log('更新状态....',list)
})

</script>

<div class='flex justify-center flex-col max-w-500px mx-auto'>
  <InputValue handleClick={onChange} />
  <List list={list} onDelete={onDelete} />
</div>

<style>
</style>
