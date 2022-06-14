<script lang="ts">

import { createEventDispatcher, afterUpdate, onMount } from 'svelte';

const dispatch = createEventDispatcher();

interface Item {
  name: string
  id: string
}
  export let list:Item[] = []
  export let onDelete = (idx: number) => dispatch('onDelete', {
    idx
  })

  onMount(() => {
    console.log('子组件挂载.....')
  })

  afterUpdate(() => {
    console.log(list)
  })
</script>



<div class='flex flex-col overflow-hidden bg-gray-300/10 rounded-xl'>
  {#each list as item, idx (item.id)}
    <div v-for="(item, idx) in list" class='flex pa-3 hover:bg-gray-200/30 justify-between'>
      <span>{item?.name}</span>
      <button on:click={() => onDelete(idx)} class="i-carbon-close text-red-700/30 hover:text-red-700/90 cursor-pointer w-24px h-24px" />
    </div>

  {:else}

    <div class='flex justify-center'>
      <span>暂无数据</span>
    </div>

  {/each}
</div>