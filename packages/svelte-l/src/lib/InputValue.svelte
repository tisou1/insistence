<script lang="ts">
const { handleClick } = $props()

  let filterText = $state('')

  //props
  let onhandleClick = (value: string) => {
      handleClick(value)
      filterText = ''
  }
</script>
  
  <div class='flex gap-4 my-3 justify-between'>
    <input type='text' bind:value={filterText}  class="px-3 grow border-solid border-gray-400/50 rounded-12px h-42px outline-none focus:border-orange-500/30 text-18px text-gray-300"/>
    <button onclick={() => onhandleClick(filterText)} class="btn px-8 rounded-20px">增加</button>
  </div>
  
  <style>

  </style>
  