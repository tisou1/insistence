<script lang="ts">
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();
  //state
  let filterText = '';

  //props
  export let handleClick = (value: string) => {
    dispatch('handleClick', {
    text: value
  });

  filterText = ''
  }
</script>
  
  <div class='flex gap-4 my-3 justify-between'>
    <input type='text' bind:value={filterText}  class="px-3 grow border-solid border-gray-400/50 rounded-12px h-42px outline-none focus:border-orange-500/30 text-18px text-gray-300"/>
    <button on:click={() => handleClick(filterText)} class="btn px-8 rounded-20px">增加</button>
  </div>
  
  <style>

  </style>
  