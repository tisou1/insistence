<script lang="ts">

import { onMount } from 'svelte';

interface Item {
  name: string
  id: string
}

  const {list = [], onDelete} = $props()
  onMount(() => {
    console.log('子组件挂载.....')
  })

  $effect(() => {
    console.log(list.values)

  })
</script>



<div class='flex flex-col gap-1 overflow-hidden rounded-xl'>
  {#each list as item, idx (item.id)}
    <div class='flex pa-3 hover:bg-gray-200/30 justify-between bg-gray-300/10'>
      <span>{item?.name}</span>
      <button onclick={() => onDelete(idx)} class="i-carbon-close text-red-700/30 hover:text-red-700/90 cursor-pointer w-24px h-24px" />
    </div>

  {:else}

    <div class='flex justify-center'>
      <span>暂无数据</span>
    </div>

  {/each}
</div>